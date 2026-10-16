import {z} from 'zod';

const alignment=z.enum(['left','center','right']);
const key=z.string().min(1).max(100);
export const sheetFormatSchema=z.object({
 columns:z.record(key,alignment).optional(),
 rows:z.record(key,alignment).optional(),
 cells:z.record(key,z.record(key,alignment)).optional()
});
export function defaultSheetAlignment(type,columnId){
 return ['number','computed'].includes(type)?'right':type==='date'||columnId==='unit'?'center':'left';
}
export function sheetAlignment(format,rowId,columnId,fallback='left'){
 const own=(object,key)=>object&&Object.hasOwn(object,key)?object[key]:undefined;
 return own(own(format?.cells,rowId),columnId)||own(format?.rows,rowId)||own(format?.columns,columnId)||fallback;
}
// Keep formatting separate from cell values and preserve previous undo snapshots.
export function setSheetAlignment(format,{scope,rowId,columnId},value){
 if(!['left','center','right'].includes(value)||!['cell','row','column'].includes(scope))throw Error('对齐方式无效');
 if(scope!=='column'&&!rowId||scope!=='row'&&!columnId)throw Error('请先选择需要对齐的单元格');
 const next={...format};
 // Range actions replace narrower overrides in that range, as spreadsheet users expect.
 if(scope==='column'){
  next.columns={...format?.columns,[columnId]:value};
  const ids=new Set([...Object.keys(format?.cells||{}),...Object.keys(format?.rows||{})]);
  const cells=Object.fromEntries([...ids].map(id=>{
   const rowCells={...format?.cells?.[id]};delete rowCells[columnId];
   return [id,Object.hasOwn(format?.rows||{},id)?{...rowCells,[columnId]:value}:rowCells];
  }).filter(([,rowCells])=>Object.keys(rowCells).length));
  if(Object.keys(cells).length)next.cells=cells;else delete next.cells;
 }else if(scope==='row'){
  next.rows={...format?.rows,[rowId]:value};
  if(format?.cells&&Object.hasOwn(format.cells,rowId)){
   next.cells={...format.cells};delete next.cells[rowId];
   if(!Object.keys(next.cells).length)delete next.cells;
  }
 }
 else next.cells={...format?.cells,[rowId]:{...format?.cells?.[rowId],[columnId]:value}};
 return next;
}
