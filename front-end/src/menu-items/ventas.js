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
      id: 'menu',
      title: 'Menú',
      type: 'item',
      url: '/menu',
      icon: icons.IconShoppingCart,
      breadcrumbs: false
    },
    {
      id: 'cajas',
      title: 'Caja',
      type: 'item',
      url: '/cajas',
      icon: icons.IconTypography,
      breadcrumbs: false
    },
    {
      id: 'gastos',
      title: 'Gastos',
      type: 'item',
      url: '/gastos',
      icon: icons.IconPalette,
      breadcrumbs: false
    },
    {
      id: 'pedidos',
      title: 'Pedidos',
      type: 'item',
      url: '/pedidos',
      icon: icons.IconShadow,
      breadcrumbs: false
    },   
  ]
};

export default GestionVentas;
