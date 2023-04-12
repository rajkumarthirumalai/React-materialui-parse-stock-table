import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
// @mui
import { styled } from '@mui/material/styles';
import { Link, Container, Typography, Divider, Stack, Button, Box, Card, CardHeader, Grid } from '@mui/material';
import { GoogleLogin } from '@react-oauth/google';
// hooks
import { LoginSocialGoogle } from 'reactjs-social-login';
import useResponsive from '../hooks/useResponsive';
// components
import Logo from '../components/logo';
import Iconify from '../components/iconify';
import scrollbar from 'src/components/scrollbar';
// sections
import { LoginForm } from '../sections/auth/login';
import ProductsPage from './ProductsPage';
import UserPage from './UserPage';
import { AppNewsUpdate } from 'src/sections/@dashboard/app';
import Scrollbar from 'src/components/scrollbar/Scrollbar';
import ExtensionData from './AdminDisplay';
import UserHeader from 'src/layouts/dashboard/header/UserHeader';

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
  backgroundColor: 'beige',
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
  const [isSignedIn, setIsSignedIn] = useState(localStorage.getItem('googleUsername'));
  const signin = (provider, data) => {
    console.log(data);
    localStorage.setItem('googleUsername', data.name);
    localStorage.setItem('googleUserEmail', data.email);
    localStorage.setItem('googleUserpicture', data.picture);

    setIsSignedIn(true);
  };

  console.log(localStorage.getItem('googleUsername'));
  console.log(localStorage.getItem('googleUserEmail'));
  console.log(localStorage.getItem('googleUserpicture'));
  return (
    <>
      {isSignedIn ? (
        <>
          <Grid>
            <UserHeader />
            <Card sx={{ m: 2, boxShadow: 5 }}>
              <CardHeader title={'Users List'} subheader={'Click the dropdown icon to view the details'} />
              <Scrollbar></Scrollbar>
              <ExtensionData />
            </Card>
          </Grid>
        </>
      ) : (
        <>
          {' '}
          <Helmet>
            <title> Login </title>
          </Helmet>
          <StyledRoot style={{ background: 'linear-gradient(to right bottom, white, #1e99c3)' }}>
            <Logo
              sx={{
                position: 'fixed',
                top: { xs: 16, sm: 24, md: 40 },
                left: { xs: 16, sm: 24, md: 40 },
              }}
            />

            {mdUp && (
              <StyledSection>
                <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
                  Hi, Welcome Back SharkFin{' '}
                  {localStorage.getItem('googleUsername') ? localStorage.getItem('googleUsername') : 'user'}
                </Typography>
                <img src="/assets/illustrations/illustration_login.png" alt="login" />
              </StyledSection>
            )}

            <Container maxWidth="sm">
              <StyledContent>
                {localStorage.getItem('googleUsername') ? (
                  <Typography variant="h3" gutterBottom>
                    Sign out from account
                  </Typography>
                ) : (
                  <>
                    <Typography variant="h3" gutterBottom>
                      Sign in to SharkFin
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 5 }}>
                      Don’t have an account? {''}
                      {/* <Link variant="subtitle2">Get started</Link> */}
                    </Typography>
                  </>
                )}

                {localStorage.getItem('googleUsername') ? (
                  <Stack direction="row" spacing={2}>
                    <Button
                      style={{ backgroundColor: 'lavenderblush' }}
                      fullWidth
                      size="large"
                      color="error"
                      variant="outlined"
                    >
                      Logout
                    </Button>
                  </Stack>
                ) : (
                  <LoginSocialGoogle
                    client_id="324102956848-7h40tsrqaqvb3dh2okhrfndsmms5d13e.apps.googleusercontent.com"
                    discoveryDocs="claim_supported"
                    access_type="offline"
                    onResolve={({ provider, data }) => {
                      signin(provider, data);
                    }}
                    onReject={({ error }) => {
                      console.log(error);
                    }}
                  >
                    <Stack direction="row" spacing={2}>
                      <Button
                        style={{ backgroundColor: 'lavenderblush' }}
                        fullWidth
                        size="large"
                        color="info"
                        variant="outlined"
                      >
                        <Iconify icon="eva:google-fill" color="#DF3E30" width={22} height={22} />
                      </Button>
                    </Stack>
                  </LoginSocialGoogle>
                )}
              </StyledContent>
            </Container>
          </StyledRoot>
        </>
      )}
    </>
  );
}
