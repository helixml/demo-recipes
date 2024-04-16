import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Layout from './pages/Layout'
import Dashboard from './pages/Dashboard'
import Email from './pages/Email'
import './App.css'
import { ThemeProvider } from '@mui/material/styles'
import theme from './theme' // Importing the custom theme

// The Layout component is imported from './pages/Layout'
// To use it, simply include it in your JSX as shown below
// You can insert your pages as children of the Layout component
// Now wrapped inside ThemeProvider to apply the custom theme
const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/email" element={<Email />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  )
}

export default App
