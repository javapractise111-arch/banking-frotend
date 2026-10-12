import { Card, CardContent, Typography, Box } from '@mui/material';

export default function DashboardCard({ title, value, subtitle, accent }) {
  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="body2" color="text.secondary">{title}</Typography>
          <Box sx={{ width: 10, height: 10, borderRadius: '50%', background: accent || '#0b3d91' }} />
        </Box>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>{value}</Typography>
        <Typography variant="caption" color="text.secondary">{subtitle}</Typography>
      </CardContent>
    </Card>
  );
}
