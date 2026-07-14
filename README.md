# awaqwq233.github.io

<p align="center">
  <img src="https://avatars.githubusercontent.com/u/26668842?v=4" width="120" style="border-radius: 50%;"/>
</p>

<p align="center">
  <strong>awaqwq233 的个人网站</strong><br>
  武汉大学 · 代码 · 玩具 · 生活
</p>

<p align="center">
  <a href="https://awaqwq233.github.io">🌐 访问网站</a>
  &nbsp;|&nbsp;
  <a href="https://github.com/xiaoben520">🐙 GitHub</a>
</p>

---

## 站点结构

```
├── index.html              # 首页 — 英雄区 + 特色导航 + 最新文章
├── blog/
│   ├── index.html          # 博客列表 — 支持分类筛选 + 日期排序
│   └── posts/              # 博客文章 + index.json 数据索引
├── toys/
│   └── index.html          # 小玩具展示 — 外部项目链接
├── about/
│   └── index.html          # 关于我
├── assets/
│   ├── css/style.css       # 全局样式 (蓝色主题)
│   └── js/main.js          # 全局交互脚本
└── README.md
```

## 技术栈

- **纯静态 HTML / CSS / JavaScript** — 无需构建工具
- **GitHub Pages** 免费托管
- **Font Awesome** 图标库
- **Google Fonts (Inter)** 字体
- 主题色: `#3B82F6` (海洋蓝)

## 本地开发

项目根目录直接用浏览器打开即可预览，无需安装任何依赖。

```bash
# 克隆仓库
git clone https://github.com/xiaoben520/awaqwq233.github.io.git

# 用浏览器打开 index.html 即可
```

## 添加博客文章

1. 在 `blog/posts/` 下创建 `.html` 文件
2. 在 `blog/posts/index.json` 中注册文章信息（标题、日期、分类、摘要）
3. 推送部署后自动生效

## 许可证

MIT © 2025-2026 awapwq233
