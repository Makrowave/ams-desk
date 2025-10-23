import Box from '@mui/material/Box';
import Login from '../../components/login/Login';

const Home = () => {
  return (
    <Box
      component={'main'}
      sx={{ width: '100%', justifyContent: 'center', height: '100vh' }}
    >
      <Login />
    </Box>
  );
};
export default Home;
