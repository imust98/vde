import config from '../gen/route.json';
const nav = config.components.map(item => {
  return {
    path: '/' + item.name,
    name: item.name,
    component: resolve =>
      require(['../packages/' + item.path.readme + 'readme.md'], resolve),
    meta: {
      title: item.title
    }
  };
});
export default nav;
