# dir-scanner--webpack-plugin
[![dir-scanner--webpack-plugin](https://img.shields.io/npm/v/dir-scanner--webpack-plugin.svg?style=flat-square)](https://www.npmjs.org/package/dir-scanner--webpack-plugin)
[![NPM downloads](https://img.shields.io/npm/dt/dir-scanner--webpack-plugin.svg?style=flat-square)](https://npmjs.org/package/dir-scanner--webpack-plugin)

### A webpack plugin for scanning directory and outputting all file names

## Install

Using npm:
```
npm install dir-scanner--webpack-plugin --save
```

## Usage
``` javascript
// webpack.config.js

const DirScannerWebpackPlugin = require('./dir-scanner--webpack-plugin')
module.exports = {

  //...

  plugins: [
    new DirScannerWebpackPlugin({
      dir: utils.resolve('svgs'), // the directory to be scanned
      output: {
        path: utils.resolve('src/data'), // directory of scan result output
        filename: 'result.js', // file name of the scan result
        export: 'commonjs', // 'es6' || 'commonjs' 
        format: 'pathname' // 'pathname' || 'filename'
      }
    })
  ]

  // ....

}
```


#### example
```
svgs
    ├── a.svg            
    └── sub   
        ├── b.svg 
        ├── c.svg 
        └── d.svg
```

``` javascript
modules.exports = [
  'a.svg',
  'sub/b.svg',
  'sub/c.svg',
  'sub/d.svg',
];
```

## License
[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2018-present, olivewind
