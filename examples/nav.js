import config from '../gen/route.json';
const nav = config.components.map(item => {
  const comp = require('../packages/' + item.path.example + 'example.vue').default;
  return {
    path: '/' + item.name,
    component: comp,
    meta: {
      title: item.title
    }
  };
});
export default nav;
