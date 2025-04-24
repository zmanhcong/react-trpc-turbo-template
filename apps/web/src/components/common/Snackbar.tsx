import React from 'react';
import { Snackbar, IconButton, SnackbarCloseReason } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

type Props = {
    open: boolean;
    message: string;
    onClose: () => void;
};

export default function CustomSnacker({ open, message, onClose }: Props) {
const handleClose = (reason?: SnackbarCloseReason) => {
if (reason === 'clickaway') return;
onClose();
};

return (
        <Snackbar
            open={open}
            autoHideDuration={6000}
            onClose={(_, reason) => handleClose(reason)} 
            message={message}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            action={
            <IconButton size="small" aria-label="close" color="inherit" onClick={() => onClose()}>
                <CloseIcon fontSize="small" />
            </IconButton>
            }
        />
    );
}