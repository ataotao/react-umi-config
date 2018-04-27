export default {
  // exportStatic: true, //静态化
  // plugins: ['umi-plugin-dva'],
  plugins: [
    'umi-plugin-dva',
    ['umi-plugin-routes', {
      exclude: [/models/, /services/, /components/]
    }]
  ],
  disableServiceWorker: true,
  hashHistory: true
}
