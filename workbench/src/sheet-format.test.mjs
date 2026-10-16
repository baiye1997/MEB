import test from 'node:test';
import assert from 'node:assert/strict';
import {defaultSheetAlignment,sheetAlignment,setSheetAlignment} from './sheet-format.js';
import {initial,validate,ledgerBook} from './model.js';

test('alignment precedence uses stable row and column IDs without mutating undo snapshots',()=>{
 const column=setSheetAlignment(undefined,{scope:'column',columnId:'quantity'},'right');
 const row=setSheetAlignment(column,{scope:'row',rowId:'r2'},'center');
 const cell=setSheetAlignment(row,{scope:'cell',rowId:'r2',columnId:'quantity'},'left');
 assert.equal(sheetAlignment(cell,'r2','quantity'),'left');
 assert.equal(sheetAlignment(cell,'r2','other'),'center');
 assert.equal(sheetAlignment(cell,'r1','quantity'),'right');
 assert.equal(sheetAlignment(column,'r2','quantity'),'right');
 assert.equal(sheetAlignment(row,'r2','quantity'),'center');
 assert.equal(column.rows,undefined);assert.equal(row.cells,undefined);
 assert.deepEqual(['other','quantity'].map(id=>sheetAlignment(cell,'r2',id)),['center','left']);
 assert.equal(defaultSheetAlignment('computed'),'right');assert.equal(defaultSheetAlignment('date'),'center');assert.equal(defaultSheetAlignment('text','unit'),'center');assert.equal(defaultSheetAlignment('text'),'left');
 assert.equal(sheetAlignment({columns:{}},'r','constructor','right'),'right');
 assert.throws(()=>setSheetAlignment(cell,{scope:'cell',columnId:'quantity'},'left'),/选择/);
 assert.throws(()=>setSheetAlignment(cell,{scope:'column',columnId:'quantity'},'justify'),/无效/);
});

test('the latest row or column action replaces overrides only within its range',()=>{
 const original={columns:{quantity:'center',note:'right'},rows:{r1:'left',r3:'center'},cells:{r1:{quantity:'center',note:'right'},r2:{quantity:'left',note:'center'},r3:{other:'right'}}},snapshot=structuredClone(original);
 const column=setSheetAlignment(original,{scope:'column',columnId:'quantity'},'right');
 for(const row of ['r1','r2','r3','new'])assert.equal(sheetAlignment(column,row,'quantity'),'right');
 assert.equal(column.cells.r2.quantity,undefined);assert.equal(column.cells.r1.quantity,'right');assert.equal(column.cells.r3.quantity,'right');
 assert.equal(sheetAlignment(column,'r1','note'),'right');assert.equal(sheetAlignment(column,'r2','note'),'center');assert.equal(sheetAlignment(column,'r3','other'),'right');
 assert.deepEqual(column.rows,original.rows);assert.equal(column.columns.note,'right');assert.deepEqual(original,snapshot);
 const columnSnapshot=structuredClone(column),row=setSheetAlignment(column,{scope:'row',rowId:'r1'},'center');
 for(const field of ['quantity','note','new'])assert.equal(sheetAlignment(row,'r1',field),'center');
 assert.equal(row.cells.r1,undefined);assert.equal(sheetAlignment(row,'r2','quantity'),'right');assert.equal(sheetAlignment(row,'r2','note'),'center');assert.deepEqual(column,columnSnapshot);
 const rowSnapshot=structuredClone(row),cell=setSheetAlignment(row,{scope:'cell',rowId:'r1',columnId:'quantity'},'left');
 assert.equal(sheetAlignment(cell,'r1','quantity'),'left');assert.equal(sheetAlignment(cell,'r1','note'),'center');assert.deepEqual(row,rowSnapshot);
 const resetColumn=setSheetAlignment(cell,{scope:'column',columnId:'quantity'},'center');
 for(const id of ['r1','r2','r3'])assert.equal(sheetAlignment(resetColumn,id,'quantity'),'center');
 assert.equal(sheetAlignment(resetColumn,'r2','note'),'center');assert.equal(sheetAlignment(resetColumn,'r3','other'),'right');assert.equal(sheetAlignment(cell,'r1','quantity'),'left');
});

test('old projects load unchanged and formatting survives validation and JSON reload for every sheet owner',()=>{
 const data=validate(initial()),project=data.projects[0];
 assert.equal(project.format,undefined);assert.equal(project.quickToolFormats,undefined);
 const format=setSheetAlignment(undefined,{scope:'column',columnId:'reported'},'center');
 project.format=format;data.materials.format=format;
 ledgerBook(project,'change').format=format;
 project.calculationSheets.cable={params:{},rows:[],format};
 project.quickToolFormats={price:format};
 project.customCalculations=[{id:'custom',name:'自定义',formula:'2 * 3',unit:'m²',precision:2,variables:[],rows:[],format}];
 const loaded=validate(JSON.parse(JSON.stringify(data)));
 for(const value of [loaded.projects[0].format,loaded.materials.format,loaded.projects[0].ledgers.change.format,loaded.projects[0].calculationSheets.cable.format,loaded.projects[0].quickToolFormats.price,loaded.projects[0].customCalculations[0].format])assert.deepEqual(value,format);
 const invalid=structuredClone(data);invalid.projects[0].format.columns.reported='justify';assert.throws(()=>validate(invalid));
});
