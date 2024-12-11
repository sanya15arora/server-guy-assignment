import React, { useEffect, useState } from 'react'
import { Avatar, Button, Container, Paper, TextField, Typography, Box, Alert, InputAdornment, IconButton } from '@mui/material'
import { LockOutlined, Visibility, VisibilityOff } from '@mui/icons-material'
import { styled } from "@mui/material/styles";
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../store/UserSlice';
import Home from './Home';


const CustomAvatar = styled(Avatar)(({ theme }) => ({
    mx: "auto",
    mb: 1,
    justifySelf: 'center',
    background: theme.palette.primary.main
}))

const Login = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showHome, setShowHome] = useState(false);
    const dispatch = useDispatch();
    const { loading, error } = useSelector((state) => state.user)
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => {
        setShowPassword(prev => !prev);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let userCredentials = { username, password }
        dispatch(loginUser(userCredentials)).then((result) => {
            if (result.payload) {
                setUsername('');
                setPassword('');
                setShowHome(true);
            }
        })
    }

    useEffect(() => {
        if (localStorage.getItem("user") !== null)
            setShowHome(true)
    }, [])

    if (localStorage.getItem("user") !== null || showHome)
        return <Home />
    else
        return (
            <Container maxWidth='xs'>
                <Paper elevation={10} sx={{ mt: 8, p: 2 }}>
                    <CustomAvatar >
                        <LockOutlined />
                    </CustomAvatar>
                    <Typography component='h1' variant='h5'>
                        Login
                    </Typography>
                    <Box component='form' onSubmit={handleSubmit} sx={{ mt: 2 }}>
                        <TextField placeholder='Enter username here...'
                            fullWidth
                            required
                            autoFocus
                            sx={{ mb: 2 }}
                            value={username}
                            onChange={(e) => setUsername(e.target.value)} />
                        <TextField placeholder='Enter password here...'
                            fullWidth
                            required
                            autoFocus
                            type={showPassword ? 'text' : 'password'}
                            sx={{ mb: 2 }}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            slotProps={{
                                input: {
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={handleClickShowPassword}
                                            >
                                                {showPassword ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>)
                                }
                            }}
                        />
                        <Button type='submit'
                            variant='contained'
                            fullWidth
                            sx={{ mt: 1 }}
                            disabled={loading}> {loading ? "Loading" : "Login"}
                        </Button>
                        {error && <Alert sx={{ mt: 1 }} severity="error">{error}</Alert>}
                    </Box>
                </Paper>

            </Container>
        )
}

export default Login