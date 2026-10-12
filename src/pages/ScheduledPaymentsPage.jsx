import { useEffect, useState } from 'react';
import { Box, Card, CardContent, Typography, Chip, Stack } from '@mui/material';
import SectionHeader from '../components/SectionHeader';
import EmptyState from '../components/EmptyState';
import { customerApi } from '../api/client';

export default function ScheduledPaymentsPage() {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    customerApi.getScheduledPayments()
      .then((res) => setPayments(res.data))
      .catch(() => {
        setPayments([
          { id: 1, name: 'Rent Payment', amount: 1800, dueDate: '2026-10-28', status: 'Scheduled' },
          { id: 2, name: 'Insurance Premium', amount: 210, dueDate: '2026-10-31', status: 'Pending' }
        ]);
      });
  }, []);

  return (
    <Box>
      <SectionHeader title="Scheduled payments" subtitle="Upcoming recurring payments and due dates" actionLabel="Schedule payment" />

      {payments.length === 0 ? (
        <EmptyState title="No scheduled payments" description="Create recurring payments and keep your bills and obligations on time." actionLabel="Create one" />
      ) : (
        <Stack spacing={2}>
          {payments.map((payment) => (
            <Card key={payment.id}>
              <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>{payment.name}</Typography>
                  <Typography variant="body2" color="text.secondary">Due: {payment.dueDate}</Typography>
                </Box>
                <Box sx={{ textAlign: 'right' }}>
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>${payment.amount}</Typography>
                  <Chip label={payment.status} size="small" color={payment.status === 'Scheduled' ? 'primary' : 'warning'} />
                </Box>
              </CardContent>
            </Card>
          ))}
        </Stack>
      )}
    </Box>
  );
}
