import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-muted/30 mt-20">
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* 版权信息 */}
          <div className="text-sm text-muted-foreground">
            <p>© 2024 行同风与. All rights reserved.</p>
          </div>

          {/* 备案号 */}
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <a
              href="https://beian.miit.gov.cn/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              京ICP备12345678号-1
            </a>
            <a
              href="https://www.beian.gov.cn/portal/registerSystemInfo"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              京公网安备 11000002000001号
            </a>
          </div>

          {/* 联系链接 */}
          <div className="flex items-center gap-6 text-sm">
            <Link
              href="/contact"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              联系我们
            </Link>
            <Link
              href="/privacy"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              隐私政策
            </Link>
            <Link
              href="/terms"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              服务条款
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
