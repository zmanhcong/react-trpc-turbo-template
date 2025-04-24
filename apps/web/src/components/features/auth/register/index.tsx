import { Box, Button, Container, TextField, Typography } from '@mui/material';
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { trpc } from '@/TrpcWrapper';
import React from 'react';
import { TRPCClientError } from '@trpc/client';
import CustomSnacker from '@/components/common/Snackbar';

const registerSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    name: z.string().optional(),
});

type Auth = z.infer<typeof registerSchema>;

export default function RegisterComponent() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Auth>({
        resolver: zodResolver(registerSchema),
    });

    const [openSnackbar, setOpenSnackbar] = React.useState(false)
    const [errorMessage, setErrorMessage] = React.useState('')
    console.log("⛳️ log ~ LoginComponent log ~ errorMessage: ", errorMessage)

    const registerMutation = trpc.auth.register.useMutation();

    const onSubmit: SubmitHandler<Auth> = async (data) => {
        console.log(data);
        // mutate(data)
        try{
        const response = await registerMutation.mutateAsync(data);
        console.log("⛳️ log ~ LoginComponent log ~ response: ", response)
        }catch(error){
        if(error instanceof TRPCClientError){
            console.log("⛳️ log ~ constonSubmit:SubmitHandler<Auth>= log ~ error: ", error.message)
            setErrorMessage(error.message)
            setOpenSnackbar(true);
        }
        }
    }


    return (
        <Container
            maxWidth="md"
            component="form"
            sx={{ p: 3 }}
            onSubmit={handleSubmit(onSubmit)}
            autoComplete="off"
        >
        <Box sx={{ width: '100%', mt:4 }}>
            <TextField
            {...register("email")}
            variant="outlined"
            label="Email"
            sx={{ width: '100%' }}
            autoComplete="new-username"
            error={!!errors.email}
            helperText={errors.email?.message}
            />
        </Box>
        <Box sx={{ width: '100%', mt:2 }}>
            <TextField
            {...register("name")}
            variant="outlined"
            label="User name"
            sx={{ width: '100%' }}
            autoComplete="new-username"
            error={!!errors.name}
            helperText={errors.name?.message}
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
            <Button variant="contained" type="submit">Register</Button>
        </Box>
        <CustomSnacker open={openSnackbar} message={errorMessage} onClose={() => setOpenSnackbar(false)} />
        </Container>
    );
}
