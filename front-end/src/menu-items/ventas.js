// ventas
import { IconTypography, IconPalette, IconShadow, IconWindmill, IconShoppingCart } from '@tabler/icons-react';

// constant
const icons = {
  IconTypography,
  IconPalette,
  IconShadow,
  IconWindmill,
  IconShoppingCart
};

// ==============================|| UTILITIES MENU ITEMS ||============================== //

const GestionVentas = {
  id: 'GestionVentas',
  title: 'Gestion de Ventas',
  type: 'group',
  children: [
    {
      id: 'ventas',
      title: 'Gestión de Ventas',
      type: 'item',
      url: '/ventas',
      icon: icons.IconShoppingCart, // puedes cambiarlo por otro
      breadcrumbs: false
    },
    {
      id: 'caja',
      title: 'Caja',
      type: 'item',
      url: '/page/caja',
      icon: icons.IconTypography,
      breadcrumbs: false
    },
    {
      id: 'util-color',
      title: 'Color',
      type: 'item',
      url: '/color',
      icon: icons.IconPalette,
      breadcrumbs: false
    },
    {
      id: 'util-shadow',
      title: 'Shadow',
      type: 'item',
      url: '/shadow',
      icon: icons.IconShadow,
      breadcrumbs: false
    },
    {
      id: 'ventas',
      title: 'Gestión de Ventas',
      type: 'item',
      url: '/ventas',
      icon: icons.IconShoppingCart, // puedes cambiarlo por otro
      breadcrumbs: false
    },
  ]
};

export default GestionVentas;
