import React, { useState } from 'react'
import { Box, Typography, Button, TextField, Container, Alert, Card, CardMedia, Link } from '@mui/material'
import AppClient from './client'
import Loading from '../components/Loading'

import heartHealthy from '../assets/img/heart-healthy.jpg'
import spiceySpecials from '../assets/img/spicy-special.jpg'
import sweetTreats from '../assets/img/sweet-treats.jpg'

const appClient = AppClient({
  token: 'abc',
})

const Dashboard = () => {

  const [loading, setLoading] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [welcomeMessage, setWelcomeMessage] = useState('')
  const [welcomeMessageError, setWelcomeMessageError] = useState('')
  const [recipes, setRecipes] = useState<any[]>([])
  const [recipesError, setRecipesError] = useState('')

  const [output, setOutput] = useState({ name: '', email: '' })

  const handleSubmitEmailSignup = () => {
    if(!email) {
      alert('please enter an email')
      return
    }
    if (typeof name === 'string' && typeof email === 'string') {
      setOutput({ name, email })
    }
  }

  const handleGetWelcomeMessage = async () => {
    if(!name) {
      alert('please enter a name')
      return
    }
    setLoading(true)
    setWelcomeMessageError('')
    setWelcomeMessage('')

    const result = await appClient.runScript({
      file_path: '/gptscripts/welcome.gpt',
      input: name,
    })

    if(result.error) {
      setWelcomeMessageError(result.error)
    }

    if(result.output) {
      setWelcomeMessage(result.output)
    }
    setLoading(false)
  }

  // --user_id 'bob@bob.com' --number '2' --recipe_theme 'Heart Healthy'
  const handleSuggestRecipes = async (recipeTheme: string) => {
    setLoading(true)
    setRecipes([])
    setRecipesError('')

    const result = await appClient.runScript({
      file_path: '/gptscripts/waitrose.gpt',
      input: `--user_id '${email}' --number '2' --recipe_theme '${recipeTheme}'`,
    })

    if(result.error) {
      setRecipesError(result.error)
    }

    if(result.output) {
      let output = result.output.replace('```json', '').replace('```', '')
      console.log('--------------------------------------------')
      console.log('recipe raw data')
      console.log(output)
      const data = JSON.parse(output)
      setRecipes(data.map((row: any) => {
        return {
          name: row['name'] || row['recipe.name'],
          summary: row['summary'] || row['recipe.summary'],
          imageurl: row['imageurl'] || row['imageURL'] || row['recipe.imageurl'] || row['recipe.imageURL'],
        }
      }))
      console.log('--------------------------------------------')
      console.dir(data)
    }

    setLoading(false)
  }

  if(recipesError || recipes.length > 0) {
    return (
      <Box sx={{ maxWidth: 600, m: 'auto', bgcolor: '#FAFAFA', p: 2 }}>
        {
          recipesError && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {recipesError}
            </Alert>
          )
        }
        {/* Email header section */}
        <Box sx={{ bgcolor: '#FFFFFF', p: 2 , borderBottom: '1px solid #E0E0E0'}}>
          <Typography variant="subtitle2">To: { email }</Typography>
          <Typography variant="subtitle2">From: Waitrose Recommendations</Typography>
          <Typography variant="subtitle2">Subject: Your Weekly Personalised Recommendations</Typography>
        </Box>
        <Card sx={{ bgcolor: '#FFFFFF', mb: 2 }}>
          <CardMedia
            component="img"
            image="https://mcusercontent.com/f0d508b51ea79aef704faf435/images/232f3be1-0c01-b34a-345a-2f3cb9107203.jpg"
          />
        </Card>
        <Typography align="center" variant="h6" sx={{ mb: 2 }}>
          Your Weekly Personalised Recommendations.
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
          {recipes.map((recipe, index) => (
            <Box key={index} sx={{ flex: { xs: '1 1 100%', sm: '1 1 30%' }, mb: 2, p: 1, bgcolor: '#FFFFFF', border: 'none', marginX: '1%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <img
                alt={recipe.name}
                src={recipe.imageurl}
                style={{ 
                  margin: '8px',
                  display: 'block',
                  maxWidth: '100%'
                }}
              />
              <Box sx={{ m: 1 }}>
                <Typography variant="h6">{recipe.name}</Typography>
                <Typography>{recipe.summary}</Typography>
                <Link href={recipe.image} underline="none">Learn more</Link>
              </Box>
            </Box>
          ))}
        </Box>
        <Box sx={{ bgcolor: '#FFFFFF', p: 2, textAlign: 'center', fontSize: '12px', color: '#53565a' }}>
          <Typography variant="subtitle2">
            Copyright © John Lewis Partnership 2024. All rights reserved.
          </Typography>
          <Link href="http://www.waitrose.com/" underline="none">Visit waitrose.com</Link>
        </Box>
      </Box>
    )
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
              <Button variant="outlined" color="primary" sx={{ mt: 1 }} onClick={() => handleSuggestRecipes('Heart Healthy')}>Choose</Button>
            </Box>
            <Box sx={{ textAlign: 'center', height: '200px', width: '200px' }}>
              <img src={spiceySpecials} alt="Easter Lamb" style={{ width: '100%', borderRadius: '8px' }} />
              <Typography variant="subtitle1" sx={{ mt: 2 }}>Spicey Specials</Typography>
              <Button variant="outlined" color="primary" sx={{ mt: 1 }} onClick={() => handleSuggestRecipes('Spicey Specials')}>Choose</Button>
            </Box>
            <Box sx={{ textAlign: 'center', height: '200px', width: '200px' }}>
              <img src={sweetTreats} alt="Mother's Day Flowers" style={{ width: '100%', borderRadius: '8px' }} />
              <Typography variant="subtitle1" sx={{ mt: 2 }}>Sweet Treats</Typography>
              <Button variant="outlined" color="primary" sx={{ mt: 1 }} onClick={() => handleSuggestRecipes('Sweet Treats')}>Choose</Button>
            </Box>
          </Box>
        </Box>
      ) : (
        <>
          <Box
            sx={{
              backgroundColor: 'white',
              border: 8,
              borderColor: 'primary.main',
              boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
              borderRadius: 8,
              color: 'text.primary',
              p: 4,
              mb: 4,
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-around',
            }}
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
              Say Hello!
            </Typography>
            <Container maxWidth="md">
              {
                !welcomeMessage && (
                  <>
                    <TextField
                      label="Your Name"
                      name="name"
                      variant="filled"
                      helperText="Enter your name and we will greet you nicely..."
                      required
                      fullWidth
                      sx={{ backgroundColor: 'white', borderRadius: 1, my: 2 }}
                      value={ name }
                      onChange={ (e) => setName(e.target.value) }
                    />
                    <Button variant="contained" color="primary" fullWidth onClick={ handleGetWelcomeMessage }>
                      Test
                    </Button>
                  </>
                )
              }
              {
                welcomeMessage && (
                  <Alert severity="success" sx={{ mt: 2 }}>
                    {welcomeMessage}
                  </Alert>
                )
              }
              {
                welcomeMessageError && (
                  <Alert severity="error" sx={{ mt: 2 }}>
                    {welcomeMessageError}
                  </Alert>
                )
              }
            </Container>
          </Box>
          {
            welcomeMessage && (
              <Box
                sx={{
                  backgroundColor: 'white',
                  border: 8,
                  borderColor: 'primary.main',
                  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                  borderRadius: 8,
                  color: 'text.primary',
                  p: 4,
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-around',
                }}
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
                    label="Your Name"
                    name="name"
                    variant="filled"
                    helperText="Enter your name and we will greet you nicely..."
                    required
                    fullWidth
                    sx={{ backgroundColor: 'white', borderRadius: 1, my: 2 }}
                    value={ name }
                    disabled
                  />
                  <TextField
                    label="Email Address"
                    name="email"
                    type="email"
                    variant="filled"
                    required
                    fullWidth
                    sx={{ backgroundColor: 'white', borderRadius: 1, my: 2 }}
                    value={ email }
                    onChange={ (e) => setEmail(e.target.value) }
                  />
                  <Button variant="contained" color="primary" fullWidth onClick={ handleSubmitEmailSignup }>
                    Submit
                  </Button>
                </Container>
              </Box>
            )
          }
        </>
      )}
      {
        loading && (
          <Loading />
        )
      }
    </Box>
  )
}

export default Dashboard
