import { Autocomplete, Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Chip, CircularProgress, Grid, Icon, IconButton, LinearProgress, Link, List, ListItem, ListItemAvatar, ListItemText, Modal, Pagination, SpeedDialIcon, Stack, TextField, Typography } from '@mui/material'
import { Box, height } from '@mui/system';
import React, { useState } from 'react'
import EvStationIcon from '@mui/icons-material/EvStation';
import SettingsSuggestRoundedIcon from '@mui/icons-material/SettingsSuggestRounded';
import AddRoadRoundedIcon from '@mui/icons-material/AddRoadRounded';
import ClosedCaptionOffRoundedIcon from '@mui/icons-material/ClosedCaptionOffRounded';


const AllListings = ({makes,listings,total_pages,current_page,total_listings}) => {

    const [selectedMake,setSelectedMake] = useState(null);
    const [makeList,setMakeList] = useState(makes);

    const [selectedModel,setSelectedModel] = useState(null);
    const [modelList,setModelList] = useState([]);

    const [selectedTrim,setSelectedTrim] = useState(null);
    const [trimList,setTrimList] = useState([]);

    const [listingList,setListingList] = useState(listings)

    const [showProgressBar,setShowProgressBar] = useState(false);

    const [totalPage,setTotalPage] = useState(total_pages)
    const [currentPage,setCurrentPage] = useState(current_page)
    const [totalListings,setTotalListings] = useState(total_listings)

    async function fetchModels(make)
    {   setSelectedMake(make)
        setShowProgressBar(true)
        const res = await fetch(`http://195.181.164.37:5000/listings/unique`,{
        method:"POST",
        body:JSON.stringify({
            "what":"raw.model",
            "where":{"raw.make":make}
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
            "what":"raw.trim",
            "where":{"raw.make":selectedMake,"raw.model":model,"raw.trim":{"$ne":null}}
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
            where["raw.make"] = make
        }

        if (model != null)
        {
            where["raw.model"] = model
        }

        if (trim != null)
        {
            where["raw.trim"] = trim
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

        <Stack marginY={2}>
        <Pagination onChange={async(event,page) => handle_pagination(page)} page={currentPage == 0 ? 1 : currentPage} count={totalPage} shape="rounded" siblingCount={0}/>
        </Stack>

        <Stack justify = "center">
            <Grid container rowSpacing={3} columnSpacing={3} justify = "center">
                {
                    listingList.map((item)=>(
                        <Grid width={300} minWidth={300} spacing={1} justify = "center" alignItems={"center"} item xs={12} md={6} lg={6}>
                            <Card elevation={3}>
                                
                                
                                <CardHeader title={`${item.make} - ${item.model}`} subheader={item.trim} ></CardHeader>
                                <Stack my={1} mx={2} justifyContent="right" direction={"row"}>
                                    <Chip label={`${item.price}$`} variant='filled' color='secondary' />
                                </Stack>
                                <CardMedia
                                onError={(e)=>{e.target.src="/default-image.jpg"}}
                                height={250}
                                component={"img"}
                                
                                image={item.main_img}
                                />
                                <CardContent>
                                    <Stack spacing={1}>
                                        <Stack spacing={1} justifyContent="center" direction={"row"}>
                                            <Chip icon={<SettingsSuggestRoundedIcon/>} label={item.transmission}/>
                                            <Chip icon={<AddRoadRoundedIcon/>} label={item.mileage}/>
                                            <Chip icon={<EvStationIcon/>} label={item.fuel}/>
                                        </Stack>
                                        <Stack spacing={1} justifyContent="center" direction={"row"}>
                                            {item.engine_cylinders_cc != null && item.engine_cylinders_cc != 0 &&
                                                <Chip icon={<ClosedCaptionOffRoundedIcon/>} label={item.engine_cylinders_cc}/>
                                            }
                                            
                                            
                                        </Stack>

                                    </Stack>
                                </CardContent>
                                <CardActions>
                                    <Stack>
                                        <Stack direction={"row"} spacing={2} justifyContent="center" alignItems={"center"}>
                                            <Box>
                                                <Link sx={{ textDecoration:'none' }} target={"_blank"} href={item.source_url} size="small" variant='outlined' >SOURCE URL</Link>
                                            </Box>
                                            <Box>
                                            {item.mm_url != null &&
                                            <Link  target={"_blank"} href={item.mm_url} sx={{ textDecoration:'none' }} variant='outlined'>MM URL</Link>
                                            }
                                            </Box>
                                            <Button size='small' variant='contained'>ADD TO MM</Button>
                                            
                                        </Stack>
                                    </Stack>
                                    
                                </CardActions>
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