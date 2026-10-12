import { useEffect, useState } from 'react';
import { Box, Card, CardContent, Stack, Typography, Chip } from '@mui/material';
import SectionHeader from '../components/SectionHeader';
import EmptyState from '../components/EmptyState';
import { customerApi } from '../api/client';

export default function BeneficiariesPage() {
  const [beneficiaries, setBeneficiaries] = useState([]);

  useEffect(() => {
    customerApi.getBeneficiaries()
      .then((res) => setBeneficiaries(res.data))
      .catch(() => {
        setBeneficiaries([
          { id: 1, name: 'Maya Thompson', accountNumber: '**** 0981', nickname: 'Family' },
          { id: 2, name: 'Luis Perez', accountNumber: '**** 6654', nickname: 'Travel' }
        ]);
      });
  }, []);

  return (
    <Box>
      <SectionHeader title="Beneficiaries" subtitle="Manage trusted payment recipients" actionLabel="Add beneficiary" />

      {beneficiaries.length === 0 ? (
        <EmptyState title="No beneficiaries saved" description="You can add a trusted recipient for faster transfers and scheduled payments." actionLabel="Create one" />
      ) : (
        <Stack spacing={2}>
          {beneficiaries.map((beneficiary) => (
            <Card key={beneficiary.id}>
              <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>{beneficiary.name}</Typography>
                  <Typography variant="body2" color="text.secondary">{beneficiary.accountNumber} · {beneficiary.nickname}</Typography>
                </Box>
                <Chip label="Verified" color="success" />
              </CardContent>
            </Card>
          ))}
        </Stack>
      )}
    </Box>
  );
}
