# xiaoben520.github.io

<p align="center">
  <img src="https://avatars.githubusercontent.com/u/26668842?v=4" width="120" style="border-radius: 50%;"/>
</p>

<p align="center">
  <strong>xiaoben520 的个人网站</strong><br>
  武汉大学 · 代码 · 玩具 · 生活
</p>

<p align="center">
  <a href="https://xiaoben520.github.io">🌐 访问网站</a>
  &nbsp;|&nbsp;
  <a href="https://github.com/xiaoben520">🐙 GitHub</a>
</p>

---

## 技术栈

- **Vite + React 18** — 现代前端框架
- **React Router** — 客户端路由
- **纯 CSS** — 零 UI 依赖，手写样式
- **Font Awesome** — 图标库
- **Google Fonts (Inter)** — 字体
- **GitHub Actions** — 自动构建部署
- **GitHub Pages** — 免费托管

## 站点结构

```
├── index.html                 # Vite 入口
├── src/
│   ├── main.jsx               # React 入口
│   ├── App.jsx                # 路由 & 布局
│   ├── App.css                # 全局样式 (深海蓝主题)
│   ├── components/
│   │   ├── Navbar.jsx         # 顶部导航栏
│   │   ├── Footer.jsx         # 页脚
│   │   └── PostCard.jsx       # 博客文章卡片
│   └── pages/
│       ├── Home.jsx           # 首页 — 动态渐变 Hero + 导航卡片 + 最新文章
│       ├── Blog.jsx           # 博客列表 — 分类筛选 + 日期排序
│       ├── Toys.jsx           # 小玩具 — 外部项目链接
│       └── About.jsx          # 关于我 — 个人简介 + 技能 + 时间线
├── public/
│   └── blog/
│       └── posts/             # 静态博客文章 (HTML + index.json)
├── .github/workflows/deploy.yml  # GitHub Actions 自动部署
└── README.md
```

## 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览构建结果
npm run preview
```

## 添加博客文章

1. 在 `public/blog/posts/` 下创建 `.html` 文件
2. 在 `public/blog/posts/index.json` 中注册文章信息（标题、日期、分类、摘要）
3. 推送部署后自动生效

## 配色

| 角色 | 色值 |
|------|------|
| 主色 | `#3B82F6` |
| 主色暗 | `#2563EB` |
| 深海蓝 | `#1E3A5F` |
| 点缀青 | `#06B6D4` |
| 点缀紫 | `#8B5CF6` |

## 许可证

MIT © 2025-2026 awapwq233
