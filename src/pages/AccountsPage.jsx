import { useEffect, useState } from 'react';
import { Grid, Card, CardContent, Typography, Box, Chip } from '@mui/material';
import SectionHeader from '../components/SectionHeader';
import LoadingSkeleton from '../components/LoadingSkeleton';
import { customerApi } from '../api/client';
import { formatCurrency } from '../utils/formatters';

export default function AccountsPage() {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    customerApi.getAccounts()
      .then((res) => setAccounts(res.data))
      .catch(() => {
        setAccounts([
          { id: 'CHK-1001', label: 'Primary Checking', balance: 24580.24, currency: 'USD', status: 'Active' },
          { id: 'SAV-1002', label: 'Savings Reserve', balance: 15420.15, currency: 'USD', status: 'Active' },
          { id: 'INV-2003', label: 'Investment Account', balance: 25800.0, currency: 'USD', status: 'Active' }
        ]);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <LoadingSkeleton />;

  return (
    <Box>
      <SectionHeader title="Accounts" subtitle="View balances, account details, and account statuses" />

      <Grid container spacing={3}>
        {accounts.map((account) => (
          <Grid item xs={12} md={6} lg={4} key={account.id}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="subtitle2" color="text.secondary">{account.label}</Typography>
                  <Chip label={account.status || 'Active'} color="success" size="small" />
                </Box>
                <Typography variant="caption" color="text.secondary">{account.id}</Typography>
                <Typography variant="h4" sx={{ mt: 2, fontWeight: 700 }}>{formatCurrency(account.balance, account.currency || 'USD')}</Typography>
                <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="caption" color="text.secondary">Currency</Typography>
                  <Typography variant="caption" sx={{ fontWeight: 600 }}>{account.currency || 'USD'}</Typography>
                </Box>
                <Box sx={{ mt: 1, display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="caption" color="text.secondary">Type</Typography>
                  <Typography variant="caption" sx={{ fontWeight: 600 }}>Personal</Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
