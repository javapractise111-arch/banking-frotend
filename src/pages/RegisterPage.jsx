import { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
  Alert
} from '@mui/material';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useNavigate, Link } from 'react-router-dom';
import { authApi } from '../api/client';

const validationSchema = Yup.object({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  email: Yup.string().email('Enter a valid email').required('Email is required'),
  password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
  phone: Yup.string().required('Phone number is required')
});

export default function RegisterPage() {
  const [serverError, setServerError] = useState('');
  const navigate = useNavigate();

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f5f7fb', px: 2 }}>
      <Card sx={{ maxWidth: 700, width: '100%', borderRadius: 4 }}>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
            Open a new account
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Complete the registration form to begin managing your finances securely.
          </Typography>

          <Formik
            initialValues={{ firstName: '', lastName: '', email: '', phone: '', password: '' }}
            validationSchema={validationSchema}
            onSubmit={async (values, { setSubmitting }) => {
              try {
                setServerError('');
                await authApi.register(values);
                navigate('/login');
              } catch (err) {
                setServerError(err?.response?.data?.message || 'Registration failed.');
              } finally {
                setSubmitting(false);
              }
            }}
          >
            {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
              <Box component="form" onSubmit={handleSubmit}>
                {serverError && <Alert severity="error" sx={{ mb: 2 }}>{serverError}</Alert>}

                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField fullWidth label="First name" name="firstName" value={values.firstName} onChange={handleChange} onBlur={handleBlur} error={Boolean(touched.firstName && errors.firstName)} helperText={touched.firstName && errors.firstName} />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField fullWidth label="Last name" name="lastName" value={values.lastName} onChange={handleChange} onBlur={handleBlur} error={Boolean(touched.lastName && errors.lastName)} helperText={touched.lastName && errors.lastName} />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField fullWidth label="Email" name="email" value={values.email} onChange={handleChange} onBlur={handleBlur} error={Boolean(touched.email && errors.email)} helperText={touched.email && errors.email} />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField fullWidth label="Phone" name="phone" value={values.phone} onChange={handleChange} onBlur={handleBlur} error={Boolean(touched.phone && errors.phone)} helperText={touched.phone && errors.phone} />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField fullWidth label="Password" type="password" name="password" value={values.password} onChange={handleChange} onBlur={handleBlur} error={Boolean(touched.password && errors.password)} helperText={touched.password && errors.password} />
                  </Grid>
                </Grid>

                <Button type="submit" variant="contained" size="large" fullWidth disabled={isSubmitting} sx={{ mt: 3, py: 1.5 }}>
                  {isSubmitting ? 'Creating account...' : 'Create account'}
                </Button>

                <Typography variant="body2" sx={{ mt: 2, textAlign: 'center' }}>
                  Already have an account? <Link to="/login">Sign in</Link>
                </Typography>
              </Box>
            )}
          </Formik>
        </CardContent>
      </Card>
    </Box>
  );
}
