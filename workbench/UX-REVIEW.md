# 工作区与 DSH 接入复核 · 2026-09-22

本次聚焦操作结构与实际会话联通，保留已确认的 Rare UI / Radix 体系。不将此轮认定为整个产品完成。

## 当前页面组织

- 项目看板：查看所有项目、按名称/造价阶段筛选；选择后进入该项目总览。
- 项目总览：造价档案和 CAD 沙盘属于项目；阶段尚未进入的审计不要求填金额。
- 工作台：五类台账共用“添加行—搜索—筛选—表格设置—明细—行操作”层级。工程量汇总是收方专属检查面板，产值口径、合同类别保留。
- 计算台：六类工具用一个入口切换，共用参数折叠；行操作在上方，参数/过程/来源在右侧。常用算量也提供右侧明细。
- 材料价格库：同一编辑表格体系，导出合并进操作区，报价可带入计算台。
- 附件库：引用优先，副本导入收在更多；空态控制体量，备份明确不包含被引用的原文件。
- 设置：本机保存、备份与当前模型边界分开说明。
- 全局状态栏：保存消息与撤销保持固定位置。未保存草稿提示位于保存按钮旁。

## 本次发现并修复

重复项目列表和多层计算页签占据录入区；改为项目选择器与单一计算工具入口。重复撤销按钮归入全局状态栏。计算记录日期条件与批量动作折叠。常用算量首列错误套用复选框列宽，改为正常数据列。空表说明原来被表格高度挤出首屏，改为表内显示。文件夹空态居中对齐。

## DSH 能力边界

项目助手使用宿主公开 sessions 服务：创建/重命名/恢复项目会话、发送文本、执行 / 指令、显示流式回复/排队回执、取消执行。每个项目独立关联会话，聊天记录由 DSH 保存。

项目问答默认附带可预览的当前项目快照；用户可关闭，DWG 识图请求只发送图纸与候选。快照包含当前视图前若干行与选中行，限制行数和长度，不自动读取附件内容；截断必须显式告知 DSH。只读 `meb_project_query` 可分页查询已保存的全台账，当前未保存编辑则以快照标识，避免把两种版本混淆。助手不直接写台账；工具授权、完整执行轨迹和复杂宿主交互仍在“完整会话”中。这里不是第二套模型供应商或密钥设置。

## 仍未完成

楼栋名称、楼栋号、逐层层高配置和用户自主模型生成尚未贯通。DSH 的结构化台账修改建议、用户确认后写回及撤销，尚未实现。此轮不宣称整个 DSH Agent 能力已嵌入工作台，也不宣称所有数据规模、窗口和业务流程已经穷尽验收。

### Continuation: review before ledger mutation

Excel import now detects candidate header rows, permits explicit source-column mapping and data-start selection, previews records, preserves unmatched content in notes, and skips explicitly labelled totals. Ambiguous monetary bases are deliberately left unmapped. Material prices use the same workflow. DSH structured suggestions now have field-level before/after review, current-value conflict checks, project isolation, and undoable application to the editing buffer. This supersedes the earlier statement that no suggested-edit preview exists; live-provider generation remains an acceptance gap.

### 2026-09-22 layout refinement

- Receipt inspector follows document information → content → measured quantity, with a separate four-party approval section. At the tested 1404×825 viewport, quantity input bottom is 685px, inside the first screen. Removed inherited nested height/overflow constraints; only the tab content scrolls.
- Output inspector keeps reporting date with business data and groups payment amounts. Table detail toggle is disabled for an empty view; selected row count appears in the row-action menu with an explicit clear-selection action.
- DSH transcript folds structured proposal JSON and replaces repeated submitted project snapshots with a context marker. The actual submitted context and confirmation rules are unchanged.
- Project shelf spacing, covers, headings and hover states refined within the existing Rare UI/Radix direction. Reduced-motion setting suppresses cover movement.
- Production build and 32 model tests passed; layout detector returned no findings. Live browser checked receipt content, quantity visibility and approval tabs without editing records. This is a focused refinement, not whole-product aesthetic acceptance.

### Calculation operation refinement

New calculation rows focus the specification input and become active immediately. Empty-sheet details are disabled. Invalid rows show a compact incomplete state; the detailed error remains in the process panel. A result summary leads the process tab, while operands retain their explanatory expansion. Restored the docked destination and retain-snapshot controls previously hidden by inherited CSS. Empty/incomplete-only sheets no longer imply a zero total; mixed validity explicitly labels the valid-row total. Import review confirmation has a sticky action area.

Browser acceptance on isolated data: add → automatic specification focus → fill specification and length → parameters → result 23,792.91 → retain calculation → current version disabled. No production records edited. Build, 32 model tests and layout scan pass. Live DSH opens the rebuilt calculation page. Other pages and small-screen acceptance remain outside this focused pass.

### Screenshot correction: calculation record detail

The previous calculator refinement missed the separate client-level calculation-record inspector. It still rendered every column as a three-row textarea. Replaced that exact entry point with RecordReader: date metadata, project heading, quantity/unit and amount side by side, readable specification and multiline detail, omitted empty auxiliary fields, explicit compact editing mode, collapsed notes/attachments. Snapshot fields retain readonly protection. Browser acceptance through Workbench → Calculation Records → Detail verifies reading layout and multiline edit synchronizing back to the record. Tested on isolated synthetic data; no production mutations. Build and 32 tests pass.

### Global visual readability pass — verification pending

Added visual-system.css as the final shared visual-role layer. Body and table data 14px, controls and headers 13px, metadata 12px. Replaced host-dependent muted colors with explicit light/dark readable colors; muted contrast is checked against white/quiet surfaces. Menus have bounded triggers and open-state indication. Shared rules cover navigation, sheets, inspectors, calculations, project cover/dossier, files, settings and assistant text. Build and type detector pass.

NOT visually accepted: computer-use connection timed out three times during this turn, including direct localhost tab acquisition. No current screenshots or breakpoint/overflow acceptance could be obtained. Larger text may reveal wrapping in dense toolbars; inspect all pages before calling this global visual pass complete. No production data mutation or push.
