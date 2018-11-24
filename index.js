const fs = require('fs');
const path = require('path');
const PluginName = 'DirScannerWebpackPlugin';
const DefaultOupputFileName = 'dir-scanner-webpack-plugin-output.js';
const ExportTypes = ['es6', 'commonjs'];
const FormatTypes = ['pathname', 'filename'];

class DirScannerWebpackPlugin {
  constructor(options) {
    this.options = options || {};
    this.options.output = this.options.output || {};
    this.output = {
      path: this.options.output.path,
      filename: this.options.output.filename || DefaultOupputFileName,
      export: this.options.output.export || ExportTypes[0],
      format: this.options.output.format || FormatTypes[0]
    };

    this.verify();

    this.items = [];
  }

  verify() {
    if (!fs.statSync(this.output.path).isDirectory()) {
      throw { mes: 'output.path is not a directory' };
    }
    if (!ExportTypes.includes(this.output.export)) {
      throw { mes: 'Unsupported export type' };
    }
    if (!FormatTypes.includes(this.output.format)) {
      throw { mes: 'Unsupported export format' };
    }
  }

  apply(compiler) {
    compiler.hooks.watchRun.tapAsync(PluginName, (source, callback) => {
      this.scanDir(this.options.dir);
      this.exportFile();
      this.clean();
      callback();
    });
  }

  pushItem(pathname, filename) {
    this.items.push(this.options.output.format === FormatTypes[0] ? path.relative(this.options.dir, pathname) : filename);
  }

  scanDir(dir) {
    fs.readdirSync(dir).forEach(filename => {
      const pathname = path.join(dir, filename);
      if (fs.statSync(pathname).isDirectory()) {
        this.scanDir(pathname);
      } else {
        this.pushItem(pathname, filename);
      }
    });
  }

  exportFile() {
    const exportStr = this.output.export === ExportTypes[0] ? 'export default ' : 'module.exports = ';
    const str = `/* eslint-disable */
${exportStr}[${this.items.map(s => `'${s}'`).toString()}];
`;
    const p = path.join(this.output.path, this.output.filename);
    try {
      const e = fs.readFileSync(p);
      if (e.toString() === str) return;
    } catch (error) {
      // pass
    }
    fs.writeFileSync(p, str);
  }

  clean() {
    this.items = [];
  }
}

module.exports = DirScannerWebpackPlugin;
