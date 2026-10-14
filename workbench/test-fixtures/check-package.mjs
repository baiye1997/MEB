import assert from 'node:assert/strict';
import {execFile} from 'node:child_process';
import {readFile} from 'node:fs/promises';
import {promisify} from 'node:util';

const run=promisify(execFile);
const manifest=JSON.parse(await readFile(new URL('../package.json',import.meta.url),'utf8'));
assert.equal(manifest.private,undefined,'published package must not be private');
assert.equal(manifest.dsh?.bundle?.patch,'./dsh.bundle.patch');
const {stdout}=await run('npm',['pack','--dry-run','--ignore-scripts','--json'],{encoding:'utf8'});
const packed=JSON.parse(stdout)[0];
const paths=new Set(packed.files.map(file=>file.path));
for(const path of ['package.json','README.md','THIRD-PARTY-NOTICES.md','LICENSE','dsh.bundle.patch','lib/index.js','lib/client.js','lib/model-embed.html','lib/excel-worker.html','src/rare-ui/LICENSE','src/daily-intro-font-license.txt'])assert(paths.has(path),`npm package missing ${path}`);
assert([...paths].every(path=>!/__pycache__|\.pyc$/.test(path)),'npm package contains Python cache files');
console.log(`Package ${packed.name}@${packed.version}: ${paths.size} files`);
