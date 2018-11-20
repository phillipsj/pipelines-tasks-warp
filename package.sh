#! /bin/bash
json -I -f ./Warp/package.json -e 'this.version="0.12.0"'
json -I -f ./Warp/task.json -e 'this.version.Minor=12'
npm run --prefix Warp build
json -I -f ./WarpTool/package.json -e 'this.version="0.12.0"'
json -I -f ./WarpTool/task.json -e 'this.version.Minor=12'
npm run --prefix WarpTool build
json -I -f vss-extension.json -e 'this.version="0.12.0"'
tfx extension create --manifest-globs vss-extension.json
