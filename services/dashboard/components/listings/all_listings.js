import { Autocomplete, Avatar, Card, CardActions, CardContent, CardHeader, CardMedia, CircularProgress, IconButton, LinearProgress, List, ListItem, ListItemAvatar, ListItemText, Modal, Pagination, SpeedDialIcon, Stack, TextField, Typography } from '@mui/material'
import { Box, height } from '@mui/system';
import React, { useState } from 'react'


const AllListings = ({make}) => {

    const [selectedMake,setSelectedMake] = useState(null);
    const [makeList,setMakeList] = useState(make);

    const [selectedModel,setSelectedModel] = useState(null);
    const [modelList,setModelList] = useState([]);

    const [selectedTrim,setSelectedTrim] = useState(null);
    const [trimList,setTrimList] = useState([]);

    const [listingList,setListingList] = useState([])

    const [showProgressBar,setShowProgressBar] = useState(false);

    async function fetchModels(make)
    {   setSelectedMake(make)
        setShowProgressBar(true)
        const res = await fetch(`http://195.181.164.37:5000/listings/unique`,{
        method:"POST",
        body:JSON.stringify({
            "what":"predicted_model",
            "where":{"predicted_make":make}
        }),headers:{
            "Content-Type":"application/json"
        }
        })
        
        const data = await res.json()

        setModelList(data["data"])
        setSelectedModel(null)
        setShowProgressBar(false)
    }

    async function fetchTrim(model)
    {
        setSelectedModel(model)
        setShowProgressBar(true)
        const res = await fetch(`http://195.181.164.37:5000/listings/unique`,{
        method:"POST",
        body:JSON.stringify({
            "what":"trim",
            "where":{"predicted_make":selectedMake,"predicted_model":model,"trim":{"$exists":true}}
        }),headers:{
            "Content-Type":"application/json"
        }
        })
        
        const data = await res.json()

        setTrimList(data["data"])
        setSelectedTrim(null)
        setShowProgressBar(false)
    }

    function fetchListings()
    {

    }
  return (
    <Stack alignItems="center">
        <Stack marginY={2}>
                <Modal
                open={showProgressBar}
                onClose={setShowProgressBar}
                >
                <Stack sx={{width:"100%" ,height:"100%"}} alignItems="center" justifyContent={"center"}>
                    <CircularProgress />
                </Stack>
               
                </Modal>
                
            
        </Stack>
        <Stack direction={{xs:"column",lg:"row"}} marginY={2}>
            <Stack margin={1}>
                <Autocomplete
                    disablePortal
                    id="make_list"
                    options={makeList}
                    onChange={(event,value,reason,detail)=>fetchModels(value)}
                    sx={{ width: 300 }}
                    value={selectedMake}
                    renderInput={(params) => <TextField {...params} label="Select Make" />}
                />
            </Stack>
            <Stack margin={1}>
                <Autocomplete
                    disablePortal
                    id="model_list"
                    options={modelList}
                    onChange={(event,value,reason,detail)=>fetchTrim(value)}
                    value={selectedModel}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="Select Model" />}
                />
            </Stack>

            <Stack margin={1}>
                <Autocomplete
                    disablePortal
                    id="trim_list"
                    options={trimList}
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