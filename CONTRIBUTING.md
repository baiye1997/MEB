# 开发指南

## 本地构建

需要 Node.js 22 或更新版本，以及 npm。

```sh
git clone https://github.com/baiye1997/MEB-DSH.git
cd MEB-DSH/workbench
npm ci
npm run build
```

在 DSH Desktop 的「添加插件」中输入本地 `workbench` 目录的完整路径。修改源码后重新构建，并按 DSH 提示重启以加载更新。

## 从 GitHub 安装

「添加插件」也接受以下来源：

```text
github:baiye1997/MEB-DSH#main&path:workbench
```

这是 pnpm 的 Git 来源写法：`main` 指定分支，`&path:workbench` 指定仓库内的包目录。它不是普通网页地址，也不需要粘贴到 YAML。参数说明见 [pnpm 文档](https://pnpm.io/package-sources#install-from-a-git-repository-combining-different-parameters)。

命令行中应将整个来源放在引号内，避免 shell 将 `&` 当作后台执行符。不同 DSH 版本的 Git 子目录安装支持可能不同；遇到解析或构建问题时，使用 npm 发布包，或先按上节构建再安装本地目录。

## 提交前检查

在 `workbench` 下运行：

```sh
npm run verify
npm audit --omit=dev --audit-level=high
```

`verify` 包含逻辑测试、渲染检查、生产构建和 npm 包结构检查。请使用合成测试数据，不提交凭据、业务文件、宿主数据、导出备份或本机路径。

CAD 开发环境可使用 `npm run setup:cad` 建立；该命令依赖 uv，系统还需安装 LibreDWG。发布包不包含 Python 虚拟环境，用户配置方法见 [CAD 环境配置](docs/cad-setup.md)。

## 发布包

```sh
npm run verify
npm pack --dry-run
npm publish --access public --registry=https://registry.npmjs.org/
```

npm 包名为 `meb-workbench`。发布时保持 `package.json` 与 `package-lock.json` 的版本一致；GitHub 仓库名为 `MEB-DSH`。发布包保留构建产物、DSH bundle 入口、说明及许可证，源码仓库不提交依赖目录和构建产物。

## 目录

```text
docs/                    用户说明与配图
workbench/src/           工作台与 DSH 集成源码
workbench/test-fixtures/ 合成测试数据与检查脚本
workbench/dsh.bundle.patch
workbench/package.json
```
