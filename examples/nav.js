import config from '../bin/route.json';
const nav = config.components.map(item => {
  const comp = require('../packages/' + item.name + '/example.vue').default;
  return {
    path: '/' + item.name,
    component: comp,
    meta: {
      title: item.title
    }
  };
});
export default nav;
