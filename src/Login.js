import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import sso from './sso.jpg'
function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignInSide() {
  const [data,setData]= React.useState({
    id:""
  });
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const jsonData ={
      users: data.get('users'),
      password: data.get('password'),
     
  }
  async function postJSON(jsonData){
    try{
      const response = await fetch("http://localhost:3333/login", {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jsonData),
      });

      const result = await response.json();
      console.log("Success:", result);
      if(result.status==='ok'){
        localStorage.setItem('token',result.token)
        localStorage.setItem('id',result.admin)
       // console.log(result)
       setData(result.admin)
       window.location='/dashboard'
        //alert('login ok')
      }else {
        //window.location='/login'
        console.log(result)
        alert('login fail')
      }
    }catch (errr){

    }
  }
  postJSON(jsonData);
  };

  return (
   
      
      <Grid container component="main" sx={{ height: '100vh',backgroundColor: (theme) =>
                      theme.palette.mode === 'light'
                        ? theme.palette.grey[700]
                        : theme.palette.grey[700], }}>
        <CssBaseline />
      
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              
            }}
          >
           
            <img src={sso} width="100" height="100"/>
           
            <Typography component="h5" variant="button">
              ระบบรับเรื่องร้องเรียน
            </Typography>
            <Typography component="h6" variant="caption">
              สำนักงานประกันสังคม
            </Typography>
            
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="users"
                label="user"
                name="users"
                autoComplete="users"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://scontent.fbkk28-1.fna.fbcdn.net/v/t1.15752-9/373357468_320278623863470_6670975841632662273_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=ae9488&_nc_eui2=AeHT-WE0iMnfdMgBHkt4k3uHp231LZhzG-KnbfUtmHMb4mmyyKuzWU14ITFKtgt728iSyIW9LZXq0X2rOAMHKI3j&_nc_ohc=BvxcRo-ZGqsAX8Tf4_g&_nc_ht=scontent.fbkk28-1.fna&oh=03_AdSgw-37asq2kHzb2ontXDAunbRhTZWXDngV7NnaoVLjzw&oe=6520F4F9)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      </Grid>
      
    
  );
}