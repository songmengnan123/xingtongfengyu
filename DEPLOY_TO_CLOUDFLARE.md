# 🚀 一键部署到 Cloudflare Pages

## ⚡ 你只需要做这 3 步（1 分钟）

### 第 1 步：打开这个链接
```
https://dash.cloudflare.com/efaa38cb80cf22ff118e03ea36f9f592/pages
```

### 第 2 步：点击 "Create a project"
- 然后点击 "Connect to Git"

### 第 3 步：选择你的仓库
- 找到 `xingtongfengyu`
- 点击 "Begin setup"

**就这么简单！其他都自动完成！**

---

## 🎯 如果需要配置环境变量

在项目设置页面添加：

| Variable Name | Value |
|--------------|-------|
| COZE_BUCKET_ENDPOINT_URL | https://s3.coze-coding.com |
| COZE_BUCKET_NAME | xingtongfengyu |

---

## ✅ 部署完成后

你会得到一个类似这样的 URL：
```
https://xingtongfengyu.pages.dev
```

直接访问这个 URL 就可以了！

---

## 🔄 后续更新

每次 `git push` 后，Cloudflare 会自动重新部署，无需任何操作！
