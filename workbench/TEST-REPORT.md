# 验证记录

最后验证：2026-10-14。

## 自动检查

在 `workbench` 目录执行：

```sh
npm ci
npm run verify
npm audit --omit=dev --audit-level=high
```

结果：

- 96 项逻辑测试通过
- 渲染检查通过
- 生产构建通过
- npm 包结构检查通过，10 个发布文件
- `npm ci` 正常安装
- 生产依赖审计无高危漏洞
- `git diff --check` 通过

## 发布包检查

`npm pack --dry-run` 确认包内包含：

- `dsh.bundle.patch`
- `lib/index.js`
- `lib/client.js`
- `lib/model-embed.html`
- `lib/excel-worker.html`
- MIT License 与 README

包内不包含 `node_modules`、Python 虚拟环境、缓存、导出文件或本机业务数据。

## DSH Desktop 隔离验证

使用 DSH Desktop 自带 CLI 和临时 `DSH_HOME`：

1. 安装 npm tarball 到 `desktop` profile。
2. 确认 profile bundle 清单含 `meb-workbench`。
3. 确认 `--dump-config` 输出 MEB bundle patch。

没有修改用户当前 Desktop profile，也没有发送真实项目数据。

## 尚未覆盖

- npm registry 正式发布后的市场安装
- DSH Market 目录收录后的检索与安装
- Windows 原生环境
- LibreDWG、Python `ezdxf` 在其他机器上的安装差异
- 大型真实 DWG 的识别质量
