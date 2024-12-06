import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#ff742b',
        },
        secondary: {
            main: '#121212',
            light: '#ffffff'
        },
        error: {
            main: '#d32f2f',
        },
        background: {
            default: '#f4f4f4',
            paper: '#ffffff',
        },
    },
    typography: {
        fontFamily: 'Verdana, Geneva, sans-serif',
        h1: {
            fontSize: '2.5rem',
            fontWeight: 500,
        },
        body1: {
            fontSize: '1rem',
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none', // Prevent automatic uppercase
                    borderRadius: '8px',
                },
            },
        },
        MuiTextField: {
            defaultProps: {
                variant: 'outlined',
            },
        },
    },
    spacing: 8, // Base spacing unit
    shape: {
        borderRadius: 4,
    },
});

export default theme;