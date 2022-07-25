import { Autocomplete, Avatar, Card, CardActions, CardContent, CardHeader, CardMedia, IconButton, List, ListItem, ListItemAvatar, ListItemText, Pagination, SpeedDialIcon, Stack, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'


const AllListings = () => {

  
//   const [uniqueMake,setUniqueMake] = useState();
    const make = []
  return (
    <Stack alignItems="center">
        <Stack direction={{xs:"column",lg:"row"}} marginY={2}>
            <Stack margin={1}>
                <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={make}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="Select Make" />}
                />
            </Stack>
            <Stack margin={1}>
                <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={make}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="Select Model" />}
                />
            </Stack>

            <Stack margin={1}>
                <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={make}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="Select Trim" />}
                />
            </Stack>
        </Stack>

        <Stack>
            
        </Stack>

        <Stack marginY={2}>
        <Pagination  count={500} shape="rounded" siblingCount={0}/>
        </Stack>
    </Stack>
  )
}

export default AllListings