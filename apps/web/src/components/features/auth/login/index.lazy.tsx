import { createLazyRoute } from '@tanstack/react-router';
import { Box, Button, Container, IconButton, Snackbar, SnackbarCloseReason, TextField, Typography } from '@mui/material';
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import React from 'react';
import CustomSnacker from '@/components/common/Snackbar';
import { trpc } from '@/TrpcWrapper';

// Define Zod schema
const authSchema = z.object({
  email: z.string().min(1, "Email is required"),
  password: z.string().min(1, "Password is required"),
});

// Infer TypeScript type from Zod schema
type Auth = z.infer<typeof authSchema>;

export default function LoginComponent() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Auth>({
    resolver: zodResolver(authSchema),
  });

  const [openSnackbar, setOpenSnackbar] = React.useState(false)
  const [errorMessage, setErrorMessage] = React.useState('')

  const {mutate} = trpc.auth.loginLogout.login.useMutation({
    onSuccess(data) {
      console.log('Login success:', data);
    },
    onError(error) {
      console.error('Login error:', error);
      setErrorMessage(error.message)
      setOpenSnackbar(true)
    },
  });


  const onSubmit: SubmitHandler<Auth> = async (data) => {
    console.log(data);
    mutate(data)
  }


  return (
      <Container
        maxWidth="md"
          component="form"
          sx={{ p: 3 }}
          onSubmit={handleSubmit(onSubmit)}
          autoComplete="off"
      >      
      <Box sx={{ width: '100%' }}>
        <TextField
          {...register("email")}
          variant="outlined"
          label="User name"
          sx={{ width: '100%' }}
          autoComplete="new-username"
          error={!!errors.email}
          helperText={errors.email?.message}
        />
      </Box>
      <Box sx={{ mt: 2 }}>
        <TextField
          {...register("password")}
          type="password"
          autoComplete="new-password"
          variant="outlined"
          label="Password"
          sx={{ width: '100%' }}
          error={!!errors.password}
          helperText={errors.password?.message}
        />
      </Box>
      <Box sx={{ mt: 2 }}>
        <Button variant="contained" type="submit">Login</Button>
      </Box>
      <CustomSnacker open={openSnackbar} message={errorMessage} onClose={() => setOpenSnackbar(false)} />
    </Container>
  );
}

export const Route = createLazyRoute('/users')({
  component: LoginComponent,
});
