# 安全

Tessera 最终输出静态 HTML、CSS 和 JavaScript。安全边界仍由 Hexo 站点配置、部署平台，以及你启用的第三方服务共同决定。

## 配置建议

- 不要把 API key、评论服务密钥或统计服务管理令牌写进主题仓库。使用站点部署平台的环境变量，并确认构建产物不会包含秘密。
- `inject.head`、`inject.bottom` 与 `footer.custom_text` 支持自定义 HTML。只放入自己信任、经过审查的内容；不要直接渲染访客提交的 HTML。
- 启用评论、统计、分享、聊天或 CDN 前，检查供应商的隐私政策、脚本来源和内容安全策略。可以在 [`CDN 与注入`](/advanced/cdn) 中选择本地资源以减少第三方请求。
- 发布前运行 `hexo clean && hexo generate`，并在部署平台开启 HTTPS、依赖更新和访问日志保护。

发现主题本身的安全漏洞，请参阅仓库根目录的 [安全策略](https://github.com/LumiDesk/hexo-theme-tessera/blob/main/SECURITY.md)，不要在公开 Issue 中粘贴可利用细节。
