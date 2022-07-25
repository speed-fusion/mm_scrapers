import { Tab, Tabs } from '@mui/material'
import React from 'react'

const Home = () => {
  return (
    <div>
    <Tabs
  value={0}
  variant="scrollable"
  scrollButtons="auto"
  aria-label="scrollable auto tabs example"
    >
  <Tab label="Item One">test</Tab>
  <Tab label="Item Two" />
  <Tab label="Item Three" />
  <Tab label="Item Four" />
  <Tab label="Item Five" />
  <Tab label="Item Six" />
  <Tab label="Item Seven" />
</Tabs>
    </div>
  )
}

export default Home