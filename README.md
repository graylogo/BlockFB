# BlockFB VIP - 粉笔VIP广告屏蔽扩展

一个功能强大的Chrome浏览器扩展，专为屏蔽粉笔（Fenbi）网站上的VIP广告和视频解析而设计。

## ✨ 核心功能

- 🚫 **自动屏蔽VIP广告**：智能识别并移除粉笔答题解析页面上的VIP会员广告
- 📹 **隐藏视频解析**：自动屏蔽需要VIP权限的视频解析部分
- 🔄 **SPA路由支持**：完美支持单页应用（SPA）路由跳转，从其他页面导航到解析页面时仍能正常工作
- ⚡ **高性能设计**：采用节流机制和智能检查策略，避免不必要的性能开销
- 📱 **全面支持**：支持所有Fenbi子域名和页面
- 🔍 **详细日志**：提供丰富的控制台日志，便于调试和监控

## 🚀 安装方法

### 从Chrome Web Store安装
1. 访问Chrome Web Store中的[BlockFB VIP扩展页面]()
2. 点击"添加至Chrome"按钮
3. 在弹出的确认对话框中点击"添加扩展程序"
4. 扩展将自动安装并显示在Chrome工具栏中

### 本地开发安装
1. 下载或克隆此仓库到本地
2. 打开Chrome浏览器，进入`chrome://extensions/`
3. 启用"开发者模式"（右上角开关）
4. 点击"加载已解压的扩展程序"，选择此文件夹
5. 扩展将自动安装并启用

## 📖 使用说明

1. 安装扩展后，无需任何额外设置
2. 访问粉笔网站的答题解析页面（如：https://spa.fenbi.com/ti/exam/solution/*）
3. 扩展将自动识别并屏蔽VIP广告和视频解析
4. 可以通过Chrome工具栏中的扩展图标查看扩展状态

## 🎯 支持的页面

- 粉笔答题解析页面：`https://spa.fenbi.com/ti/exam/solution/*`
- 所有Fenbi子域名页面：`https://*.fenbi.com/*`

## 📁 文件结构

```
BlockFB/
├── manifest.json      # 扩展配置文件
├── content.js         # 内容脚本，核心屏蔽逻辑
├── icon16.png         # 16x16图标
├── icon32.png         # 32x32图标
├── icon48.png         # 48x48图标
├── icon128.png        # 128x128图标
├── README.md          # 项目说明文档
└── screen/            # 截图目录
    └── 屏幕截图.jpg    # 功能截图
```

## 🔧 技术实现

### 核心技术
- Chrome Extension Manifest V3
- JavaScript (ES6+)
- MutationObserver API
- History API 拦截
- SPA路由检测

### 屏蔽策略
1. **视频解析屏蔽**：识别并移除所有带有视频解析的section元素
2. **会员广告屏蔽**：屏蔽所有会员相关容器、标签和按钮
3. **文本内容匹配**：移除包含特定VIP文本的元素
4. **动态监控**：使用MutationObserver实时监控DOM变化
5. **智能检查**：分阶段定时器检查，确保广告被彻底屏蔽

## 📋 更新日志

### v1.0.0 (2026-01-19)
- ✨ 初始发布版本
- 🚫 实现VIP广告自动屏蔽
- 📹 实现视频解析自动屏蔽
- 🔄 支持SPA路由跳转
- ⚡ 高性能设计
- 📱 全面支持所有Fenbi页面

## 🤝 贡献指南

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

## ⚠️ 免责声明

- 本扩展仅用于学习和研究目的
- 请遵守粉笔网站的使用条款和隐私政策
- 作者不对任何使用本扩展造成的问题负责

## 📞 支持与反馈

如果您遇到任何问题或有任何建议，欢迎通过以下方式联系我们：

- 提交 [Issue](https://github.com/yourusername/BlockFB/issues)
- 发送邮件至：your@email.com

---

**享受无VIP广告的粉笔答题体验！** 🎉
