import { Button, Stack, TextField } from '@mui/material'
import React from 'react'

const AddUrl = () => {
  return (
    <Stack spacing={1} direction="row">
        <TextField fullWidth id="outlined-basic" label="paste auto trader url" variant="outlined"/>
        <TextField
          id="outlined-number"
          label="Custom Price"
          type="number"
          defaultValue={0}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <Button variant="contained">Add</Button>
    </Stack>
  )
}

export default AddUrl