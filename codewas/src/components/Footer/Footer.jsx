import React from 'react';
import './Footer.css';
import { Container, Typography } from '@mui/material';

const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <Typography variant="body2" color="textSecondary" align="center">
          © 2023 My React App
        </Typography>
      </Container>
    </footer>
  );
};

export default Footer;
