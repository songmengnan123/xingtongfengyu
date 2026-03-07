# Git 代码推送命令

## 🚀 方式一：使用 HTTPS（推荐新手）

### 步骤 1：添加远程仓库
```bash
cd /workspace/projects

# 将 YOUR_USERNAME 替换为您的 GitHub 用户名
git remote add origin https://github.com/YOUR_USERNAME/xingtongfengyu.git
```

### 步骤 2：推送代码
```bash
git push -u origin main
```

---

## 🔐 方式二：使用 SSH（推荐有经验的用户）

### 步骤 1：添加远程仓库（SSH）
```bash
cd /workspace/projects

# 将 YOUR_USERNAME 替换为您的 GitHub 用户名
git remote add origin git@github.com:YOUR_USERNAME/xingtongfengyu.git
```

### 步骤 2：推送代码
```bash
git push -u origin main
```

---

## 🎯 方式三：使用 GitHub CLI（最简单）

### 如果您已安装 GitHub CLI：
```bash
cd /workspace/projects

# 创建仓库并推送（自动配置远程）
gh repo create xingtongfengyu --public --source=. --remote=origin --push
```

---

## 📝 完整示例（以用户名 "example" 为例）

### 方式一：HTTPS 推送
```bash
cd /workspace/projects
git remote add origin https://github.com/example/xingtongfengyu.git
git push -u origin main
```

### 方式二：SSH 推送
```bash
cd /workspace/projects
git remote add origin git@github.com:example/xingtongfengyu.git
git push -u origin main
```

### 方式三：GitHub CLI
```bash
cd /workspace/projects
gh repo create xingtongfengyu --public --source=. --remote=origin --push
```

---

## ⚠️ 常见问题

### 问题 1：如果提示 "remote origin already exists"
```bash
# 先删除旧的远程仓库配置
git remote remove origin

# 然后重新添加
git remote add origin https://github.com/YOUR_USERNAME/xingtongfengyu.git

# 推送
git push -u origin main
```

### 问题 2：如果推送时需要输入密码
- 对于 HTTPS：输入您的 GitHub 密码或 Personal Access Token
- 对于 SSH：使用您的 SSH 密钥（如果已配置）

### 问题 3：如果提示 "updates were rejected"
```bash
# 强制推送（谨慎使用）
git push -u origin main --force

# 或者先拉取远程更新
git pull origin main --rebase
git push -u origin main
```

---

## 🔍 查看和验证

### 查看远程仓库配置
```bash
git remote -v
```

### 查看当前状态
```bash
git status
```

### 查看提交历史
```bash
git log --oneline -10
```

---

## 📚 下一步

推送完成后，您可以：
1. 访问您的仓库：https://github.com/YOUR_USERNAME/xingtongfengyu
2. 设置仓库描述和标签
3. 添加 README.md
4. 与团队协作开发
