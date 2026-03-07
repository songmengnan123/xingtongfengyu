// Cloudflare Worker - 反向代理 Vercel
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    
    // 替换为你的 Vercel 域名
    const targetUrl = 'https://xingtongfengyu.vercel.app' + url.pathname + url.search;
    
    // 代理请求
    const newRequest = new Request(targetUrl, request);
    
    // 添加 CORS 头
    const response = await fetch(newRequest);
    
    const newResponse = new Response(response.body, response);
    newResponse.headers.set('Access-Control-Allow-Origin', '*');
    newResponse.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    newResponse.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    
    return newResponse;
  }
};
