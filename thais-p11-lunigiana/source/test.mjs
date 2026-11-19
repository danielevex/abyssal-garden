// Thais Terra Viva - repeatable static preflight.
// This is NOT a replacement for real browser WebGPU compilation and visual QA.
import {readFileSync} from 'node:fs';
import {join,dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
import assert from 'node:assert/strict';
const here=dirname(fileURLToPath(import.meta.url));
const names=['quality.js','math.js','shaders.js','world.js','main.js','audio.js'];
const files=Object.fromEntries(names.map(n=>[n,readFileSync(join(here,'src',n),'utf8')]));
const combined=names.map(n=>files[n].trim()).join('\n\n').trim();
const html=readFileSync(join(here,'../index.html'),'utf8');
const start=html.indexOf('(async()=>{'),end=html.lastIndexOf('})().catch');
assert(start>=0&&end>start,'main script absent');
assert.equal(html.slice(start+11,end).trim(),combined,'HTML and modular sources diverge');
new Function('(async()=>{'+combined+'\n})().catch(e=>console.error(e))');
assert(files['shaders.js'].includes('fn dens(p:vec3f)'),'land density missing');
assert(files['main.js'].includes('createComputePipeline'),'native GPU compute absent');
for(const name of ['meshChestnutTrunk','meshVillageHouse','meshMedievalGate'])
 assert(files['main.js'].includes('function '+name+'()'),'missing geometry: '+name);
for(const entry of ['r.setPipeline(pFish);','r.setPipeline(pManta);','r.setPipeline(pSurf);','r.setPipeline(pBub);','r.setPipeline(pWater);'])
 assert(!files['main.js'].includes(entry),'marine rendering remains: '+entry);
assert(files['audio.js'].includes('forestBirdTimer'),'land ambient sound absent');
assert(!files['quality.js'].includes('localStorage.abyssal'),'settings are not isolated');
let shaderCount=0,immutableWrites=[];
const blocks=files['shaders.js'].matchAll(/\/\*wgsl\*\/\x60([^\x60]*)\x60/g);
for(const match of blocks){
 const code=match[1].replace(/\/\/[^\n]*/g,'');
 const ts=[...code.matchAll(/[A-Za-z_]\w*|\+=|-=|\*=|\/=|%=|==|!=|<=|>=|=(?!=)|[{}.;]|\S/g)].map(m=>m[0]);
 let scopes=[new Map()];
 for(let i=0;i<ts.length;i++){
  if(ts[i]==='{'){scopes.push(new Map());continue}
  if(ts[i]==='}'){if(scopes.length>1)scopes.pop();continue}
  if(ts[i]==='let'||ts[i]==='var'){scopes.at(-1).set(ts[++i],ts[i-1]);continue}
  if(!/^[A-Za-z_]\w*$/.test(ts[i])||ts[i-1]==='.')continue;
  let kind;for(let j=scopes.length-1;j>=0;j--)if(scopes[j].has(ts[i])){kind=scopes[j].get(ts[i]);break}
  if(kind!=='let')continue;
  let j=i+1;while(ts[j]==='.'&&/^[A-Za-z_]\w*$/.test(ts[j+1]))j+=2;
  if(['=','+=','-=','*=','/=','%='].includes(ts[j]))immutableWrites.push([shaderCount,ts[i]]);
 }
 shaderCount++;
}
assert(shaderCount>=14,'some WGSL blocks absent');
assert.equal(immutableWrites.length,0,'WGSL immutable assignments: '+JSON.stringify(immutableWrites));
const a=files['main.js'].indexOf('function meshChestnutTrunk(){'),b=files['main.js'].indexOf('const meshes = [meshChunk(',a);
assert(a>=0&&b>a,'mesh generators missing');
const checkMeshes=new Function(files['math.js']+'\n'+files['main.js'].slice(a,b)+'\nreturn [meshChestnutTrunk().build(),meshVillageHouse().build(),meshMedievalGate().build()]');
for(const [i,mesh] of checkMeshes().entries()){
 assert(mesh.nv>100&&mesh.ib.length>300,'mesh '+i+' incomplete');
 assert(mesh.ib.every(v=>v>=0&&v<mesh.nv),'bad mesh index '+i);
 const positions=new Float32Array(mesh.vb);
 for(let j=0;j<mesh.nv;j++)for(let c=0;c<3;c++)assert(Number.isFinite(positions[j*4+c]),'bad mesh coordinate '+i);
}
console.log('PASS: source sync, JavaScript syntax, '+shaderCount+' WGSL static blocks, 3 detailed meshes, native engine invariants');
console.log('NOT TESTED: WebGPU driver shader compilation, screenshots, FPS, navigation and collisions');
