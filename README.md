# MEB

<div align="center">

<h3>工程造价人的 DSH 工作台</h3>

<p>把项目台账、计算过程、CAD 核对和 DSH 项目助手放进同一个本地项目上下文。</p>

<p>
  <a href="https://github.com/baiye1997/MEB/blob/main/LICENSE"><img src="https://img.shields.io/github/license/baiye1997/MEB" alt="MIT License"></a>
  <a href="https://github.com/baiye1997/MEB/actions/workflows/verify.yml"><img src="https://img.shields.io/github/actions/workflow/status/baiye1997/MEB/verify.yml?label=verify" alt="verify"></a>
  <a href="https://www.npmjs.com/package/meb-workbench"><img src="https://img.shields.io/npm/v/meb-workbench" alt="npm"></a>
  <a href="https://github.com/topics/dsh-plugin"><img src="https://img.shields.io/badge/DSH-plugin-1677ff" alt="DSH plugin"></a>
</p>

</div>

## Why MEB

造价工作需要持续带着项目上下文工作：这张表属于哪个项目，这个数量来自哪份资料，这个计算用了什么参数，助手提出的修改是否经过人工核对。MEB 把这些状态放进 DSH 的本机插件模型里，保留明确的证据、撤销和保存边界。

## Features

- 收方、签证变更、产值、合同和材料价格台账
- Excel 粘贴，以及 `.xlsx`、`.xls`、`.csv`、`.tsv` 导入导出
- 电缆、母线槽、支吊架、保温、风管和自定义规则计算
- 参数、公式、来源和历史入账快照
- DWG 候选轮廓审阅、楼栋配置、拆分和模型预览
- 项目范围内的 DSH 查询、证据核对和可撤销修改建议
- 本机保存、显式保存、撤销、备份恢复和可选 WebDAV 同步

MEB 不提供账号、云端数据库或独立后端。业务数据由 DSH 宿主保存。

## Install in DSH Desktop

默认 DSH 不带插件市场。官方「添加插件」窗口接受 npm 包名、GitHub 地址或本地目录；MEB 三种方式都支持。

### Recommended: npm package

1. 打开 DSH Desktop 的「添加插件」。
2. 输入 `meb-workbench`。
3. 选择安装源，检查来源、版本和依赖提示。
4. 点击「安装」，按 Desktop 提示刷新或重启。
5. 在左侧面板打开 **MEB 工作台**。

### GitHub source

在「添加插件」中输入 DSH Git spec：

```text
github:baiye1997/MEB#main&path:workbench
```

也可打开 [workbench 目录](https://github.com/baiye1997/MEB/tree/main/workbench) 查看源码。Windows 遇到 `&path:` 子目录解析问题时，使用 npm 包或本地 `workbench` 目录。

### Local source

输入本地 `workbench` 目录路径。适合开发和未发布版本。

### Desktop command

也可以使用 DSH Desktop 随附的命令运行时管理 `desktop` profile：

```sh
dsh plugin --profile desktop add meb-workbench
```

普通 npm CLI 不管理保留的 `desktop` profile。命令必须来自 DSH Desktop 自带运行时。

Plugin Market 是可选插件。安装后，可在它的目录中搜索 `meb-workbench`；没有安装 Market 时，直接使用上面的官方「添加插件」入口。

## CAD / DWG dependency

基础台账和计算不依赖 CAD。DWG 识别需要本机安装：

- LibreDWG 的 `dwg2dxf`
- 可导入 `ezdxf` 的 Python

npm 包不携带虚拟环境。MEB 会保留其他功能，并在 DWG 页面显示依赖说明；不会静默执行系统安装。macOS 示例：

```sh
brew install libredwg
python3 -m pip install ezdxf
```

如果 Python 不在默认路径，设置 `MEB_PYTHON` 后重启 DSH。Windows/Linux 请使用对应发行版的 LibreDWG 和 Python 安装方式。

## Development

```sh
cd workbench
npm ci
npm run verify
npm audit --omit=dev --audit-level=high
```

`npm run verify` 执行逻辑测试、渲染检查、生产构建和 npm 包结构检查。

需要本地 CAD 环境时：

```sh
npm run setup:cad
```

## Release package

```sh
cd workbench
npm run verify
npm pack --dry-run
npm publish --access public
```

发布包包含编译产物、`dsh.bundle.patch`、README 和 License；不包含源码仓库中的本机数据、依赖目录、导出文件、Python 虚拟环境或缓存。

## Data boundary

- MEB 使用 DSH 的 `meb_workbench` storage domain。
- 原始文件可以作为本机引用；引用路径不会同步到 WebDAV。
- 导出、备份和同步文件写入 DSH 数据目录，不写入 npm 包目录。
- DSH 建议只生成可审阅、可撤销的修改建议；保存仍由用户明确触发。
- DWG 轮廓、楼栋身份、楼层和高度需要人工核对，不能视为施工级 BIM。

## Open-source notices

MEB 使用 MIT、Apache-2.0 和 SIL OFL 组件。直接依赖、嵌入字体和本地组件的归属见 [THIRD-PARTY-NOTICES.md](THIRD-PARTY-NOTICES.md)。

## Repository layout

```text
workbench/
├── src/                 # DSH host/client code
├── src/model-viewer/    # synthetic model preview source
├── test-fixtures/       # isolated, non-business fixtures
├── dsh.bundle.patch     # DSH bundle entry
├── package.json         # npm + DSH manifest
└── README.md            # package documentation
```

## Contributing

Issues and pull requests are welcome. Keep fixtures synthetic, keep credentials and business files out of Git, and run `npm run verify` before submitting changes.

## License

MIT © MEB contributors
