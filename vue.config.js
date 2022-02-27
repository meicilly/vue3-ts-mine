const path = require('path')

module.exports = { 
   outputDir: './build',
    devServer: {
        proxy: {
          '^/api': {
            target: 'http://localhost:8000',
            pathRewrite: {
              '^/api': ''
            },
            changeOrigin: true
          }
        },
        port:8001
      },
    configureWebpack:(config) =>{
        config.resolve.alias = {
            '@':path.resolve(__dirname,'src'),
            components: '@/components'
        }
    },
}