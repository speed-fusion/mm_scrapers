import { Pagination, Stack, Typography } from '@mui/material'
import React from 'react'

const Listings = () => {
  return (
    <Stack alignItems={"center"}>
        <Typography marginY={2} fontWeight={500} textAlign={"center"} >Recent Listings</Typography>
        
        <Pagination page={1} count={10} shape="rounded" siblingCount={0}/>
    </Stack>
  )
}

export default Listings