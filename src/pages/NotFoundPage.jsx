import { Box, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <Box sx={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 2 }}>
      <Typography variant="h3" sx={{ fontWeight: 800 }}>404</Typography>
      <Typography variant="h6">This page could not be found.</Typography>
      <Button component={Link} to="/" variant="contained">Return home</Button>
    </Box>
  );
}
