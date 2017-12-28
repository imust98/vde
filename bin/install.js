const fs = require('fs');
const path = require('path');
const Handlebars = require('handlebars');
const exists = require('fs').existsSync;
const basepath = 'packages/';
const params = process.argv;
const componentName = params[2] || 'ComponentName';
const title = params[3] || '';
const targetDir = path.resolve(path.join(basepath, componentName) || '.');
const sourceTemplateDir = path.resolve(path.join(basepath, 'cptTemp'));

const compileTemplate = str => {
  let template = Handlebars.compile(str);
  let source = template({
    ComponentName: componentName
  });
  return source;
};
const compileJs = str => {
	let template = Handlebars.compile(str);
	let _str = fs.readFileSync('./bin/route.json', 'utf-8');
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
const copydir = (src = sourceTemplateDir, dist = targetDir, callback) => {
  fs.readdir(src, (error, files) => {
    let fileCounter = 0,
      totalFiles = files.length;
    if (error) {
      throw error;
    } else {
      files.forEach(item => {
        let _src = path.resolve(path.join(src, item));
        let _dist = path.resolve(path.join(dist, item));
        let _str = compileTemplate(fs.readFileSync(_src, 'utf-8'));
        fs.writeFileSync(_dist, _str);
        if (++fileCounter === totalFiles) {
          callback();
        }
      });
    }
  });
};

const autoUpdateFiles = () => {
  updateDocMainJs();
  updateComponentIndexJs();
};

/**
 * storage component info
 * @param {*} conName
 * @param {*} title
 */
const storageComponentConfig = (conName, title) => {
  let str = fs.readFileSync('./bin/route.json', 'utf-8');
  let _config = JSON.parse(str);
  _config.components.push({ name: conName, title: title });
  let _str = JSON.stringify(_config);
  fs.writeFileSync('./bin/route.json', _str);
};


if (exists(targetDir)) {
  console.log(componentName + ' component already existed');
} else {
  fs.mkdirSync(targetDir);
  copydir(sourceTemplateDir, targetDir, function() {
    console.log(componentName + ' create success');
    storageComponentConfig(componentName, title);
    autoUpdateFiles();
  });
}
