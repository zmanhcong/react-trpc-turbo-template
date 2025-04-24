import { trpc } from '@/TrpcWrapper';
import React from 'react';

export default function LogoutButton() {
    const logoutMutation = trpc.auth.loginLogout.logout.useMutation({
        onSuccess: () => {
        console.log('Logged out successfully');
        },
    });

    const handleLogout = () => {
        logoutMutation.mutate();
    };

    return (
        <button onClick={handleLogout} >
            Logout
        </button>
    );
}
