import React, { ReactNode } from 'react'
import { Box, Container, AppBar, Toolbar } from '@mui/material'

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <AppBar
          position="static"
          sx={{
            backgroundColor: 'primary.main',
            width: { xs: '100%', sm: '80%' }, // Responsive width: 100% on extra small screens, 80% on small and above
            borderRadius: 8,
            color: 'primary.contrastText',
            m: 2,
          }}
        >
          <Toolbar
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              flexDirection: 'row',
              alignItems: 'center',
              width: '100%',
            }}
          >
            <img src="https://www.johnlewispartnership.media/assets/johnlewispartnership__site/images/waitrose167821.png" alt="Navigation Logo" style={{ height: '20px', filter: 'brightness(0) invert(1)' }} />
          </Toolbar>
        </AppBar>
      </Box>
      <Container maxWidth="lg" sx={{ mt: 3 }}>
        {children}
      </Container>
    </Box>
  )
}

export default Layout
