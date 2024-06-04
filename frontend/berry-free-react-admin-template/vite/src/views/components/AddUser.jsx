import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Typography, TextField, Button, Select, MenuItem, Grid } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';

const AddUser = () => {
  const initialValues = {
    email: '',
    username: '',
    password: '',
    role: 'analyst',
  };

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email format').required('Required'),
    username: Yup.string().required('Required'),
    password: Yup.string().min(8, 'Password must be at least 8 characters').required('Required'),
    role: Yup.string().required('Required'),
  });

  const onSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const response = await axios.post('http://localhost:8000/register', values);
      console.log('User created:', response.data);
      resetForm();
    } catch (error) {
      console.error('Error creating user:', error);
    }
    setSubmitting(false);
  };

  return (
    <MainCard>
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h2">Create New User</Typography>
      </Grid>
      <Grid item xs={12}>
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
          {({ isSubmitting }) => (
            <Form>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography htmlFor="email">Email</Typography>
                  <Field as={TextField} type="email" id="email" name="email" fullWidth />
                  <ErrorMessage name="email" component="div" />
                </Grid>
                <Grid item xs={12}>
                  <Typography htmlFor="username">Username</Typography>
                  <Field as={TextField} type="text" id="username" name="username" fullWidth />
                  <ErrorMessage name="username" component="div" />
                </Grid>
                <Grid item xs={12}>
                  <Typography htmlFor="password">Password</Typography>
                  <Field as={TextField} type="password" id="password" name="password" fullWidth />
                  <ErrorMessage name="password" component="div" />
                </Grid>
                <Grid item xs={12}>
                  <Typography htmlFor="role">Role</Typography>
                  <Field as={Select} id="role" name="role" defaultValue="analyst" fullWidth>
                    <MenuItem value="admin">Admin</MenuItem>
                    <MenuItem value="analyst">Analyst</MenuItem>
                    <MenuItem value="chef_de_maintenance">Chef de maintenance</MenuItem>
                  </Field>
                  <ErrorMessage name="role" component="div" />
                </Grid>
                <Grid item xs={12}>
                  <Button type="submit" disabled={isSubmitting} fullWidth>Create User</Button>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </Grid>
    </Grid>
    </MainCard>
  );
};

export default AddUser;
