import { Box, Input, Button, Alert, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import '../style/login.css';
import { useNavigate, Link } from 'react-router-dom';
import { useUserAuth } from '../context/Authcontext';
import axios from 'axios';

export const Login = () => {
  const [identifier, setEmail] = useState('');
  const [password, setPass] = useState('');
  const [error, setError] = useState('');
  const { login, googleSignin } = useUserAuth();
  const navigate = useNavigate();

  const handlesignin = async () => {
    try {
      await login(identifier, password);
      alert('Login Successfully');
      navigate('/turf');
    } catch (err) {
      setError(err.message);
    }
  };

  const signinWithgoogle = async () => {
    try {
      await googleSignin();
      navigate('/turf');
    } catch (err) {
      console.log(err);
    }
  };

  const handlePost = async () => {
    try {
      const response = await axios.post('http://localhost:1337/api/auth/local', {
        identifier,
        password,
      });
      console.log(response.data);
      navigate('/turf');

      const responseData = response.data.user.id;
      const emailId = response.data.user.email;
      localStorage.setItem('emailId', emailId.toString());
      console.log(responseData);
      localStorage.setItem('apiResponse', responseData.toString());
    } catch (error) {
      setError('Error posting data');
    }
  };

  return (
    <Box
      id="loginContainer"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      position="relative"
    >
      <Box id="loginBg" flex="1" width="100%" position="absolute">
        <img src='https://res.cloudinary.com/dx78kzenz/image/upload/v1700478255/paymentBg_gmggbi.png' alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </Box>
      <Box
        id="loginform"
        bg="white"
        p={6}
        borderRadius="md"
        boxShadow="md"
        width={{ base: '90%', md: '70%', lg: '50%' }}
        zIndex="1"
      >
        <Text id="headingLogin" textAlign="center" fontSize={{ base: 'xl', md: '2xl', lg: '3xl' }} mb={4}>
          LOGIN
        </Text>
        {error && <Alert variant="subtle" status="error">{error}</Alert>}
        <Box>
          <Text id="username" mb={2}>
            EMAIL
          </Text>
          <Input type="text" placeholder="EMAIL" onChange={(e) => setEmail(e.target.value)} border="2px solid black" />
        </Box>
        <Box>
          <Text id="password" mb={2}>
            PASSWORD
          </Text>
          <Input type="password" placeholder="PASSWORD" onChange={(e) => setPass(e.target.value)} border="2px solid black" />
        </Box>
        <Button id="loginFormBtn" onClick={handlePost} mt={4} width="100%">
          Login
        </Button>
        <Button id="loginwithBtn" onClick={signinWithgoogle} mt={2} width="100%">
          <Box id="glogo" mr={2} display="inline-block">
            <img src='https://res.cloudinary.com/dx78kzenz/image/upload/v1700478258/search_r83kdn.png' alt="" />
          </Box>
          <Text id="gtext" display="inline-block">
            Login with Google
          </Text>
        </Button>
        <Box mt={4}>
          <Text>
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </Text>
        </Box>
      </Box>
    </Box>
  );
};
