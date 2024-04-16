import React, { useState } from 'react'
import { Box, Typography, Button, TextField, Container } from '@mui/material'

import heartHealthy from '../assets/img/heart-healthy.jpg'
import spiceySpecials from '../assets/img/spicy-special.jpg'
import sweetTreats from '../assets/img/sweet-treats.jpg'

const Dashboard = () => {
  const [output, setOutput] = useState({ name: '', email: '' })

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    // Explicitly cast formData values to string to resolve type error
    const name = formData.get('name')
    const email = formData.get('email')
    if (typeof name === 'string' && typeof email === 'string') {
      setOutput({ name, email })
    }
  }

  return (
    <Box display="flex" flexDirection="column" alignItems="center" p={2}>
      {output.name && output.email ? (
        <Box
          sx={{
            backgroundColor: 'white',
            border: 8,
            borderColor: 'primary.main',
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
            borderRadius: 8,
            color: 'text.primary',
            p: 2,
            mt: 2,
            minHeight: '400px',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}
        >
          <Typography variant="h5" gutterBottom>
            Thank you for subscribing, {output.name}!
          </Typography>
          <Typography variant="subtitle1">
            You will now receive updates at {output.email}.
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-evenly', width: '100%', mt: 4 }}>
            <Box sx={{ textAlign: 'center', height: '200px', width: '200px' }}>
              <img src={heartHealthy} alt="Mother's Day Gifts" style={{ width: '100%', borderRadius: '8px' }} />
              <Typography variant="subtitle1" sx={{ mt: 2 }}>Heart Healthy</Typography>
              <Button variant="outlined" color="primary" sx={{ mt: 1 }}>Choose</Button>
            </Box>
            <Box sx={{ textAlign: 'center', height: '200px', width: '200px' }}>
              <img src={spiceySpecials} alt="Easter Lamb" style={{ width: '100%', borderRadius: '8px' }} />
              <Typography variant="subtitle1" sx={{ mt: 2 }}>Spicey Specials</Typography>
              <Button variant="outlined" color="primary" sx={{ mt: 1 }}>Choose</Button>
            </Box>
            <Box sx={{ textAlign: 'center', height: '200px', width: '200px' }}>
              <img src={sweetTreats} alt="Mother's Day Flowers" style={{ width: '100%', borderRadius: '8px' }} />
              <Typography variant="subtitle1" sx={{ mt: 2 }}>Sweet Treats</Typography>
              <Button variant="outlined" color="primary" sx={{ mt: 1 }}>Choose</Button>
            </Box>
          </Box>
        </Box>
      ) : (
        <Box
          component="form"
          sx={{
            backgroundColor: 'white',
            border: 8,
            borderColor: 'primary.main',
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
            borderRadius: 8,
            color: 'text.primary',
            p: 2,
            width: '100%',
            height: '400px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-around',
          }}
          onSubmit={handleSubmit}
        >
          <Typography
            variant="h4"
            gutterBottom
            sx={{
              color: 'text.primary',
              textAlign: 'center',
              fontWeight: 'bold',
            }}
          >
            Sign Up for Personalised<br/>Recipe Recommendations
          </Typography>
          <Container maxWidth="md">
            <TextField
              label="Name"
              name="name"
              variant="filled"
              required
              fullWidth
              sx={{ backgroundColor: 'white', borderRadius: 1 }}
            />
            <TextField
              label="Email Address"
              name="email"
              type="email"
              variant="filled"
              required
              fullWidth
              sx={{ backgroundColor: 'white', borderRadius: 1, my: 2 }}
            />
            <Button variant="contained" color="primary" type="submit" fullWidth>
              Submit
            </Button>
          </Container>
        </Box>
      )}
    </Box>
  )
}

export default Dashboard
