import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useState, useCallback } from 'react';

export function useErrorHandler() {
    const [message, setMessage] = useState<string | null>(null);
    const [open, setOpen] = useState(false);
    const [severity, setSeverity] = useState<'success' | 'error'>('success');

    const showError = useCallback((msg: string) => {
        setMessage(msg);
        setSeverity('error');
        setOpen(true);
    }, []);

    const showSuccess = useCallback((msg: string) => {
        setMessage(msg);
        setSeverity('success');
        setOpen(true);
    }, []);

    // Component to render the Snackbar
    const SnackbarAlert = () => (
        <Snackbar
            open={open}
            autoHideDuration={4000}
            onClose={() => setOpen(false)}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
            <Alert onClose={() => setOpen(false)} severity={severity} sx={{ width: '100%' }}>
                {message}
            </Alert>
        </Snackbar>
    );

    return { showError, showSuccess, SnackbarAlert };
}
