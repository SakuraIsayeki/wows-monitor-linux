let fs = require('fs');
let semver = require('semver');

let level = process.argv[2];
let version = packageJson(level);
appConfig();
readme();

function packageJson(level) {
  let json = read('package.json');
  let object = JSON.parse(json);
  let newVersion = semver.inc(object.version, level);
  if (!newVersion) {
    throw new Error('Version or ReleaseType invalid');
  }
  object.version = newVersion;
  write('package.json', object);
  return newVersion;
}

function appConfig() {
  let path = 'src/config/app.config.ts';
  let content = read(path);
  content = content.replace(/version:\s'([\d\.])+'/, `version: '${version}'`);
  write(path, content);
}

function readme(){
  let path = 'readme.md';
  let content = read(path);
  content = content.replace(/Version:\s\*\*([\d\.])+\*\*/, `Version: **${version}**`);
  write(path, content);
}

function read(path) {
  return fs.readFileSync(path, { encoding: 'utf8' });
}

function write(path, object) {
  let content = object;
  if ((typeof object) !== 'string') {
    content = JSON.stringify(object, 0, 2);
  }
  fs.writeFileSync(path, content, { encoding: 'utf8' });
}
