import { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  TextField,
  Typography,
  Alert,
  InputAdornment
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import { useNavigate, Link } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../context/AuthContext';
import { authApi } from '../api/client';

const validationSchema = Yup.object({
  email: Yup.string().email('Enter a valid email').required('Email is required'),
  password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required')
});

export default function LoginPage() {
  const [serverError, setServerError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #0b3d91 0%, #0f5bd7 40%, #123f8f 100%)', px: 2 }}>
      <Grid container spacing={3} maxWidth={1100} sx={{ mx: 'auto' }}>
        <Grid item xs={12} md={6} sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ color: '#fff', p: { xs: 2, md: 4 } }}>
            <Typography variant="h3" sx={{ fontWeight: 800, mb: 2 }}>
              Banking designed for confidence.
            </Typography>
            <Typography variant="h6" sx={{ opacity: 0.88, maxWidth: 520 }}>
              Manage money securely, monitor balances, and move funds with a premium customer experience.
            </Typography>
            <Box sx={{ mt: 4, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <Box sx={{ px: 2, py: 1, borderRadius: 2, background: 'rgba(255,255,255,0.12)' }}>Secure access</Box>
              <Box sx={{ px: 2, py: 1, borderRadius: 2, background: 'rgba(255,255,255,0.12)' }}>Smart insights</Box>
              <Box sx={{ px: 2, py: 1, borderRadius: 2, background: 'rgba(255,255,255,0.12)' }}>24/7 support</Box>
            </Box>
          </Box>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card sx={{ maxWidth: 460, width: '100%', ml: 'auto', borderRadius: 4 }}>
            <CardContent sx={{ p: 4 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
                <Box sx={{ background: '#eef3ff', borderRadius: '50%', p: 2, color: 'primary.main' }}>
                  <LockOutlinedIcon />
                </Box>
              </Box>

              <Typography variant="h4" sx={{ fontWeight: 700, textAlign: 'center', mb: 1 }}>
                Welcome back
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', mb: 3 }}>
                Sign in to manage your accounts and transfers
              </Typography>

              <Formik
                initialValues={{ email: '', password: '' }}
                validationSchema={validationSchema}
                onSubmit={async (values, { setSubmitting }) => {
                  try {
                    setServerError('');
                    const res = await authApi.login({
                      email: values.email,
                      password: values.password
                    });
                    login(res.data.user, res.data.token);
                    navigate('/');
                  } catch (err) {
                    setServerError(err?.response?.data?.message || 'Login failed. Please try again.');
                  } finally {
                    setSubmitting(false);
                  }
                }}
              >
                {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
                  <Box component="form" onSubmit={handleSubmit}>
                    {serverError && <Alert severity="error" sx={{ mb: 2 }}>{serverError}</Alert>}

                    <TextField
                      fullWidth
                      label="Email"
                      name="email"
                      type="email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={Boolean(touched.email && errors.email)}
                      helperText={touched.email && errors.email}
                      sx={{ mb: 2 }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <PersonOutlineOutlinedIcon />
                          </InputAdornment>
                        )
                      }}
                    />

                    <TextField
                      fullWidth
                      label="Password"
                      name="password"
                      type="password"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={Boolean(touched.password && errors.password)}
                      helperText={touched.password && errors.password}
                      sx={{ mb: 2 }}
                    />

                    <Button type="submit" fullWidth variant="contained" size="large" disabled={isSubmitting} sx={{ py: 1.5, mb: 2 }}>
                      {isSubmitting ? 'Signing in...' : 'Sign in'}
                    </Button>

                    <Divider sx={{ my: 2 }}>or</Divider>

                    <Button fullWidth variant="outlined" component={Link} to="/register">
                      Create an account
                    </Button>
                  </Box>
                )}
              </Formik>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
