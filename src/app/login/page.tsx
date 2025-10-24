'use client';
import Box from '@mui/material/Box';
import Login from '../../components/login/Login';

function Home() {
  return (
    <Box sx={{ width: '100%', justifyContent: 'center', height: '100vh' }}>
      <Login />
    </Box>
  );
}
export default Home;
