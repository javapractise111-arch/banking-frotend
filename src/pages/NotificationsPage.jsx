import { useEffect, useState } from 'react';
import { Box, Card, CardContent, Typography, Stack, Chip } from '@mui/material';
import SectionHeader from '../components/SectionHeader';
import { customerApi } from '../api/client';

export default function NotificationsPage() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    customerApi.getNotifications()
      .then((res) => setItems(res.data))
      .catch(() => {
        setItems([
          { id: 1, title: 'Transfer completed', detail: 'A transfer of $500.00 was completed successfully.', read: false },
          { id: 2, title: 'Statement ready', detail: 'Your September statement is available for download.', read: true }
        ]);
      });
  }, []);

  return (
    <Box>
      <SectionHeader title="Notifications" subtitle="Recent account activity and updates" />

      <Stack spacing={2}>
        {items.map((item) => (
          <Card key={item.id}>
            <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 2 }}>
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>{item.title}</Typography>
                <Typography variant="body2" color="text.secondary">{item.detail}</Typography>
              </Box>
              <Chip label={item.read ? 'Read' : 'New'} color={item.read ? 'default' : 'primary'} />
            </CardContent>
          </Card>
        ))}
      </Stack>
    </Box>
  );
}
