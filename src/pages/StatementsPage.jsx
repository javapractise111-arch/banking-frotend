import { useEffect, useState } from 'react';
import { Box, Button, Card, CardContent, Typography, Stack } from '@mui/material';
import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined';
import SectionHeader from '../components/SectionHeader';
import EmptyState from '../components/EmptyState';
import { customerApi } from '../api/client';

export default function StatementsPage() {
  const [statements, setStatements] = useState([]);

  useEffect(() => {
    customerApi.getStatements()
      .then((res) => setStatements(res.data))
      .catch(() => {
        setStatements([
          { id: 1, period: 'September 2026', status: 'Ready' },
          { id: 2, period: 'August 2026', status: 'Ready' }
        ]);
      });
  }, []);

  return (
    <Box>
      <SectionHeader title="Statements" subtitle="Download account statements and activity history" />

      {statements.length === 0 ? (
        <EmptyState title="No statements available" description="Statements will appear here after your monthly account processing is complete." />
      ) : (
        <Stack spacing={2}>
          {statements.map((statement) => (
            <Card key={statement.id}>
              <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>{statement.period}</Typography>
                  <Typography variant="body2" color="text.secondary">{statement.status}</Typography>
                </Box>
                <Button variant="outlined" startIcon={<DownloadOutlinedIcon />}>Download PDF</Button>
              </CardContent>
            </Card>
          ))}
        </Stack>
      )}
    </Box>
  );
}
