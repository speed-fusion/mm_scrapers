import { Button, Stack, TextField } from '@mui/material'
import React from 'react'
import AddUrl from '../../../components/auto_trader/add_url'
import Listings from '../../../components/auto_trader/listings'


const AutoTrader = () => {
  return (
    <Stack>
        <AddUrl/>
        <Listings/>
    </Stack>
  )
}

export default AutoTrader