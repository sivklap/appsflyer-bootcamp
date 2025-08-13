import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Paper,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
} from '@mui/material';
import { School, Work } from '@mui/icons-material';

const SignupForm = () => {
  const navigate = useNavigate();

  const handleRoleSelection = (role) => {
    // Redirect directly to the appropriate registration form
    if (role === 'mentor') {
      navigate('/register/mentor');
    } else {
      navigate('/register/mentee');
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: 2,
      }}
    >
      <Paper
        elevation={8}
        sx={{
          padding: 4,
          width: '100%',
          maxWidth: 800,
          borderRadius: 2,
        }}
      >
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Join QueenB Mentorship Program!
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
            Choose your role to get started
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Are you looking to learn or to teach?
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {/* Mentee Card */}
          <Grid item xs={12} md={6}>
            <Card 
              sx={{ 
                height: '100%',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 4,
                }
              }}
              onClick={() => handleRoleSelection('mentee')}
            >
              <CardContent sx={{ textAlign: 'center', py: 4 }}>
                <School sx={{ fontSize: 80, color: '#667eea', mb: 3 }} />
                <Typography variant="h5" component="h2" gutterBottom>
                  I'm a Mentee
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                  I want to learn and grow with guidance from experienced professionals
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Perfect for students, junior developers, and anyone looking to advance their skills
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: 'center', pb: 3 }}>
                <Button
                  variant="contained"
                  size="large"
                  sx={{ px: 4, py: 1.5 }}
                >
                  Join as Mentee
                </Button>
              </CardActions>
            </Card>
          </Grid>

          {/* Mentor Card */}
          <Grid item xs={12} md={6}>
            <Card 
              sx={{ 
                height: '100%',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 4,
                }
              }}
              onClick={() => handleRoleSelection('mentor')}
            >
              <CardContent sx={{ textAlign: 'center', py: 4 }}>
                <Work sx={{ fontSize: 80, color: '#667eea', mb: 3 }} />
                <Typography variant="h5" component="h2" gutterBottom>
                  I'm a Mentor
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                  I want to share my knowledge and help others grow in their careers
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Perfect for senior developers, team leads, and experienced professionals
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: 'center', pb: 3 }}>
                <Button
                  variant="contained"
                  size="large"
                  sx={{ px: 4, py: 1.5 }}
                >
                  Join as Mentor
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>

        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Typography variant="body2" color="text.secondary">
            Already have an account?{' '}
            <a href="/login" style={{ textDecoration: 'none', color: '#667eea' }}>
              Sign in
            </a>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default SignupForm;
