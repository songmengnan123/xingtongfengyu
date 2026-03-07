# Git 远程仓库配置指南

本指南将教您如何建立远程仓库并将代码推送到 GitHub 或 GitLab。

## 📋 前置条件

1. 已安装 Git（已在环境中配置）
2. 拥有 GitHub 或 GitLab 账号
3. 本地代码已完成开发并提交到 Git

## 🚀 步骤一：创建远程仓库

### 方式 A：使用 GitHub

1. **登录 GitHub**
   - 访问 https://github.com
   - 使用您的账号登录

2. **创建新仓库**
   - 点击右上角的 `+` 号
   - 选择 `New repository`

3. **填写仓库信息**
   ```
   Repository name: xingtongfengyu  # 仓库名称
   Description: 行同风与 - 轻中式风格文化平台  # 仓库描述
   Public/Private: 选择公开或私有
   ```

4. **创建仓库**
   - 点击 `Create repository` 按钮
   - 选择 "我有一个现有的仓库" 选项
   - 复制下面的推送命令

### 方式 B：使用 GitLab

1. **登录 GitLab**
   - 访问 https://gitlab.com
   - 使用您的账号登录

2. **创建新项目**
   - 点击 `New project`
   - 选择 `Create blank project`

3. **填写项目信息**
   ```
   Project name: xingtongfengyu
   Visibility Level: 选择可见性级别
   ```

4. **创建项目**
   - 点击 `Create project`
   - 复制推送命令

## 🔗 步骤二：关联远程仓库

### 如果使用 GitHub

```bash
# 1. 在项目根目录执行
cd /workspace/projects

# 2. 添加远程仓库（替换 YOUR_USERNAME 为您的GitHub用户名）
git remote add origin https://github.com/YOUR_USERNAME/xingtongfengyu.git

# 3. 验证远程仓库
git remote -v

# 4. 推送代码到远程仓库
git push -u origin main
```

### 如果使用 GitLab

```bash
# 1. 在项目根目录执行
cd /workspace/projects

# 2. 添加远程仓库（替换 YOUR_USERNAME 为您的GitLab用户名）
git remote add origin https://gitlab.com/YOUR_USERNAME/xingtongfengyu.git

# 3. 验证远程仓库
git remote -v

# 4. 推送代码到远程仓库
git push -u origin main
```

## 🔐 步骤三：配置认证（如果需要）

### 方式 A：使用个人访问令牌（推荐）

**GitHub:**

1. 生成 Personal Access Token
   - GitHub → Settings → Developer settings → Personal access tokens
   - 选择 `Tokens (classic)`
   - 点击 `Generate new token (classic)`
   - 勾选 `repo` 权限
   - 点击 `Generate token`
   - 复制生成的 token

2. 推送时使用 token
```bash
git push -u origin main
# 当提示输入密码时，粘贴您的 token（不是 GitHub 密码）
```

**GitLab:**

1. 生成 Personal Access Token
   - GitLab → Preferences → Access Tokens
   - 点击 `Add new token`
   - 勾选 `read_repository` 和 `write_repository` 权限
   - 点击 `Create personal access token`
   - 复制生成的 token

2. 推送时使用 token
```bash
git push -u origin main
# 当提示输入密码时，粘贴您的 token
```

### 方式 B：使用 SSH 密钥（更安全）

1. **生成 SSH 密钥**
```bash
ssh-keygen -t ed25519 -C "your_email@example.com"
# 按回车使用默认路径
# 可以设置密码，也可以留空
```

2. **查看并复制公钥**
```bash
cat ~/.ssh/id_ed25519.pub
# 复制输出的内容
```

3. **添加 SSH 密钥到平台**

**GitHub:**
   - Settings → SSH and GPG keys → New SSH key
   - 粘贴公钥内容
   - 点击 `Add SSH key`

**GitLab:**
   - Preferences → SSH Keys → Add new key
   - 粘贴公钥内容
   - 点击 `Add key`

4. **使用 SSH 地址推送**
```bash
# 修改远程仓库地址为 SSH 格式
git remote set-url origin git@github.com:YOUR_USERNAME/xingtongfengyu.git

# 推送代码
git push -u origin main
```

## 📝 步骤四：常用 Git 命令

### 查看状态
```bash
git status          # 查看当前状态
git log             # 查看提交历史
git diff            # 查看未暂存的修改
```

### 提交更改
```bash
git add .           # 添加所有修改
git add <file>      # 添加指定文件
git commit -m "message"  # 提交修改
```

### 推送和拉取
```bash
git push            # 推送到远程仓库
git pull            # 拉取远程仓库的更新
```

### 分支管理
```bash
git branch          # 查看分支
git branch <name>   # 创建新分支
git checkout <name> # 切换分支
git merge <name>    # 合并分支
```

## ⚠️ 常见问题

### 问题 1：推送时提示 "authentication failed"

**解决方法：**
- 检查用户名和密码/token是否正确
- 如果使用 token，确保使用的是个人访问令牌，而不是账号密码

### 问题 2：提示 "remote origin already exists"

**解决方法：**
```bash
# 移除现有的远程仓库
git remote remove origin

# 重新添加
git remote add origin <远程仓库地址>
```

### 问题 3：推送时提示 "updates were rejected"

**解决方法：**
```bash
# 强制推送（谨慎使用，会覆盖远程代码）
git push -u origin main --force

# 或者先拉取远程更新
git pull origin main --rebase
git push -u origin main
```

## 🎯 下一步

完成上述步骤后，您的代码就已经成功推送到远程仓库了！

您可以：
1. 访问远程仓库查看代码
2. 与团队成员协作开发
3. 设置 CI/CD 自动化部署
4. 使用 Issues 和 Pull Requests 进行代码审查

## 📚 参考资源

- [GitHub 官方文档](https://docs.github.com)
- [GitLab 官方文档](https://docs.gitlab.com)
- [Git 官方文档](https://git-scm.com/doc)
