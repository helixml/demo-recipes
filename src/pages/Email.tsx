import React from 'react'
import { Box, Typography, Link, Card, CardMedia } from '@mui/material'

const Email = () => {
  return (
    <Box sx={{ maxWidth: 600, m: 'auto', bgcolor: '#FAFAFA', p: 2 }}>
      {/* Email header section */}
      <Box sx={{ bgcolor: '#FFFFFF', p: 2 , borderBottom: '1px solid #E0E0E0'}}>
        <Typography variant="subtitle2">To: bob@bob.com</Typography>
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
        {[
          {
            "name": "Crispy baked tofu burgers with cheese & spicy salsa",
            "summary": "A delightful vegetarian burger option featuring crispy baked tofu, cheese, and a spicy salsa for a flavorful kick.",
            "image": "https://d1v30bmd12dhid.cloudfront.net/static/version9/content/dam/waitrose/recipes/images/c/Crispy-baked-tofu-burgers--with-cheese-&-spicy-salsa.jpg/_jcr_content/renditions/cq5dam.thumbnail.200.200.png"
          },
          {
            "name": "Dhruv Baker's chicken fajitas with pineapple salsa and guacamole",
            "summary": "Savor the taste of chipotle-spiced chicken fajitas accompanied by a fresh pineapple salsa and homemade guacamole for a spicy and fruity combination.",
            "image": "https://d1v30bmd12dhid.cloudfront.net/static/version9/content/dam/waitrose/recipes/images/d/WaitroseKitchenMar15_EasterWeekend11995_Fajita_2048x2048.jpg/_jcr_content/renditions/cq5dam.thumbnail.200.200.png"
          }
        ].map((recipe, index) => (
          <Box key={index} sx={{ flex: { xs: '1 1 100%', sm: '1 1 30%' }, mb: 2, p: 1, bgcolor: '#FFFFFF', border: 'none', marginX: '1%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <img
              alt={recipe.name}
              src={recipe.image}
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

export default Email
