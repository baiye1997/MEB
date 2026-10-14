import React,{useEffect,useState} from 'react';
import UISelect from './ui-select.jsx';
import UIIcon from './ui-icon.jsx';
import {BounceSidebar} from './rare-ui/bounce-sidebar';
import {ledgerNames} from './model.js';

export const calculationTools=[['cable','电线电缆铜价调差'],['bus','母线槽铜价调差'],['support','桥架支吊架重量'],['price','数量 × 单价'],['insulation','圆管保温净体积'],['duct','矩形风管展开面积'],['custom','自定义计算规则']];

export default function WorkNavigation({page,project,projects,onProject,onPage,ledger,onLedger,tool,onTool,assistant,compact=assistant,onAssistant,onSettings,onToggleLayout,hostToggle}){
 const [expanded,setExpanded]=useState(false);
 useEffect(()=>{if(!compact)setExpanded(false);},[compact]);
 const visit=fn=>{fn();setExpanded(false);};
 const areas=[['overview','项目总览','project'],['finance','造价档案','files'],['model','模型配置','materials'],['table','工作台','table'],['calculator','计算台','calculator'],['files','附件库','files'],['materials','材料价格库','materials']];
 return <aside className={'work-navigation'+(expanded?' rail-expanded':'')} onMouseLeave={()=>{if(compact)setExpanded(false)}} onKeyDown={e=>{if(e.key==='Escape'&&expanded){setExpanded(false);e.stopPropagation();}}}>
  <div className="navigation-shell">
   <div className="navigation-brand">{compact?<button className="brand-monogram" aria-label={expanded?'收起项目导航':'展开项目导航'} aria-expanded={expanded} title={expanded?'收起项目导航':'展开项目导航'} onClick={()=>setExpanded(!expanded)}><span>M</span><small className="navigation-menu-label">菜单</small></button>:<span className="brand-monogram">M</span>}<div><strong>MEB</strong><small>工程造价工作室</small></div></div>
   <button className="all-projects" aria-label="所有项目" onClick={()=>visit(()=>onPage('board'))}><UIIcon name="project"/><span className="all-projects-label">所有项目</span><span>↗</span></button>
   <div className="navigation-project"><span>当前项目</span><UISelect aria-label="切换项目" value={project.id} onChange={e=>visit(()=>onProject(projects.find(p=>p.id===e.target.value)))}>{projects.map(p=><option key={p.id} value={p.id}>{p.name}</option>)}</UISelect><small>{project.finance?.stage||'造价阶段未设置'}</small></div>
   <BounceSidebar aria-label="项目工作" dotColor="var(--blue)" value={areas.findIndex(a=>a[0]===page)} items={areas.map(a=>({label:a[1],icon:<UIIcon name={a[2]}/>}))} onChange={i=>visit(()=>onPage(areas[i][0]))}/>
   <nav className="navigation-context" aria-label={page==='calculator'?'计算工具':'项目台账'}>{page==='table'&&<><h2>项目台账</h2>{Object.entries(ledgerNames).map(([id,label])=><button key={id} aria-current={ledger===id?'page':undefined} onClick={()=>visit(()=>onLedger(id))}><span>{label}</span><small>{id==='receipt'?project.rows.length:project.ledgers?.[id]?.rows.length||0}</small></button>)}</>}{page==='calculator'&&<><h2>计算工具</h2>{calculationTools.map(([id,label])=><button key={id} aria-current={tool===id?'page':undefined} onClick={()=>visit(()=>onTool(id))}>{label}</button>)}</>}</nav>
   <div className="navigation-bottom"><button className={'assistant-entry '+(assistant?'is-open':'')} aria-label="DSH 项目助手" onClick={()=>visit(onAssistant)}><span>✦</span><div><strong>DSH 项目助手</strong><small>核对记录 · 解释计算 · 提出修改</small></div></button><div className="navigation-actions"><button className="navigation-settings" aria-label="设置" onClick={()=>visit(onSettings)}><UIIcon name="settings"/><span>设置</span></button>{hostToggle&&<button className="navigation-host-toggle" aria-label="切换 DSH 导航" onClick={()=>visit(hostToggle)}><span>DSH 导航 ↔</span></button>}{onToggleLayout&&<button className="navigation-width-toggle" aria-label={compact?'切换为宽栏':'切换为窄栏'} title={compact?'切换为宽栏':'切换为窄栏'} onClick={onToggleLayout}><UIIcon name="collapse"/><span>{compact?'宽栏':'窄栏'}</span></button>}</div></div>
  </div>
 </aside>;
}
