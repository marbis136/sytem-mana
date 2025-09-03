// assets
import { IconBrandChrome, IconHelp } from '@tabler/icons-react';

// constant
const icons = { IconBrandChrome, IconHelp };

// ==============================|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||============================== //

const other = {
  id: 'sample-docs-roadmap',
  title: 'Recursos Humanos',
  type: 'group',
  children: [
    {
      id: 'sample-page',
      title: 'Sample Page',
      type: 'item',
      url: '/sample-page',
      icon: icons.IconBrandChrome,
      breadcrumbs: false
    },
    {
      id: 'user-page',
      title: 'Usuario',
      type: 'item',
      url: '/Usuario',
      icon: icons.IconBrandChrome,
      breadcrumbs: false
    },
    {
      id: 'sample-page',
      title: 'invenatirosss',
      type: 'collapse',
      url: '/invenatirosss',
      icon: icons.IconBrandChrome,
      breadcrumbs: false,
      children: [
        {
          id: 'inventario',
          title: 'inventario',
          type: 'item',
          url: '/inventario-page',
          breadcrumbs: false
        },
        {
          id: 'kardex',
          title: 'kardex',
          type: 'item',
          url: '/kardex-page',
          breadcrumbs: false
        }
      ]
    },
    {
      id: 'documentation',
      title: 'Documentation',
      type: 'item',
      url: 'https://codedthemes.gitbook.io/berry/',
      icon: icons.IconHelp,
      external: true,
      target: true
    }
  ]
};

export default other;
