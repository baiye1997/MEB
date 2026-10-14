// Run by bundling with esbuild (platform=node, CSS=text), then execute the bundle.
import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import assert from 'node:assert/strict';
import CalculationRecords from '../src/calculation-records.jsx';
import CustomCalculator from '../src/custom-calculator.jsx';
import {SnapshotDetail} from '../src/calculation-detail.jsx';
import AssistantReading from '../src/assistant-reading.jsx';
import {customSnapshot} from '../src/custom-calculation.js';
const rule={id:'r',name:'展开量',formula:'长度 * 系数',unit:'m²',precision:4,note:'按约定计算',variables:[{id:'length',name:'长度',unit:'m',fixed:false,value:''},{id:'factor',name:'系数',unit:'m',fixed:true,value:'2'}],rows:[{id:'line',name:'教学楼',values:{length:'10'},note:''}]};
const project={id:'test',name:'隔离测试',customCalculations:[rule]};
const html=renderToStaticMarkup(<CustomCalculator project={project} onChange={()=>{}} onPublish={()=>{}} focus={{kind:'custom',ruleId:'r',rowId:'line'}}/>);
assert.match(html,/20\.0000/);assert.match(html,/系数 = 2 m/);assert.match(html,/自定义第1行长度/);assert.doesNotMatch(html,/自定义第1行系数/);
const snap=customSnapshot(project,rule,rule.rows[0]);rule.variables[1].value='3';const frozen=renderToStaticMarkup(<SnapshotDetail source={snap.source}/>);assert.match(frozen,/20\.0000/);assert.doesNotMatch(frozen,/30\.0000/);
const links=renderToStaticMarkup(<AssistantReading text={'[原文](https://www.shmet.com/)\n[恶意](javascript:alert(1))'}/>);assert.match(links,/href="https:\/\/www.shmet.com\/"/);assert.doesNotMatch(links,/href="javascript:/);
console.log('Custom calculation and historical result rendering passed.');

const locked=renderToStaticMarkup(<CalculationRecords busy book={{columns:[{id:'title',name:'事项',type:'text'},{id:'quantity',name:'数量',type:'number'}],rows:[snap]}} rows={[snap]}/>);
assert.match(locked,/<button[^>]*disabled=""[^>]*>＋ 添加行<\/button>/);
assert.match(locked,/<button[^>]*disabled=""[^>]*>删除 1 行<\/button>/);
assert.match(locked,/<(?:input|div)[^>]*(?:disabled=""|aria-disabled="true")[^>]*aria-label="1行计算明细"/);

// A large table must never instantiate one editor per offscreen record.
import SheetTable from '../src/sheet-table.jsx';
let editorRows=0;
const large=Array.from({length:20000},(_,i)=>({id:String(i)}));
const lazy=renderToStaticMarkup(<SheetTable dataRows={large} renderDataRow={(row,i)=>{editorRows++;return <tr data-business-row={row.id}><td><input aria-label={'row '+i}/></td></tr>;}}><thead><tr><th>编号</th></tr></thead></SheetTable>);
assert.ok(editorRows>0&&editorRows<100,`Created ${editorRows} editor rows for a virtual table`);
assert.ok((lazy.match(/data-business-row=/g)||[]).length<100);
console.log('Large table creates only visible editors.');
