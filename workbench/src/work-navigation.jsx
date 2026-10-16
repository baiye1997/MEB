import React from 'react';
import UISelect from './ui-select.jsx';
import UIIcon from './ui-icon.jsx';

export const calculationTools=[['cable','电线电缆铜价调差'],['bus','母线槽铜价调差'],['support','桥架支吊架重量'],['price','数量 × 单价'],['insulation','圆管保温净体积'],['duct','矩形风管展开面积'],['custom','自定义计算规则']];

export default function WorkNavigation({page,project,projects,onProject,onPage,ledger,onLedger,assistant,onAssistant,onSettings,hostToggle}){
 const more=[['finance','造价档案','files'],['model','模型配置','materials'],['files','附件库','files'],['materials','材料价格库','materials']];
 const active=page==='table'?(ledger==='calculation'?'records':'table'):page;
 const items=[['overview','项目总览','columns',()=>onPage('overview')],['table','工作台','table',()=>onLedger(ledger==='calculation'?'receipt':ledger)],['calculator','计算台','calculator',()=>onPage('calculator')],['records','计算记录','files',()=>onLedger('calculation')]];
 return <nav className="work-topbar" aria-label="项目工作">
  <button className="projects-back" title="返回所有项目" onClick={()=>onPage('board')}><UIIcon name="arrow-left"/><span>所有项目</span></button>
  <UISelect className="topbar-project" aria-label="切换项目" value={project.id} onChange={e=>onProject(projects.find(p=>p.id===e.target.value))}>{projects.map(p=><option key={p.id} value={p.id}>{p.name}</option>)}</UISelect>
  <div className="work-modules">{items.map(([id,label,icon,visit])=><button key={id} aria-current={active===id?'page':undefined} onClick={visit}><UIIcon name={icon}/><span>{label}</span></button>)}</div>
  <div className="topbar-utilities"><button className="project-assistant-trigger" aria-label="DSH 项目助手" aria-pressed={assistant} onClick={onAssistant}><UIIcon name="search"/><span>项目助手</span></button><details className="action-menu topbar-more"><summary aria-label="更多项目功能">更多</summary><div className="menu-panel">{more.map(([id,label,icon])=><button key={id} aria-current={page===id?'page':undefined} onClick={()=>onPage(id)}><UIIcon name={icon}/>{label}</button>)}<button onClick={onSettings}><UIIcon name="settings"/>设置与备份</button>{hostToggle&&<button onClick={hostToggle}><UIIcon name="collapse"/>切换 DSH 导航</button>}</div></details></div>
 </nav>;
}
