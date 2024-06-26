import React from 'react'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'

const GlobalLoading: React.FC<React.PropsWithChildren<{
  title?: string,
}>> = ({
  title = 'loading...',
  children,
}) => {
  return (
    <Box
      component="div"
      sx={{
        position: 'fixed',
        left: '0px',
        top: '0px',
        zIndex: 10000,
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.7)'
      }}
    >
      <Box
        component="div"
        sx={{
          padding: 6,
          // backgroundColor: '#ffffff',
          // border: '1px solid #e5e5e5',
        }}
      >
        <Box
          component="div"
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
          }}
        >
          <Box
            component="div"
            sx={{
              maxWidth: '100%'
            }}
          >
            <Box
              component="div"
              sx={{
                textAlign: 'center',
                display: 'inline-block',
              }}
            >
              <CircularProgress />
              <Typography variant='subtitle1'>
                { title }
              </Typography>
            </Box>
          </Box>
          { children }
        </Box>
      </Box>
    </Box>
  )
}

export default GlobalLoading
