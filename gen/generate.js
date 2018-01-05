const fs = require('fs');
const fsPath = require('fs-path'); // write file if parent folder doesn't exist
const path = require('path');
const Handlebars = require('handlebars');
const exists = require('fs').existsSync;
const basepath = 'packages/';
const config = require('../config.json');
const params = process.argv;
const componentName = params[2] || 'test';
const title = params[3] || '';
const targetDir = path.resolve(path.join(basepath, componentName));
const sourceTemplateDir = path.resolve('template/component');

const calculatePath = (from,to) => {
  let _path = path.relative(from,to);
  if(!_path) {
    return ''
  }
  return _path + "/";
}
const exampleRelativeMainPath = calculatePath(config.path.example.replace(/\*/g, componentName),config.path.main.replace(/\*/g, componentName));
const compileTemplate = (str,filesPath) => { 
  let template = Handlebars.compile(str);
  let source = template({
    ComponentName: componentName,
    relativePath:exampleRelativeMainPath
  });
  return source;
};
const compileJs = str => {
  let template = Handlebars.compile(str);
  let _str = fs.readFileSync('./gen/route.json', 'utf-8');
  let _config = JSON.parse(_str);
  let list = _config.components || [];
  let source = template({
    list: list
  });
  return source;
};

// Update the docs project main.js file
const updateDocMainJs = () => {
  let str = compileJs(fs.readFileSync('./template/doc-main.hbs', 'utf-8'));
  fs.writeFileSync('./docs/main.js', str);
};

// Update the component's external index.js file
const updateComponentIndexJs = () => {
  var str = compileJs(
    fs.readFileSync('./template/component-index.hbs', 'utf-8')
  );
  fs.writeFileSync('./src/index.js', str);
};

/**
 *
 * @param {*} src
 * @param {*} dist
 * @param {*} callback
 */
const copydir = (src, dist, callback) => {
  fs.readdir(src, (error, files) => {
    let fileCounter = 0,
      totalFiles = files.length;
    const filesPath = {};
    if (error) {
      throw error;
    } else {
      files.forEach(item => {
        let _src = path.resolve(path.join(src, item));
        let _dist = '';
        if (item === 'index.vue') {
          filesPath.main = path.join(componentName,config.path.main.replace(/\*/g, componentName),'./');
          _dist = path.join(dist,config.path.main.replace(/\*/g, componentName),'./');
          _dist = path.resolve(path.join(_dist,item));
        } else if (item === 'example.vue') {
          filesPath.example = path.join(componentName,config.path.example.replace(/\*/g, componentName),'./');          
          _dist = path.join(dist,config.path.example.replace(/\*/g, componentName),'./');
          _dist = path.resolve(path.join(_dist,item));
        } else {
          filesPath.readme = path.join(componentName,config.path.readme.replace(/\*/g, componentName),'./');          
          _dist= path.join(dist,config.path.readme.replace(/\*/g, componentName),'./');
          _dist = path.resolve(path.join(_dist,item));
        }
        let _str = compileTemplate(fs.readFileSync(_src, 'utf-8'),filesPath);
        fsPath.writeFileSync(_dist, _str);
        if (++fileCounter === totalFiles) {
          callback(filesPath);
          console.log(filesPath);
        }
      });
    }
  });
};

const autoUpdateFiles = filesPath => {
  updateDocMainJs(filesPath);
  updateComponentIndexJs(filesPath);
};

/**
 * storage component info
 * @param {*} conName
 * @param {*} title
 */
const storageComponentConfig = (conName, title, filesPath) => {
  let str = fs.readFileSync('./gen/route.json', 'utf-8');
  let _config = JSON.parse(str);
  _config.components.push({
    name: conName,
    title: title,
    path: {
      main: filesPath.main,
      example: filesPath.example,
      readme: filesPath.readme
    }
  });
  let _str = JSON.stringify(_config);
  fs.writeFileSync('./gen/route.json', _str);
};

if (exists(targetDir)) {
  console.log(componentName + ' component already existed');
} else {
  fs.mkdirSync(targetDir);
  copydir(sourceTemplateDir, targetDir, function(filesPath) {
    console.log(componentName + ' create success');
    storageComponentConfig(componentName, title, filesPath);
    autoUpdateFiles(filesPath);
  });
}
