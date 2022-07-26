import { Autocomplete, Avatar, Card, CardActions, CardContent, CardHeader, CardMedia, CircularProgress, Grid, IconButton, LinearProgress, List, ListItem, ListItemAvatar, ListItemText, Modal, Pagination, SpeedDialIcon, Stack, TextField, Typography } from '@mui/material'
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

    const [totalPage,setTotalPage] = useState(0)
    const [currentPage,setCurrentPage] = useState(0)
    const [totalListings,setTotalListings] = useState(0)

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
        setSelectedTrim(null)
        await fetchListings(0,make,null,null)
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
            "where":{"predicted_make":selectedMake,"predicted_model":model,"trim":{"$ne":null}}
        }),headers:{
            "Content-Type":"application/json"
        }
        })
        
        const data = await res.json()

        setTrimList(data["data"])
        setSelectedTrim(null)
        await fetchListings(0,selectedMake,model,null)
        setShowProgressBar(false)
    }

    async function on_trim_change(value)
    {
        setSelectedTrim(value)
        fetchListings(0,selectedMake,selectedModel,value)

    }

    async function fetchListings(page,make,model,trim)
    {
        setShowProgressBar(true)
        setSelectedTrim(trim)
        let where = {}
        if (make != null)
        {
            where["predicted_make"] = make
        }

        if (model != null)
        {
            where["predicted_model"] = model
        }

        if (trim != null)
        {
            where["trim"] = trim
        }

        const res = await fetch(`http://195.181.164.37:5000/listings/filter?page=${page}`,{
        method:"POST",
        body:JSON.stringify({
            "what":null,
            "where":where
        }),headers:{
            "Content-Type":"application/json"
        }
        })
        
        const data = await res.json()

        setTotalPage(data["data"]["total_pages"])
        setTotalListings(data["data"]["total_listings"])
        setCurrentPage(page)
        
        setListingList(data["data"]["listings"])
        setShowProgressBar(false)
        // setPagination(pagination)

    }


    async function handle_pagination(page)
    {
        setCurrentPage(page)
        await fetchListings(page,selectedMake,selectedModel,selectedTrim)

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
                    onChange={(event,value,reason,detail)=>on_trim_change(value)}
                    options={trimList}
                    sx={{ width: 300 }}
                    value={selectedTrim}
                    renderInput={(params) => <TextField {...params} label="Select Trim" />}
                />
            </Stack>
        </Stack>

        <Stack alignItems={"center"} justifyContent="center" alignContent={"center"}>
            <Grid container rowSpacing={3} columnSpacing={3} justifyItems="center">
                {
                    listingList.map((item)=>(
                        <Grid item xs={12} md={6} lg={6}>
                            <Card sx={{width:600}}>
                                <CardHeader title={item.title} subheader={`dealer name : ${item.dealer_name}`} ></CardHeader>
                                <CardMedia
                                height={300}
                                component={"img"}
                                image={item.images[1]["url"]}
                                />
                            </Card>
                        </Grid>
                    ))
                }
            </Grid>
        </Stack>

        <Stack marginY={2}>
        <Pagination onChange={async(event,page) => handle_pagination(page)} page={currentPage == 0 ? 1 : currentPage} count={totalPage} shape="rounded" siblingCount={0}/>
        </Stack>
    </Stack>
  )
}

export default AllListings