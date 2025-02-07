import Image from 'next/image';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const Home = () => {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', flexDirection: 'column' }}>
      <Box
        component="main"
        sx={{
          display: 'flex',
          flexGrow: 1,
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 2,
        }}
      >
        <Typography variant="h1" sx={{ fontSize: '6rem' }}>
          Btown
        </Typography>
        <Image src="/btownkids.svg" alt="btownkids logo" width={250} height={300} priority />
        <Typography variant="h1" sx={{ fontSize: '6rem' }}>
          Kids
        </Typography>
      </Box>
      <Box
        component="footer"
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 1.5,
          bgcolor: 'gray.800',
          p: 2,
        }}
      ></Box>
    </Box>
  );
};

export default Home;
