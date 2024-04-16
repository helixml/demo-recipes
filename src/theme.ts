import { createTheme } from '@mui/material/styles'

// Define a custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#0E893E',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: '#ff1744',
    },
    background: {
      default: '#f5f5f5',
    },
  },
})

export default theme
