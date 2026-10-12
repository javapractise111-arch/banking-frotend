import { useEffect, useState } from 'react';
import { Box, Card, CardContent, Grid, Typography, Chip, Table, TableBody, TableCell, TableHead, TableRow, Avatar, Stack } from '@mui/material';
import { AccountBalanceWalletRounded, ArrowDownwardRounded, ArrowUpwardRounded } from '@mui/icons-material';
import DashboardCard from '../components/DashboardCard';
import LoadingSkeleton from '../components/LoadingSkeleton';
import SectionHeader from '../components/SectionHeader';
import { customerApi } from '../api/client';
import { formatCurrency } from '../utils/formatters';

const sampleTransactions = [
  { id: 1, type: 'Transfer', amount: -350, name: 'A. Johnson', status: 'Completed', date: '2026-10-12' },
  { id: 2, type: 'Salary', amount: 4200, name: 'Company Payroll', status: 'Completed', date: '2026-10-11' },
  { id: 3, type: 'Card Payment', amount: -94.5, name: 'Corner Market', status: 'Pending', date: '2026-10-10' }
];

export default function DashboardPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await customerApi.getDashboard();
        setData(res.data);
      } catch {
        setData({
          accounts: [
            { id: 'CHK-1001', balance: 24580.24, label: 'Primary Checking', currency: 'USD' },
            { id: 'SAV-1002', balance: 15420.15, label: 'Savings', currency: 'USD' }
          ],
          summary: { totalBalance: 40000.39, monthlyIncome: 6400, monthlyExpenses: 2140 },
          transactions: sampleTransactions
        });
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) return <LoadingSkeleton />;

  return (
    <Box>
      <SectionHeader title="Overview" subtitle="Your financial snapshot at a glance" />

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <DashboardCard title="Available balance" value={formatCurrency(data?.summary?.totalBalance || 0, 'USD')} subtitle="Across all accounts" accent="#0b3d91" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <DashboardCard title="Income" value={formatCurrency(data?.summary?.monthlyIncome || 0, 'USD')} subtitle="This month" accent="#2e9e64" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <DashboardCard title="Expenses" value={formatCurrency(data?.summary?.monthlyExpenses || 0, 'USD')} subtitle="This month" accent="#d98c0f" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <DashboardCard title="Accounts" value={(data?.accounts || []).length} subtitle="Active accounts" accent="#15b2a6" />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} lg={7}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>Accounts</Typography>
              <Stack spacing={2}>
                {(data?.accounts || []).map((account) => (
                  <Box key={account.id} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2, borderRadius: 2, background: '#f7fafe' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar sx={{ bgcolor: 'primary.main' }}><AccountBalanceWalletRounded /></Avatar>
                      <Box>
                        <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>{account.label}</Typography>
                        <Typography variant="caption" color="text.secondary">{account.id}</Typography>
                      </Box>
                    </Box>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>{formatCurrency(account.balance, account.currency || 'USD')}</Typography>
                  </Box>
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} lg={5}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>Spending trends</Typography>
              <Box sx={{ display: 'flex', gap: 1, height: 160, alignItems: 'end' }}>
                {[45, 65, 52, 80, 74, 88, 69].map((height, i) => (
                  <Box key={i} sx={{ flex: 1, borderRadius: 2, background: i % 2 === 0 ? '#0b3d91' : '#7ba9ff', height: `${height}%` }} />
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box sx={{ mt: 4 }}>
        <SectionHeader title="Recent activity" subtitle="Latest transactions and transfers" />
        <Card>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Transaction</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="right">Amount</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(data?.transactions || sampleTransactions).map((txn) => (
                <TableRow key={txn.id}>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Avatar sx={{ width: 30, height: 30, bgcolor: txn.amount > 0 ? '#eafaf4' : '#fff2eb' }}>
                        {txn.amount > 0 ? <ArrowDownwardRounded sx={{ color: '#2e9e64', fontSize: 16 }} /> : <ArrowUpwardRounded sx={{ color: '#d98c0f', fontSize: 16 }} />}
                      </Avatar>
                      <Box>
                        <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>{txn.name}</Typography>
                        <Typography variant="caption" color="text.secondary">{txn.date}</Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>{txn.type}</TableCell>
                  <TableCell>
                    <Chip label={txn.status} size="small" color={txn.status === 'Completed' ? 'success' : 'warning'} />
                  </TableCell>
                  <TableCell align="right">
                    <Typography sx={{ fontWeight: 700, color: txn.amount > 0 ? 'success.main' : 'text.primary' }}>
                      {txn.amount > 0 ? '+' : '-'}{formatCurrency(Math.abs(txn.amount), 'USD')}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </Box>
    </Box>
  );
}
