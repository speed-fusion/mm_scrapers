import { Autocomplete, Avatar, Card, CardActions, CardContent, CardHeader, CardMedia, IconButton, List, ListItem, ListItemAvatar, ListItemText, Pagination, SpeedDialIcon, Stack, TextField, Typography } from '@mui/material'
import React from 'react'

import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Box } from '@mui/system';

const AllListings = () => {

    const make = [
        "Bmw",
        "Audi",
        "Volvo"
    ]

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