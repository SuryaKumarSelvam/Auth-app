import React,{useState} from 'react'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import axios from 'axios';


export const RegistrationPage = () => {

  const [firstname,setFirstName] = useState('');
  const [lastname,setLastName] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [terms,setTerms] = useState(false);
  const [formErrors, setFormErrors] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    terms: '',
  });

  const handleRegistration = (event)=>{
      event.preventDefault();
      const errors = {};
      if(firstname ===''){
        errors.firstname = 'First Name is Required'
      }
      if(lastname ===''){
        errors.lastname = 'Last Name is Required'
      }
      if(email ===''){
        errors.email = 'Email is Required'
      }else if(!isValidEmail(email)){
          errors.email = 'Invalid email address';
      }
      if(password ===''){
        errors.password = 'Email is Required'
      }else if(password.length < 6){
          errors.password = 'Password must be at least 6 characters long'
      }
      if(terms === false){
        errors.terms = 'You must accept the terms and conditions'
      }
      
      if(Object.keys(errors).length > 0){
        console.log(errors)
        setFormErrors(errors);
      }else{
          axios.post('http://127.0.0.1:8000/api//registerUser',{
              firstname:firstname,
              lastname:lastname,
              email:email,
              password:password,
              terms:terms
      }
      )
      .then((response)=>{
        console.log(response.data)
      })
      .catch((error)=>{
        console.log(error)
      })
      }
      
  }
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
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  return (
     <>
    <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleRegistration} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  onChange={(e)=>setFirstName(e.target.value)}
                />
                 {formErrors.firstname && <span style={{ color:'red' }}>{formErrors.firstname}</span>}
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  onChange={(e)=>setLastName(e.target.value)}
                />
                 {formErrors.lastname && <span style={{ color:'red' }}>{formErrors.lastname}</span>}
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={(e)=>setEmail(e.target.value)}
                />
                 {formErrors.email && <span style={{ color:'red' }}>{formErrors.email}</span>}
              </Grid>
             
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={(e)=>setPassword(e.target.value)}
                />
                 {formErrors.password && <span style={{ color:'red' }}>{formErrors.password}</span>}
              </Grid>
             
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="Accept the terms and condition"
                  value={terms}
                  onClick={()=>setTerms(true)}
                />
              </Grid>
              {formErrors.terms && <span style={{ color:'red',marginLeft:'18px'}}>{formErrors.terms}</span>}
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
     </>
  )
}
