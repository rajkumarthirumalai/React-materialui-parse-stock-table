import React from 'react'
import { Link, Container, Typography, Divider, Stack, Button, Box, Card, CardHeader ,Grid} from '@mui/material';

function UserHeader() {
    const signout = () => {
        localStorage.clear();
        window.location.reload()
      };
  return (
    <div>   

<Grid container spacing={2} sx={{ background: 'linear-gradient(to right bottom, white, #96d3e5)' }}>
            <Grid item xs={8}>
              {' '}
              <Stack direction="row" alignItems="center" spacing={2} sx={{ m: 3 }}>
                <Typography variant="h4" sx={{ color: 'black' }} noWrap>
                  SharkinFin DashBoard
                </Typography>
              </Stack>
            </Grid>
            <Grid item xs={4}>
              <Stack
                direction="row-reverse"
                spacing={2}
                
              >
                <Stack direction="row" alignItems="center" spacing={2} sx={{ m: 2 }}>
                  <Box
                    component="img"
                    alt={'hello'}
                    src={localStorage.getItem('googleUserpicture')}
                    sx={{ width: 38, height: 38, borderRadius: 1.5, flexShrink: 0 }}
                  />

                  <Box sx={{ minWidth: 240, flexGrow: 1 }}>
                    <Link color="inherit" variant="subtitle2" underline="hover" noWrap>
                      {localStorage.getItem('googleUsername')}
                    </Link>

                    <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
                      {localStorage.getItem('googleUserEmail')}
                    </Typography>
                  </Box>
                  <Button
                    style={{ backgroundColor: 'lavenderblush' }}
                    size="medium"
                    color="error"
                    variant="outlined"
                    onClick={signout}
                  >
                    Logout
                  </Button>
                </Stack>
              </Stack>
            </Grid>
          </Grid>
    </div>
  )
}

export default UserHeader