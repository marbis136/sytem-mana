// src/componentes/Dashboard/navItems.js
import HomeIcon from '@mui/icons-material/Home';
import StorefrontIcon from '@mui/icons-material/Storefront';      // Para "Menu"
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';    // Para "Ventas"
import MoneyOffIcon from '@mui/icons-material/MoneyOff';          // Para "Gastos"
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet'; // Para "Caja"
import InventoryIcon from '@mui/icons-material/Inventory2';       // Para "Inventario"
import AssignmentIcon from '@mui/icons-material/Assignment'; // Para "Pedidos"

const navItems = [
  { icon: <HomeIcon />, path: '/home', label: 'Inicio' },
  {
    icon: <PointOfSaleIcon />, label: 'Ventas ', children: [
      { path: '/menu', label: 'Menu', icon: <StorefrontIcon /> },
      { path: '/pedidos', label: 'Pedidos', icon: <AssignmentIcon /> },
      { path: '/ventas', label: 'Ventas', icon: <PointOfSaleIcon /> },
      { path: '/gastos', label: 'Gastos', icon: <MoneyOffIcon /> },
      { path: '/caja', label: 'Caja', icon: <AccountBalanceWalletIcon /> },
    ]
  },
  { icon: <InventoryIcon />, path: '/inventario', label: 'Inventario' },
];

export default navItems;

