# 更新与回退

本仓库为私人代码仓库。首个基线标签：`baseline-2026-09-22`。

## 日常更新

在 MEB 根目录先查看改动并运行测试，只提交本次修改的文件。

```sh
git status
npm test --prefix workbench
npm run build --prefix workbench
git add <本次修改的文件>
git diff --cached --stat
git commit -m "说明本次改动"
git push origin main
```

更新另一台机器时，先提交或妥善保留本地改动，再 `git pull --ff-only`，按根 README 安装依赖并构建。构建会触发本地 DSH 插件热更新，先保存页面中的未保存输入。

## 安全回退

先保存工作台业务数据并导出完整备份，再确保 `git status` 干净。

- 撤销某次提交：`git revert <提交号>`，检查与构建通过后 `git push`。保留后续历史，不强推。
- 只查看今晚基线：`git worktree add --detach ../MEB-baseline baseline-2026-09-22`，在独立目录检查，不改当前工作目录。
- 定位版本：`git log --oneline --decorate`、`git tag`。

Git 回退只影响代码，不回退已保存的业务数据；旧代码可能不支持新数据。业务数据应使用工作台「备份与设置 → 导出完整备份」，恢复前再备份当前数据。备份留在本机或个人备份盘，不提交到代码仓库。
