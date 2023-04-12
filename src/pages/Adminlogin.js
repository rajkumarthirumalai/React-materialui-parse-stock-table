import { Helmet } from 'react-helmet-async';
// @mui
import { styled } from '@mui/material/styles';
import {
  Link,
  Container,
  Typography,
  Divider,
  Stack,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Checkbox,
  FormControl,
} from '@mui/material';
// hooks
import useResponsive from '../hooks/useResponsive';
// components
import Logo from '../components/logo';
import Iconify from '../components/iconify';
// sections
import { LoginForm } from '../sections/auth/login';
import { useNavigate } from 'react-router-dom';
// @mui
import { LoadingButton } from '@mui/lab';
import { useState } from 'react';
import ExtensionData from './AdminDisplay';
import Header from 'src/layouts/dashboard/header';

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const StyledSection = styled('div')(({ theme }) => ({
  width: '100%',
  maxWidth: 480,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  boxShadow: theme.customShadows.card,
  backgroundColor: theme.palette.background.default,
}));

const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function LoginPage() {
  const mdUp = useResponsive('up', 'md');
  const [adminIsSignedIn, setAdminIsSignedIn] = useState(localStorage.getItem('admin'));
  const [data, setData] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    console.log('triggered');
    console.log(data);
    localStorage.setItem('admin',data)
    setAdminIsSignedIn(data)
    navigate('/admin', { replace: true });
  };

  const updateData = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      {adminIsSignedIn ? (
        <>
          <Helmet>
            <title> Admin | Minimal UI </title>
          </Helmet>
          {/* <ExtensionData/> */}
        </>
      ) : (
        <>
          <Helmet>
            <title> Admin | Minimal UI </title>
          </Helmet>
          <Container maxWidth="sm">
            <StyledContent>
              <Typography variant="h3" gutterBottom>
                Admin Sign in
              </Typography>
              <>
                {' '}
                <Stack spacing={3}>
                  <TextField name="email" label="Email address" onChange={updateData} />

                  <TextField
                    name="password"
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                            <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    onChange={updateData}
                  />
                  <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleClick}>
                    Login
                  </LoadingButton>
                </Stack>
              </>
            </StyledContent>
          </Container>
        </>
      )}
    </>
  );
}
