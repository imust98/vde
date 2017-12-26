const fs = require('fs');
const path = require('path');
const Handlebars = require('handlebars');
const exists = require('fs').existsSync;
const basepath = 'packages/';
const params = process.argv;
const componentName = params[2] || 'ComponentName';
const title = params[3] || '';
const target = path.resolve(path.join(basepath, componentName) || '.');
const sourceTemplateDir = path.resolve(path.join(basepath, 'cptTemp'));

const CompileTemplate = str => {
  let template = Handlebars.compile(str);
  let source = template({
    ComponentName: componentName
  });
  return source;
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
    if (error) {
      throw error;
    } else {
      files.forEach(item => {
        let _src = path.resolve(path.join(src, item));
        let _dist = path.resolve(path.join(dist, item));
        let _str = CompileTemplate(fs.readFileSync(_src, 'utf-8'));
        fs.writeFileSync(_dist, _str);
        if (++fileCounter === totalFiles) {
          callback();
        }
      });
    }
  });
};
/**
 * 
 */


const addConfig = (conName,title) => {
	let str = fs.readFileSync('./bin/route.json', 'utf-8');
	let _config = JSON.parse(str);
	_config.components.push({"name":conName,"title":title});
	let _str = JSON.stringify(_config);
	fs.writeFileSync('./bin/route.json',_str);
};
if (exists(target)) {
  console.log(componentName + ' component already existed');
} else {
  fs.mkdirSync(target);
  copydir(sourceTemplateDir, target, function() {
		console.log('create success');
		addConfig(componentName,title);
  });
}
