import { Container } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import Footer from './footer'
import Navbar from './navbar'
import Head from 'next/head'
import { useRouter } from 'next/router'

const Layout = ({children}) => {

  return (
    <Box>
      <Head>
      <title>Dashboard - motor.market</title>
      <meta name="robots" content="noindex" />
      </Head>
      <Navbar/>
      <Container maxWidth="xl">{children}</Container>
      <Footer/>
    </Box>
  )
}

export default Layout