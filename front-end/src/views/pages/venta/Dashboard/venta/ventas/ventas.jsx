import React, { useState } from 'react';
import { Card, CardContent, Typography, Grid, TextField, Box } from '@mui/material';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PaymentsIcon from '@mui/icons-material/Payments';
import QrCodeIcon from '@mui/icons-material/QrCode';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import BarChartIcon from '@mui/icons-material/BarChart';
import PeopleIcon from '@mui/icons-material/People';

const data = [
  { title: 'TOTAL VENTAS', value: '11000.00 Bs.', icon: <AttachMoneyIcon fontSize="large" />, color: '#ffe0b2' },
  { title: 'EFECTIVO', value: '1100.00 Bs.', icon: <PaymentsIcon fontSize="large" />, color: '#ffe0b2' },
  { title: 'QR', value: '1100.00 Bs.', icon: <QrCodeIcon fontSize="large" />, color: '#ffe0b2' },
  { title: 'TARJETA', value: '1000.00 Bs.', icon: <CreditCardIcon fontSize="large" />, color: '#ffe0b2' },
  { title: 'TRANSFERENCIA', value: '1000.00 Bs.', icon: <AccountBalanceIcon fontSize="large" />, color: '#ffe0b2' },
];

const largeCards = [
  { title: 'Resumen General', value: 'Detalle A', icon: <TrendingUpIcon fontSize="large" />, color: '#fff3e0' },
  { title: 'Ventas por Categoría', value: 'Detalle B', icon: <BarChartIcon fontSize="large" />, color: '#fff3e0' },
  { title: 'Clientes Frecuentes', value: 'Detalle C', icon: <PeopleIcon fontSize="large" />, color: '#fff3e0' },
];

const Ventas = () => {
  const today = new Date().toISOString().slice(0, 16);
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(today);

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  return (
    <Box p={2}>
      <Box mb={3} display="flex" gap={2}>
        <TextField
          label="Desde"
          type="datetime-local"
          value={startDate}
          onChange={handleStartDateChange}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="Hasta"
          type="datetime-local"
          value={endDate}
          onChange={handleEndDateChange}
          InputLabelProps={{ shrink: true }}
        />
      </Box>

      <Grid container spacing={2}>
        {data.map((item, index) => (
          <Grid item key={index}>
            <Card sx={{ 
              backgroundColor: item.color, 
              borderRadius: 3, 
              boxShadow: 3, 
              width: 243, 
              height: 150,
              display: 'flex', 
              flexDirection: 'column', 
              justifyContent: 'center', 
              alignItems: 'center' 
            }}>
              <CardContent sx={{ textAlign: 'center', paddingBottom: '16px !important' }}>
                {item.icon}
                <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                  {item.title}
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  {item.value}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3} mt={4}>
        {largeCards.map((item, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Card sx={{ 
              backgroundColor: item.color, 
              borderRadius: 3, 
              boxShadow: 4,
              width: 410,
              height: 400, 
              display: 'flex', 
              flexDirection: 'column', 
              justifyContent: 'center', 
              alignItems: 'center'
            }}>
              <CardContent sx={{ textAlign: 'center' }}>
                <Box mb={2}>{item.icon}</Box>
                <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                  {item.title}
                </Typography>
                <Typography variant="body1" sx={{ mt: 2 }}>
                  {item.value}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Ventas;
