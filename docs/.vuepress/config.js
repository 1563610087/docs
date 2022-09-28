module.exports = {
  base: '/',
  title: 'UFO基地',
  description: 'Hello, my friend!',
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      // { text: '指南', link: '/guide/' },
      {
        text: '前端',
        items: [
          {
            text: '前端基础',
            items: [
              { text: 'html', link: '/frontEnd/frontBase/html/htmlBase.md' },
              { text: 'css', link: '/frontEnd/frontBase/css/cssBase.md' },
              { text: 'javascript', link: '/frontEnd/frontBase/javascript/string.md' },
            ]
          },
          {
            text: '前端框架',
            items: [
              { text: 'vue', link: '/frontEnd/frontFrame/vue/vueBase.md' },
              { text: 'react', link: '/frontEnd/frontFrame/react/reactBase.md' },
              { text: 'nodejs', link: '/frontEnd/frontFrame/nodejs/nodejs.md' },
              { text: 'webpack', link: '/frontEnd/frontFrame/webpack/webpack.md' },
            ]
          },
          {
            text: 'web基础',
            items: [
              { text: '浏览器', link: '/frontEnd/webTech/browser/browser.md' },
              { text: 'ajax', link: '/frontEnd/webTech/ajax/ajax.md' },
              { text: 'http', link: '/frontEnd/webTech/http/http.md' },
              { text: '性能优化', link: '/frontEnd/webTech/optimize/optimize.md' },
            ]
          },
        ]
      },
      { text: '后端', link: '/backEnd/' },
      {
        text: '通用',
        items: [
          { text: 'git文档', link: '/normal/github/gitNotes' },
          { text: '算法', link: '/normal/algorithm/dataStructure.md' },
          { text: 'nginx', link: '/normal/nginx/nginx.md' },
          { text: '数据库', link: '/normal/database/mysqlBase.md' },
          {
            text: '编辑器',
            items: [
              { text: 'idea', link: '/normal/editTool/idea/idea.md' },
              { text: 'vscode', link: '/normal/editTool/vscode/vscode.md' },
              { text: 'vim', link: '/normal/editTool/vim/vim.md' },
            ]
          },
        ]
      },
      {
        text: '架构',
        items: [
          {
            text: '前端架构',
            items: [
              { text: "webpack", link: '/framework/frontFramework/webpack/webpack.md' }
            ]
          },
        ]
      },
    ],
    sidebar: {
      // 前端基础
      "/frontEnd/frontBase/html/": [
        { title: 'html', path: '/frontEnd/frontBase/html/htmlBase.md' }
      ],
      "/frontEnd/frontBase/css/": [
        { title: 'css', path: '/frontEnd/frontBase/css/cssBase.md' },
        { title: 'css3', path: '/frontEnd/frontBase/css/css3.md' },
        { title: 'sass', path: '/frontEnd/frontBase/css/sass.md' }
      ],
      "/frontEnd/frontBase/javascript/": [
        { title: '字符串', path: '/frontEnd/frontBase/javascript/string.md' },
        { title: '数组', path: '/frontEnd/frontBase/javascript/array.md' },
        { title: 'BOM_DOM', path: '/frontEnd/frontBase/javascript/BOM_DOM.md' },
        { title: 'ES6基础', path: '/frontEnd/frontBase/javascript/ES6Base.md' },
        { title: 'js基础', path: '/frontEnd/frontBase/javascript/jsBase.md' },
        { title: 'js进阶', path: '/frontEnd/frontBase/javascript/jsAdvance.md' },
        { title: '模块机制', path: '/frontEnd/frontBase/javascript/jsModule.md' },
        { title: '设计模式', path: '/frontEnd/frontBase/javascript/jsDesignMode.md' }
      ],
      //前端框架
      "/frontEnd/frontFrame/vue/": [
        { title: 'vue基础', path: '/frontEnd/frontFrame/vue/vueBase.md' },
        { title: 'vue进阶', path: '/frontEnd/frontFrame/vue/vueAdvance.md' }
      ],
      "/frontEnd/frontFrame/react/": [
        { title: 'react基础', path: '/frontEnd/frontFrame/react/reactBase.md' },
        { title: 'react进阶', path: '/frontEnd/frontFrame/react/reactAdvance.md' },
        // {title: 'react路由', path:'/frontEnd/frontFrame/react/reactRouter.md'}
      ],
      "/frontEnd/frontFrame/nodejs/": [
        { title: 'node基础', path: '/frontEnd/frontFrame/nodejs/nodejs.md' },
      ],
      //web技术
      "/frontEnd/webTech/browser/": [
        { title: '浏览器', path: '/frontEnd/webTech/browser/browser.md' }
      ],
      "/frontEnd/webTech/ajax/": [
        { title: 'ajax', path: '/frontEnd/webTech/ajax/ajax.md' }
      ],
      "/frontEnd/webTech/optimize/": [
        { title: '性能优化', path: '/frontEnd/webTech/optimize/optimize.md' }
      ],
      "/frontEnd/webTech/http/": [
        { title: 'http', path: '/frontEnd/webTech/http/http.md' },
        { title: 'https', path: '/frontEnd/webTech/http/https.md' }
      ],
      //通用技术
      "/normal/github": [
        { title: 'git文档', path: '/normal/github/gitNotes' },
      ],
      "/normal/nginx": [
        { title: 'nginx', path: '/normal/nginx/nginx' },
      ],
      "/normal/algorithm": [
        { title: '数据结构', path: '/normal/algorithm/dataStructure' },
        { title: '经典排序', path: '/normal/algorithm/sort' },
        { title: '算法思想', path: '/normal/algorithm/algorithm' },
      ],
      "/normal/database": [
        { title: 'mysql', path: '/normal/database/mysqlBase' },
      ],
      "/normal/editTool": [
        { title: 'idea', path: '/normal/editTool/idea/idea.md' },
        { title: 'vscode', path: '/normal/editTool/vscode/vscode.md' },
        { title: 'vim', path: '/normal/editTool/vim/vim.md' },
      ],
    },
    displayAllHeaders: false,
    smoothScroll: true
  },


}