// Isolated synthetic acceptance. No model calls and no DSH/project storage access.
import React from 'react';
import ExcelJS from 'exceljs';
import {createRoot} from 'react-dom/client';
import {App} from '../src/client.jsx';
import {initial,blankProject,validate} from '../src/model.js';
const sampleCount=new URLSearchParams(location.search).get('rows')==='5000'?5000:65;
const storageKey='meb-experience-acceptance'+(sampleCount===65?'':'-5000');
const data=initial();data.projects=[blankProject('experience-test','体验验收 · 模拟项目'),blankProject('experience-other','隔离第二项目')];
data.projects[0].rows=Array.from({length:sampleCount},(_,i)=>({id:'r'+i,cells:{number:'SF-'+String(i+1).padStart(3,'0'),location:i<2?'教学楼一层':'教学楼二层',description:i<2?'给水管安装':'照明配管',reported:String(i+1),unit:'m',discipline:i<2?'给排水':'电气'},files:[],notes:''}));
let saved=JSON.parse(localStorage.getItem(storageKey)||'null')||data;
window.fetch=async(url,options)=>{if(url!=='/api/meb-workbench')throw Error('隔离验收禁止外部请求');const {endpoint,payload}=JSON.parse(options.body);if(endpoint==='meb/export'){const wb=new ExcelJS.Workbook(),bytes=Uint8Array.from(atob(payload.base64),char=>char.charCodeAt(0));await wb.xlsx.load(bytes);const sheet=wb.worksheets[0],matrix=[];sheet.eachRow({includeEmpty:true},row=>matrix.push(row.values.slice(1).map(value=>value??'')));let out=document.getElementById('export-evidence');if(!out){out=document.createElement('pre');out.id='export-evidence';out.setAttribute('aria-label','模拟导出内容');document.body.append(out);}out.textContent=JSON.stringify(matrix);return {json:async()=>({ok:true,value:'/模拟导出/'+payload.name})};}if(['meb/sync-status','meb/sync-check','meb/sync-wait'].includes(endpoint))return {json:async()=>({ok:true,value:{configured:false,kind:'disabled'}})};if(endpoint==='meb/save'){saved=validate(payload);saved.revision++;localStorage.setItem(storageKey,JSON.stringify(saved));}return {json:async()=>({ok:true,apiVersion:5,value:structuredClone(saved)})};};
function feed(initial){let value=initial;const listeners=new Set();return {getSnapshot:()=>value,subscribe:fn=>{listeners.add(fn);return()=>listeners.delete(fn);},set:next=>{value=next;listeners.forEach(fn=>fn());}};}
const list=feed({ids:[],byId:{}}),bindings=new Map();let count=0;
const ctx={sessions:{list,create:async()=>{const id='fixture-'+Date.now()+'-'+(++count),events=feed({entries:[]}),session=feed({running:false});let seq=0;
 Object.assign(session,{rename:async()=>({ok:true}),beginSubmission:()=>({requestId:'fixture-request',abandon(){}}),command:async()=>({ok:true,value:{matched:true}}),cancel:async()=>({ok:true}),prompt:async(parts)=>{
 const text=parts.filter(p=>p.type==='text').map(p=>p.text).join('\n'),match=text.match(/<project-data>\s*([\s\S]*?)<\/project-data>/),context=match?JSON.parse(match[1]):null;
 const rows=context?.rows||[],reply='## 核对结果（模拟回复）\n本次收到 '+rows.length+' 条记录。'+(context?.dataState||'仅咨询业务方法')+'。\n\n| 单据 | 部位 | 数量 | 单位 |\n| --- | --- | --- | --- |\n'+rows.map(r=>'| '+r.cells.number+' | '+r.cells.location+' | '+r.cells.reported+' | '+r.cells.unit+' |').join('\n')+'\n\n## 待核事项\n- 签认资料尚需补齐；本次没有自动修改台账。\n- 这是隔离测试，未调用真实 DSH 模型。\n\n## 下一步\n请补齐依据后复核。';
 const suggestion=rows.length?{version:1,id:'fixture-'+seq,projectId:context.project.id,ledger:'receipt',summary:'模拟建议：给当前第一条记录补充核对备注。',operations:[{type:'update',rowId:rows[0].id,before:{remarks:rows[0].cells.remarks||''},cells:{remarks:'待补签认资料（隔离验收）'}}]}:null;
 events.set({entries:[...events.getSnapshot().entries,{event:{type:'user/message',seq:++seq,data:{source:{kind:'user'},content:[{type:'text',text}]}}},{event:{type:'assistant/message',seq:++seq,data:{message:{content:[{type:'text',text:reply+(suggestion?'\n```meb-change\n'+JSON.stringify(suggestion)+'\n```':'')}]}}}}]});return {ok:true};}});
 bindings.set(id,{session,eventSource:events});list.set({ids:[...list.getSnapshot().ids,id],byId:{...list.getSnapshot().byId,[id]:{id}}});return id;},binding:id=>bindings.get(id),open(){}},layout:{selectPanel(){}}};
createRoot(document.getElementById('root')).render(<App ctx={ctx}/>);
