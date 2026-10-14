import test from 'node:test';
import assert from 'node:assert/strict';
import ExcelJS from 'exceljs';
import {createLedgerWorkbook} from './excel-workbook.js';
test('styled export preserves identifiers, precision, literal formulas, dates and immutable source snapshots',async()=>{
 const columns=[{id:'number',name:'编号',type:'text'},{id:'reported',name:'数量',type:'number'},{id:'date',name:'日期',type:'date'},{id:'hidden',name:'隐藏',type:'text',hidden:true},{id:'remarks',name:'备注',type:'text'}];
 const rows=[{cells:{number:'0001234567890123456',reported:'1234567.12345678',date:'2026-09-29',remarks:'第一行\n第二行'},notes:'=SUM(A1:A3)',source:{sheetId:'custom',formula:'长度*2',inputs:{长度:'3'},customRule:{variables:[{name:'长度',unit:'m'}]},expression:'3*2',result:6,unit:'m',capturedAt:'2026-09-29T12:00:00Z'}},{cells:{reported:'0.00000001'}},{cells:{reported:'1234567890123456'}},{cells:{reported:'3'}}];
 const before=structuredClone(rows),bytes=await createLedgerWorkbook({rows,columns,kind:'receipt',title:'验收',projectName:'模拟项目'}),wb=new ExcelJS.Workbook();await wb.xlsx.load(bytes);const s=wb.worksheets[0],header=s.getRow(3).values;
 const cell=(name,row=4)=>s.getRow(row).getCell(header.indexOf(name));
 assert.equal(cell('编号').value,'0001234567890123456');assert.equal(cell('数量').value,1234567.12345678);assert.equal(cell('数量',5).value,.00000001);assert.equal(cell('数量',6).value,'1234567890123456');assert.equal(cell('数量',7).numFmt,'#,##0');
 assert.equal(cell('补充说明').value,'=SUM(A1:A3)');assert.equal(cell('补充说明').type,ExcelJS.ValueType.String);assert.equal(cell('日期').value.toISOString(),'2026-09-29T00:00:00.000Z');assert.equal(cell('入账时间').value.toISOString(),'2026-09-29T20:00:00.000Z');
 assert.ok(!header.includes('隐藏'));assert.equal(cell('备注').alignment.wrapText,true);assert.ok(s.getRow(4).height>27);assert.equal(s.views[0].ySplit,3);assert.equal(s.views[0].xSplit,1);assert.ok(s.autoFilter.startsWith('A3:'));assert.equal(s.pageSetup.orientation,'landscape');assert.equal(s.pageSetup.printTitlesRow,'1:3');assert.deepEqual(rows,before);
});
