import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { motion } from "framer-motion";
import { TextField, Button, Paper, Typography, Box, Container, Grid, Radio, RadioGroup, FormControlLabel, Checkbox, LinearProgress } from '@mui/material';
import { styled } from '@mui/material/styles';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

const schema = yup.object().shape({
  name: yup.string().required("Ім'я є обов'язковим"),
  email: yup.string().email("Невірний email").required("Email є обов'язковим"),
  age: yup.date().required("Дата народження є обов'язковою"),
  phone: yup.string().matches(/^[0-9]+$/, "Введіть коректний номер телефону").required("Телефон є обов'язковим"),
  password: yup.string().min(6, "Пароль має бути не менше 6 символів").required("Пароль є обов'язковим"),
  confirmPassword: yup.string().oneOf([yup.ref('password'), null], "Паролі мають збігатися").required("Підтвердження пароля є обов'язковим"),
  gender: yup.string().required("Стать є обов'язковою"),
  terms: yup.boolean().oneOf([true], "Необхідно прийняти умови використання"),
});

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  borderRadius: theme.spacing(2),
}));

export default function FullPageForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    setValue,
  } = useForm({ resolver: yupResolver(schema) });

  const [progress, setProgress] = useState(0);

  const password = watch("password");
  const confirmPassword = watch("confirmPassword");

  const onSubmit = (data) => {
    console.log("Форма відправлена:", data);
    alert("Форма відправлена:\n" + JSON.stringify(data, null, 2));
  };

  const handleProgress = (event) => {
    setProgress((event.target.value.length / event.target.maxLength) * 100);
  };

  const decodeJwt = (token) => {  // decoding google answ
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  };

  return (
    <GoogleOAuthProvider clientId="575158303603-6kl9h2mdc063v1jd4fduils3cu9uqo7n.apps.googleusercontent.com">
      <Container component="main" maxWidth="md">
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <StyledPaper>
              <Typography component="h1" variant="h5" color="text.primary" gutterBottom>
                Реєстрація
              </Typography>
              <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <Typography variant="subtitle1">Особисті дані</Typography>
                    <Grid container spacing={1} alignItems="center">
                      <Grid item xs>
                        <TextField
                          fullWidth
                          {...register("name")}
                          error={!!errors.name}
                          helperText={errors.name?.message}
                        />
                      </Grid>
                      <Grid item>
                        <Typography variant="body1">Ім'я</Typography>
                      </Grid>
                    </Grid>
                    <Grid container spacing={1} alignItems="center">
                      <Grid item xs>
                        <TextField
                          fullWidth
                          type="date"
                          InputLabelProps={{ shrink: true }}
                          {...register("age")}
                          error={!!errors.age}
                          helperText={errors.age?.message}
                        />
                      </Grid>
                      <Grid item>
                        <Typography variant="body1">Дата народження</Typography>
                      </Grid>
                    </Grid>
                    <RadioGroup row {...register("gender")} error={errors.gender ? "Стать є обов'язковою" : undefined}>
                      <FormControlLabel value="male" control={<Radio />} label="Чоловіча" />
                      <FormControlLabel value="female" control={<Radio />} label="Жіноча" />
                    </RadioGroup>
                    {errors.gender && <Typography color="error">{errors.gender.message}</Typography>}
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="subtitle1">Контактні дані</Typography>
                    <Grid container spacing={1} alignItems="center">
                      <Grid item xs>
                        <TextField
                          fullWidth
                          {...register("email")}
                          error={!!errors.email}
                          helperText={errors.email?.message}
                        />
                      </Grid>
                      <Grid item>
                        <Typography variant="body1">Email</Typography>
                      </Grid>
                    </Grid>
                    <Grid container spacing={1} alignItems="center">
                      <Grid item xs>
                        <TextField
                          fullWidth
                          {...register("phone")}
                          error={!!errors.phone}
                          helperText={errors.phone?.message}
                        />
                      </Grid>
                      <Grid item>
                        <Typography variant="body1">Телефон</Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="subtitle1">Обліковий запис</Typography>
                    <Grid container spacing={1} alignItems="center">
                      <Grid item xs>
                        <TextField
                          fullWidth
                          type="password"
                          {...register("password")}
                          error={!!errors.password}
                          helperText={errors.password?.message}
                        />
                      </Grid>
                      <Grid item>
                        <Typography variant="body1">Пароль</Typography>
                      </Grid>
                    </Grid>
                    <Grid container spacing={1} alignItems="center">
                      <Grid item xs>
                        <TextField
                          fullWidth
                          type="password"
                          {...register("confirmPassword")}
                          error={!!errors.confirmPassword}
                          helperText={errors.confirmPassword?.message}
                        />
                      </Grid>
                      <Grid item>
                        <Typography variant="body1">Підтвердження пароля</Typography>
                      </Grid>
                    </Grid>
                    <FormControlLabel
                      control={<Checkbox {...register("terms")} />}
                      label="Я приймаю умови використання"
                      error={errors.terms ? "Необхідно прийняти умови використання" : undefined}
                    />
                    {errors.terms && <Typography color="error">{errors.terms.message}</Typography>}
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                      sx={{ mt: 3, mb: 2 }}
                      disabled={isSubmitting}
                    >
                      Відправити
                    </Button>
                    <GoogleLogin
                      onSuccess={credentialResponse => {
                        const decoded = decodeJwt(credentialResponse.credential);
                        console.log(decoded);
                        setValue("name", decoded.name);
                        setValue("email", decoded.email);
                        // alert(`Ім'я: ${decoded.name}\nEmail: ${decoded.email}`);
                      }}
                      onError={() => {
                        console.log('Login Failed');
                        alert("Google login failed");
                      }}
                      fullWidth
                      variant="outlined"
                      color="primary"
                      sx={{ mb: 2 }}
                    />
                    {isSubmitting && <LinearProgress />}
                  </Grid>
                </Grid>
              </form>
            </StyledPaper>
          </motion.div>
        </Box>
      </Container>
    </GoogleOAuthProvider>
  );
}