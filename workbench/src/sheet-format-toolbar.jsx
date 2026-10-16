import React,{useState} from 'react';
import UISelect from './ui-select.jsx';
import UIIcon from './ui-icon.jsx';
import {setSheetAlignment,sheetAlignment} from './sheet-format.js';
export default function SheetFormatToolbar({format,selection,onChange,disabled,extra}){
 const [scope,setScope]=useState('cell');
 const available=!!selection?.columnId&&(scope==='column'||!!selection.rowId),alignment=selection?sheetAlignment(format,selection.rowId,selection.columnId,selection.defaultAlignment):null;
 return <div className="sheet-format-toolbar" role="toolbar" aria-label="表格文字对齐"><UISelect aria-label="对齐作用范围" value={scope} onChange={e=>setScope(e.target.value)}><option value="cell">单元格</option><option value="row">整行</option><option value="column">整列</option></UISelect><div className="sheet-alignment-actions">{[['left','左对齐'],['center','居中对齐'],['right','右对齐']].map(([value,label])=><button key={value} type="button" title={label} aria-label={label} aria-pressed={available&&alignment===value} disabled={disabled||!available} onClick={()=>onChange(setSheetAlignment(format,{scope,...selection},value))}><UIIcon name={'align-'+value}/></button>)}</div>{extra}<span className="sheet-format-selection">{selection?selection.label:'先点选单元格或列标题'}</span></div>;
}
