# MEB-DSH

<div align="center">

### 工程造价人的 DSH 工作台

台账、计算、图纸与项目助手，在同一个项目里核对。

<p>
  <a href="https://www.npmjs.com/package/meb-workbench"><img src="https://img.shields.io/npm/v/meb-workbench?label=npm&amp;color=2865b0" alt="npm 版本"></a>
  <a href="https://github.com/baiye1997/MEB-DSH/releases"><img src="https://img.shields.io/github/v/release/baiye1997/MEB-DSH?display_name=tag&amp;label=release" alt="最新版本"></a>
  <a href="https://github.com/baiye1997/MEB-DSH/blob/main/LICENSE"><img src="https://img.shields.io/github/license/baiye1997/MEB-DSH" alt="开源协议"></a>
  <a href="https://github.com/baiye1997/MEB-DSH/actions/workflows/verify.yml"><img src="https://img.shields.io/github/actions/workflow/status/baiye1997/MEB-DSH/verify.yml?label=verify" alt="构建检查"></a>
</p>

<p>
  <a href="https://www.npmjs.com/package/meb-workbench">安装包</a> ·
  <a href="https://github.com/baiye1997/MEB-DSH/releases">版本下载</a> ·
  <a href="https://github.com/baiye1997/MEB-DSH/issues">问题反馈</a> ·
  <a href="https://github.com/baiye1997/MEB-DSH/blob/main/CONTRIBUTING.md">参与开发</a>
</p>

</div>

<p align="center">
  <img src="https://raw.githubusercontent.com/baiye1997/MEB-DSH/main/docs/images/meb-hero.svg" alt="MEB 工程造价工作台界面示意图" width="100%">
</p>

MEB 是运行在 [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness) 桌面端的工程造价工作台。按项目整理台账、保留计算依据，对照 CAD 图纸核对数量，再让 DSH 助手基于当前项目继续工作。

## 能做什么

| 工作 | 功能 |
| --- | --- |
| 项目台账 | 收方、签证变更、产值、合同与材料价格管理 |
| 表格处理 | Excel 粘贴；Excel（XLSX / XLS）、CSV 和 TSV 文件导入导出 |
| 工程计算 | 电缆、母线槽、支吊架、保温、风管与自定义规则；保留参数、公式和入账快照 |
| 图纸核对 | DWG 候选轮廓审阅、楼栋配置、拆分与三维体量预览 |
| 项目助手 | 按当前项目查询资料、核对证据、预览和采用修改建议 |
| 数据管理 | 保存、撤销、备份恢复，以及可选的 WebDAV 同步 |

## 安装

在 DSH Desktop 打开「添加插件」，输入以下包名：

```text
meb-workbench
```

确认来源和版本后点击「安装」，按 DSH 提示刷新或重启，然后从左侧打开 **MEB 工作台**。无需先安装插件市场，也无需注册 npm 账号。

<p align="center">
  <img src="https://raw.githubusercontent.com/baiye1997/MEB-DSH/main/docs/images/dsh-install.svg" alt="安装步骤：打开添加插件、输入 meb-workbench、安装并打开工作台" width="100%">
</p>

若镜像源暂未同步新版本，可在「安装源」中选择 npm 官方源。需要指定版本时，在包名后加版本号，例如 `meb-workbench@0.1.2`。

### 下载后安装

在 [Releases](https://github.com/baiye1997/MEB-DSH/releases) 下载 `meb-workbench-版本号.tgz`，将下载文件的完整本地路径填入「添加插件」。安装时仍需联网获取 JavaScript 依赖。

### 升级

按 DSH 当前界面的提示卸载旧版并安装新版。升级前可在「备份与设置」导出备份。

## DWG 识图

台账和工程计算安装后即可使用。DWG 识图还需要本机的 **LibreDWG（dwg2dxf）** 与 **Python + ezdxf**。

缺少依赖时，工作台会显示安装说明。插件不会自动修改系统环境。安装步骤见 [CAD 环境配置](https://github.com/baiye1997/MEB-DSH/blob/main/docs/cad-setup.md)。

导入图纸后，逐个核对候选轮廓、图纸单位、楼栋身份、坐标与层高，再生成模型并保存。模型用于体量预览；二维图纸中的代理对象、绑定图和缺失信息仍可能影响识别结果。

## 使用与数据

<p align="center">
  <img src="https://raw.githubusercontent.com/baiye1997/MEB-DSH/main/docs/images/data-boundary.svg" alt="项目工作台、本机保存、DSH 项目助手与可选 CAD 工具" width="100%">
</p>

- **先核对，再保存。** 助手建议需确认后才进入编辑区；可撤销，点击「保存更改」后才保存到项目。
- **数据保存在本机。** 项目、台账和模型由 DSH 保存；可导出备份。发送给 DSH 助手的资料会进入对应项目会话。
- **同步按需开启。** WebDAV 同步需自行配置，目前凭据存储仅支持 macOS。发生两端冲突时，需选择保留哪一端。
- **原文件自行保管。** 本机引用的原文件、绝对路径和 DSH 对话不进入 WebDAV 备份；换电脑后需重新定位原文件。

## 源码与贡献

欢迎通过 [Issues](https://github.com/baiye1997/MEB-DSH/issues) 反馈问题，或提交 Pull Request。源码安装、构建和检查方法见 [开发指南](https://github.com/baiye1997/MEB-DSH/blob/main/CONTRIBUTING.md)。

## 开源协议与致谢

项目使用 [MIT 开源协议](https://github.com/baiye1997/MEB-DSH/blob/main/LICENSE)。第三方组件、字体及其许可证见 [第三方声明](https://github.com/baiye1997/MEB-DSH/blob/main/THIRD-PARTY-NOTICES.md)，保留各自的版权与许可。
