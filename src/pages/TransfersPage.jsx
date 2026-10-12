import { useState } from 'react';
import { Box, Card, CardContent, TextField, Button, Typography, MenuItem, Alert, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { customerApi } from '../api/client';
import SectionHeader from '../components/SectionHeader';

const validationSchema = Yup.object({
  fromAccountId: Yup.string().required('Select a source account'),
  toAccountId: Yup.string().required('Select a destination account'),
  amount: Yup.number().positive('Amount must be greater than zero').required('Amount is required'),
  description: Yup.string().max(120, 'Description is too long')
});

export default function TransfersPage() {
  const [status, setStatus] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);

  return (
    <Box>
      <SectionHeader title="Transfers" subtitle="Move funds between your accounts securely" />

      <Card>
        <CardContent sx={{ p: 3 }}>
          <Formik
            initialValues={{ fromAccountId: 'CHK-1001', toAccountId: 'SAV-1002', amount: '', description: '' }}
            validationSchema={validationSchema}
            onSubmit={async (values, { setSubmitting, resetForm }) => {
              setSubmitting(true);
              try {
                await customerApi.createTransfer({ ...values, idempotencyKey: crypto.randomUUID() });
                setStatus({ type: 'success', message: 'Transfer submitted successfully.' });
                resetForm();
              } catch (err) {
                setStatus({ type: 'error', message: err?.response?.data?.message || 'Transfer failed. Please review the details.' });
              } finally {
                setSubmitting(false);
              }
            }}
          >
            {({ values, touched, errors, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
              <Box component="form" onSubmit={handleSubmit}>
                {status && <Alert severity={status.type} sx={{ mb: 2 }}>{status.message}</Alert>}

                <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' } }}>
                  <TextField select label="From account" name="fromAccountId" value={values.fromAccountId} onChange={handleChange} onBlur={handleBlur} error={Boolean(touched.fromAccountId && errors.fromAccountId)} helperText={touched.fromAccountId && errors.fromAccountId}>
                    <MenuItem value="CHK-1001">Primary Checking</MenuItem>
                    <MenuItem value="SAV-1002">Savings Reserve</MenuItem>
                  </TextField>

                  <TextField select label="To account" name="toAccountId" value={values.toAccountId} onChange={handleChange} onBlur={handleBlur} error={Boolean(touched.toAccountId && errors.toAccountId)} helperText={touched.toAccountId && errors.toAccountId}>
                    <MenuItem value="CHK-1001">Primary Checking</MenuItem>
                    <MenuItem value="SAV-1002">Savings Reserve</MenuItem>
                  </TextField>

                  <TextField label="Amount" name="amount" type="number" value={values.amount} onChange={handleChange} onBlur={handleBlur} error={Boolean(touched.amount && errors.amount)} helperText={touched.amount && errors.amount} />

                  <TextField label="Reference" name="description" value={values.description} onChange={handleChange} onBlur={handleBlur} error={Boolean(touched.description && errors.description)} helperText={touched.description && errors.description} />
                </Box>

                <Button type="button" variant="contained" sx={{ mt: 3 }} onClick={() => setConfirmOpen(true)}>
                  Review transfer
                </Button>

                <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
                  <DialogTitle>Confirm transfer</DialogTitle>
                  <DialogContent>
                    <Typography variant="body1">Transfer {values.amount || '0.00'} USD from {values.fromAccountId} to {values.toAccountId}</Typography>
                    {values.description && <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>Reference: {values.description}</Typography>}
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={() => setConfirmOpen(false)}>Cancel</Button>
                    <Button variant="contained" onClick={() => { setConfirmOpen(false); handleSubmit(); }}>Confirm</Button>
                  </DialogActions>
                </Dialog>
              </Box>
            )}
          </Formik>
        </CardContent>
      </Card>
    </Box>
  );
}
