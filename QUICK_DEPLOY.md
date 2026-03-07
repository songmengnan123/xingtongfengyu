# 🚀 一键部署到 Cloudflare Pages

## ⚡ 只需要 3 条命令（2 分钟完成）

### 第 1 步：安装 Wrangler（已经装过了，跳过）
```bash
npm install -g wrangler
```

### 第 2 步：登录 Cloudflare
```bash
npx wrangler login
```
**操作**：
- 会自动打开浏览器
- 点击 "Authorize" 授权
- 然后关闭浏览器

### 第 3 步：部署
```bash
cd /workspace/projects
npx wrangler pages project create xingtongfengyu --production-branch=main
npx wrangler pages deploy .next --project-name=xingtongfengyu
```

---

## ✅ 完成后

会显示你的网站 URL：
```
https://xingtongfengyu.pages.dev
```

---

## 🔧 如果需要配置环境变量

```bash
npx wrangler pages secret put COZE_BUCKET_ENDPOINT_URL --project-name=xingtongfengyu
# 输入: https://s3.coze-coding.com

npx wrangler pages secret put COZE_BUCKET_NAME --project-name=xingtongfengyu
# 输入: xingtongfengyu
```

---

## ❓ 如果还是不行

那就用这个**最笨但最简单的方法**：

1. 访问：https://dash.cloudflare.com/efaa38cb80cf22ff118e03ea36f9f592/pages
2. 点击 "Create a project"
3. 点击 "Connect to Git"
4. 选择仓库 `xingtongfengyu`
5. 点击 "Begin setup"
6. **不要修改任何设置**，直接点击 "Save and Deploy"

**全部使用默认设置就行！Cloudflare 会自动识别 Next.js！**
