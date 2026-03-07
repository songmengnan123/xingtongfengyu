# 🌏 国内访问解决方案

## 问题原因
Vercel 在国内被墙了，无法直接访问。

---

## 🎯 解决方案（按推荐顺序）

### 方案 1：使用 Cloudflare Pages（国内可访问）

**步骤**：
1. 访问：https://dash.cloudflare.com/efaa38cb80cf22ff118e03ea36f9f592/pages
2. 点击 "Create a project"
3. 点击 "Connect to Git"
4. 选择仓库 `xingtongfengyu`
5. 点击 "Begin setup"
6. **构建设置**：
   - Framework: Next.js
   - Build command: `pnpm run build`
   - Output directory: `.next`
7. **环境变量**：
   - `COZE_BUCKET_ENDPOINT_URL` = `https://s3.coze-coding.com`
   - `COZE_BUCKET_NAME` = `xingtongfengyu`
8. 点击 "Save and Deploy"

**完成后会得到**：
```
https://xingtongfengyu.pages.dev
```
**这个域名国内可以访问！**

---

### 方案 2：使用 VPN

如果你有 VPN：
- 连接 VPN 后访问 Vercel 域名
- 或者使用 VPN 浏览器插件

---

### 方案 3：本地使用（最简单）

直接在本地运行：

```bash
cd /workspace/projects
pnpm install
pnpm run dev
```

然后访问：`http://localhost:5000`

**优点**：
- 无需部署
- 速度最快
- 功能完整

**缺点**：
- 只能在本机访问
- 需要保持电脑运行

---

### 方案 4：使用 Cloudflare Workers 反向代理（复杂）

需要创建 Cloudflare Worker，配置反向代理，比较复杂。

---

## 🎯 我的建议

**使用方案 1（Cloudflare Pages）**：
- 国内可以访问
- 步骤不算多
- 功能完整
- 免费使用

**或者使用方案 3（本地使用）**：
- 最简单
- 无需配置
- 只要在本机用就行

---

## ❓ 如果你实在太累不想操作

那就只能**本地使用**了，代码都准备好了，功能都完整！

你需要哪个方案？我帮你详细指导！
