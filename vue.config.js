module.exports={
    pwa: {
        workboxPluginMode: 'InjectManifest',
        workboxOptions: {
            swSrc: 'src/service-worker.js'
        },
        themeColor: '#1da025'
      },
    publicPath: process.env.NODE_ENV === 'production'
    ? '/pwa-coursework/'
    : '/'
}