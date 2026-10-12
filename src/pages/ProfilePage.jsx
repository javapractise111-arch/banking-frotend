import { Box, Card, CardContent, TextField, Button, Grid, Alert } from '@mui/material';
import { Formik } from 'formik';
import * as Yup from 'yup';
import SectionHeader from '../components/SectionHeader';

const validationSchema = Yup.object({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  email: Yup.string().email('Enter a valid email').required('Email is required')
});

export default function ProfilePage() {
  return (
    <Box>
      <SectionHeader title="Profile settings" subtitle="Update your contact details and security preferences" />

      <Card>
        <CardContent sx={{ p: 3 }}>
          <Formik
            initialValues={{ firstName: 'Alice', lastName: 'Morgan', email: 'alice@example.com', phone: '+1 555 0100' }}
            validationSchema={validationSchema}
            onSubmit={(values) => alert('Profile saved successfully')}
          >
            {({ values, touched, errors, handleChange, handleBlur, handleSubmit }) => (
              <Box component="form" onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <TextField fullWidth label="First name" name="firstName" value={values.firstName} onChange={handleChange} onBlur={handleBlur} error={Boolean(touched.firstName && errors.firstName)} helperText={touched.firstName && errors.firstName} />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField fullWidth label="Last name" name="lastName" value={values.lastName} onChange={handleChange} onBlur={handleBlur} error={Boolean(touched.lastName && errors.lastName)} helperText={touched.lastName && errors.lastName} />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField fullWidth label="Email" name="email" value={values.email} onChange={handleChange} onBlur={handleBlur} error={Boolean(touched.email && errors.email)} helperText={touched.email && errors.email} />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField fullWidth label="Phone" name="phone" value={values.phone} onChange={handleChange} onBlur={handleBlur} />
                  </Grid>
                </Grid>

                <Alert severity="info" sx={{ mt: 3 }}>
                  For security, confirmation may be required for changes involving email or authentication settings.
                </Alert>

                <Button type="submit" variant="contained" sx={{ mt: 3 }}>
                  Save profile
                </Button>
              </Box>
            )}
          </Formik>
        </CardContent>
      </Card>
    </Box>
  );
}
