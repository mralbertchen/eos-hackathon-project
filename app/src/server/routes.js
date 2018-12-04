import UrlPrettifier from 'next-url-prettifier';

const routes = [
  {
    page: 'index',
    prettyUrl: '/'
  },
];

export default routes;

export const Router = new UrlPrettifier(routes);
