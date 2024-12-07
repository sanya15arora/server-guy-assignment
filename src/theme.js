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
    },
    components: {
        MuiTextField: {
            defaultProps: {
                variant: 'outlined',
            },
        },
    },
    spacing: 8,
    shape: {
        borderRadius: 4,
    },
});

export default theme;