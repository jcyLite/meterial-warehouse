const devServer = require('./config/vue-ssr/dev-server.js')
const server = require('express')()
const { createBundleRenderer } = require('vue-server-renderer')
// 在服务器处理函数中……
server.get('*', (req, res) => {
  const context = { url: req.url }
    res.status(200)
    devServer((serverBundle, clientBundle, template) => {
        let renderer = createBundleRenderer(serverBundle, {
            runInNewContext: false, // 推荐
            template, // （可选）页面模板
            clientManifest:clientBundle.data // （可选）客户端构建 manifest
        })

        renderer.renderToString(context,(err,html) => {
            res.send(html)
        })

    })

})

const port = process.env.PORT || 5001;
server.listen(port, () => {
    console.log(`server started at localhost:${port}`)
    console.log('启动成功')
})