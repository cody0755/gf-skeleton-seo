
# Intro
本项目为示例说明，来测试如何把 gulp 前端构建与 node/express 的后端模板(swig) 结合起来使用，要解决的问题是：

- 开发时， gulp serve 和 node app.js 怎么结合watch， 怎么 browser sync(livereload) 结合 nodemon 实现前后端刷新
- 部署时， useref（usemin) 如何结合后端模板 layout 中指明的assets依赖和concat/minify/rev 等

## Frontend

前端部分包括：

- sass(compass) 来做 css preprocessor
- css sprite 图片精灵如何做
- retina images 怎么做
- javascript in es6 with babel
- swig 模板引擎中的 filter, layout 等用法
- useref 标注用于 concat/minify/rev 等
- bower_components 引入外部依赖（可github管理）
- vendors 引入第三方依赖库（无法github管理）
- webpack 用做 module builder （避免html中指明js依赖）
- browser-sync 用于多屏幕测试
- sourcemap 是否需要在 dev 时候关闭等

```bash
├── vendors
├── bower_components
├── fonts
├── images
│   ├── 404.jpg
│   ├── icon
│   ├── icon-2x
│   ├── icon-2x-s84bf245851.png
│   ├── icon-s93604f3cb4.png
├── scripts
│   ├── components
│   │   └── helper.js
│   │   └── login.js
│   ├── page1.js
│   └── <module>/<page>.js
├── scss
│   ├── base
│   │   ├── _normalize.scss
│   │   ├── _standardColors.scss
│   │   └── _typography.scss
│   ├── components
│   │   └── _icons.scss
│   ├── page1.scss
│   └── <module>/<page>.scss
└── views
    ├── 404.html
    ├── page1.html
    ├── <module>
    │   ├── <page>.html
    ├── layouts
    │   ├── page.html
    │   └── primary.html
    │   └── portal.html
    ├── pages
    │   ├── about.html
    │   ├── contact.html
    │   ├── faq.html
    ├── partials
    │   ├── s-download-btn.html
    │   ├── s-video-detail.html
    │   ├── s-video-item.html
    │   ├── footer.html
    │   ├── siteNav.html
    │   ├── header.html
    │   └── spf-hook.html
```

## Server

后端需要考虑的是：

- logger 模块与设置（bunyan)
- cache(view 层 cache, 数据层 cache 等)
- 全部的异步代码异常的捕获
- routes 的风格写法
- New Relic 性能监控
- 代码如何发布（ view 目录切换）

```bash
├── app.js
└── routers.js
├── controllers
│   ├── example1.js
│   ├── home.js
│   └── pages.js
├── helpers
├── root
│   ├── favicon.ico
│   ├── robots.txt
│   └── sitemap.xml
```


## Develop


举例：

开发 info/video/list 这个页面 （5.1资管资讯_视频资讯）

```scss
@import "compass"; // 引入 sass 脚手架

@import "base/reset"; // 引入基础（如reset/normalize, 通用字体设置，颜色值等）
@import "base/typography";

@import "component/form"; // 引入 ui 组件样式
@import "component/header";
@import "component/step-progress-bar";

// 通过命名空间，命名前缀来避免冲突
.mod-form {
    input {}
    input[type="file"] {}
}

.pg-about {
    .hero {}
    .section1 {}
}

```

```html
<!-- 引入布局文件 -->
{% extends 'layouts/portal.html' %}

<!-- 设置页面标题 -->
{% set Title = "我是一个页面标题" %}

<!-- 引入页面样式 -->
{% block portal-style %}
<link rel="stylesheet" href="styles/index-style.css">
{% endblock %}

<!-- 引入页面脚本 -->
{% block portal-script %}
<!-- 外联的写法 -->
<script src="scripts/info/video/list.js" ></script>
<!-- 内联的写法：如果仅仅是几行的话 -->
<script type="text/javascript">
  $(function(){ benzi.bzBanner(); });
</script>
{% endblock %}

```

```js
// <script src="vendors/bzBanner.min.js" ></script>
// Todo: wepack 示例，把脚本在 global 中eval等
// 可以使用 es6
// Todo: jshint 不检查 vendors/bower_components 里的
```

```js
// express 路由设置和视图处理
routes.list = function(req, res) {
    var list = []; // fetch from api?
    res.render('info/video/list', {
        list: list
    });
}
```


业务层目录结构约定：
原则是为了更好的定位具体代码的位置。所以需要 views/scss/scripts/controllers 中的文件名和目录名保持一致。

- 特定页面的脚本或样式如果量比较少，可以采取内联的方式
- 特定页面的脚本 `controller` 视图逻辑较少的情况下， 可以把 express 的路由处理写在 `routers.js` 或者以写在 `controllers/<module>.js` 而不是 `controllers/<module>/<page>.js`

页面路径对照：

```bash
index                       1.0资产管理首页
about                       2.0关于资管
product/list                3.0旗下产品
product/detail/:id          3.1旗下产品_详情
info/message/detail/:id     5.0资管资讯_动态信息_正文
info/message/list           5.0资管资讯_动态信息
info/video/detail/:id       5.1资管资讯_视频资讯_正文
info/video/list             5.1资管资讯_视频资讯
service                     6.0客户服务
faq                         6.1客户服务_常见问题
assets/directed/index       7.0我的资管_定向产品
assets/directed/query       7.1我的资管_定向产品_资产查询
assets/directed/password    7.2我的资管_定向产品_修改密码
assets/portfolio/index      8.0我的资管_集合产品
assets/portfolio/custom     8.2我的资管_集合产品_服务定制
assets/portfolio/basic      8.3我的资管_集合产品_基本信息
```

## 其他

为 swig 引入特殊的宏处理： title, includeJs, includeCss 配置项
proxy /api/<endpoint> to t1.gf.com.cn/<endpoint>

## Todo

- [ ] SPF 支持
- [ ] CDN上传和替换支持！
- [ ] datauri(base64 支持？

