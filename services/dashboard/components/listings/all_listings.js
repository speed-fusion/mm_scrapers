import { Autocomplete, Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Chip, CircularProgress, Grid, Icon, IconButton, ImageList, ImageListItem, LinearProgress, Link, List, ListItem, ListItemAvatar, ListItemText, Modal, Pagination, SpeedDialIcon, Stack, TextField, Typography } from '@mui/material'
import { Box, height } from '@mui/system';
import React, { useEffect, useState } from 'react'
import EvStationIcon from '@mui/icons-material/EvStation';
import SettingsSuggestRoundedIcon from '@mui/icons-material/SettingsSuggestRounded';
import AddRoadRoundedIcon from '@mui/icons-material/AddRoadRounded';
import ClosedCaptionOffRoundedIcon from '@mui/icons-material/ClosedCaptionOffRounded';
import axios from 'axios';


const AllListings = ({makes,listings,total_pages,current_page,total_listings}) => {

    const api_endpoint = "http://195.181.164.37:5000/dashboard"

    const [selectedMake,setSelectedMake] = useState(null);
    const [makeList,setMakeList] = useState([]);

    const [selectedModel,setSelectedModel] = useState(null);
    const [modelList,setModelList] = useState([]);

    const [selectedTrim,setSelectedTrim] = useState(null);
    const [trimList,setTrimList] = useState([]);

    const [listingList,setListingList] = useState(listings)

    const [showProgressBar,setShowProgressBar] = useState(false);

    const [totalPage,setTotalPage] = useState(total_pages)
    const [currentPage,setCurrentPage] = useState(current_page)
    const [totalListings,setTotalListings] = useState(total_listings)



   

    useEffect(()=>{

        setShowProgressBar(true)
        axios.post(`${api_endpoint}/dropdown`,{
            "what":"make",
            "where":{}
        }).then(res => {
            console.log(res.data.data)
            setMakeList(res.data.data)
            setSelectedModel(null)
            setSelectedTrim(null)
            setShowProgressBar(false)
        }).catch(err => {
            console.log(err)
            setShowProgressBar(false)
        })

    },[])

    useEffect(()=>{

        if (selectedMake == null)
        {
            return
        }

        setShowProgressBar(true)
        axios.post(`${api_endpoint}/dropdown`,{
            "what":"model",
            "where":{"make":selectedMake}
        }).then(res => {
            setModelList(res.data.data)
            setSelectedModel(null)
            setSelectedTrim(null)
            setShowProgressBar(false)
        }).catch(err => {
            console.log(err)
            setShowProgressBar(false)
        })

    },[selectedMake])

    useEffect(()=>{

        if (selectedModel == null)
        {
            return
        }

        setShowProgressBar(true)
        axios.post(`${api_endpoint}/dropdown`,{
            "what":"trim",
            "where":{"make":selectedMake,"model":selectedModel}
        }).then(res => {
            setTrimList(res.data.data)
            setShowProgressBar(false)
        }).catch(err => {
            console.log(err)
            setShowProgressBar(false)
        })

        // return () => {
        //     setShowProgressBar(false)
        //   };

    },[selectedModel])

    function add_mm_url(id,registration)
    {
        axios.post(`${api_endpoint}/add-to-mm`).then(res => {
            setTrimList(res.data.data)
            setShowProgressBar(false)
        }).catch(err => {
            console.log(err)
            setShowProgressBar(false)
        })

    }

    useEffect(()=>{
        setShowProgressBar(true)

        let what = {"raw":1}

        let where = {}
        if(selectedMake != null)
        {
            where["raw.make"] = {"$regex":selectedMake,"$options" : "i"}
        }

        if(selectedModel != null)
        {
            where["raw.model"] = {"$regex":selectedModel,"$options" : "i"}
        }

        if(selectedTrim != null)
        {
            where["raw.trim"] =  {"$regex":selectedTrim,"$options" : "i"}
        }

        axios.post(`${api_endpoint}/listings`,{
            "what":what,
            "where":where,
            "page":currentPage
        }).then(res => {
            setListingList(res.data.data)
            setTotalListings(res.data.listing_count)
            setTotalPage(res.data.page_count)
            setShowProgressBar(false)
        }).catch(err => {
            console.log(err)
            setShowProgressBar(false)
            
        })

        // return () => {
        //     setShowProgressBar(false)
        //   };

    },[currentPage,selectedMake,selectedModel,selectedTrim])

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
                    onChange={(event,value,reason,detail)=>setSelectedMake(value)}
                    options={makeList}
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
                    onChange={(event,value,reason,detail)=>setSelectedModel(value)}
                    value={selectedModel}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="Select Model" />}
                />
            </Stack>

            <Stack margin={1}>
                <Autocomplete
                    disablePortal
                    id="trim_list"
                    onChange={(event,value,reason,detail)=>setSelectedTrim(value)}
                    options={trimList}
                    sx={{ width: 300 }}
                    value={selectedTrim}
                    renderInput={(params) => <TextField {...params} label="Select Trim" />}
                />
            </Stack>
        </Stack>

        <Stack marginY={2}>
        <Pagination onChange={(event,page) => setCurrentPage(page)} defaultPage={0} page={currentPage} count={totalPage} shape="rounded" siblingCount={0}/>
        </Stack>

        <Stack justify = "center">
            <Grid container rowSpacing={3} columnSpacing={3} justify = "center">
                {listingList &&
                    listingList.map((item)=>(
                        <Grid key={item._id} width={300} minWidth={300} justify = "center" alignItems={"center"} item xs={12} md={6} lg={6}>
                            <Card elevation={3}>
                                <Stack my={2} mx={0} justifyContent="space-evenly" direction={"row"}>
                                    <Stack>
                                        <Typography variant='h5'>{item.raw.make} - {item.raw.model}</Typography>
                                        <Typography color={"grey.700"} variant='subtitle1'>{item.raw.trim}</Typography>
                                    </Stack>
                                
                                    <Chip label={`${item.raw.price}$`} variant='filled' color='secondary' />
                                </Stack>

                               <Stack justify = "center" alignItems={"center"}>
                               <ImageList key={item._id} sx={{ width: {xs:300,md:450,lg:550}, height: {xs:300,md:450,lg:550} }} cols={2}>
                                {
                                    item.raw.images.map((img,index)=>(
                                        index < 15 &&(
                                    <ImageListItem key={index}>
                                        <img
                                            src={img.url}
                                            loading="lazy"
                                            onError={(e)=>{e.target.src="/default-image.jpg"}}
                                        />
                                    </ImageListItem>
                                        )
                                    ))
                                }
                                

                                </ImageList>
                               </Stack>
                             
                                    <Grid my={2} justifyContent={"center"} spacing={1} container>
                                        {/* <Stack spacing={1} justifyContent="center" direction={"row"}> */}
                                            <Grid item>
                                            <Chip icon={<SettingsSuggestRoundedIcon/>} label={item.raw.transmission}/>
                                            </Grid>

                                            <Grid item>
                                            <Chip icon={<AddRoadRoundedIcon/>} label={item.raw.mileage}/>
                                            </Grid>

                                            <Grid item>
                                            <Chip icon={<EvStationIcon/>} label={item.raw.fuel}/>
                                            </Grid>

                                            <Grid  item>
                                            <Chip icon={<ClosedCaptionOffRoundedIcon/>} label={item.raw.engine_cylinders_cc}/>
                                            </Grid>
                                            
                                          
                                        {/* </Stack> */}
                                        {/* <Stack spacing={1} justifyContent="center" direction={"row"}> */}
                                            {/* {item.raw.engine_cylinders_cc != null && item.raw.engine_cylinders_cc != 0 &&
                                                <Chip icon={<ClosedCaptionOffRoundedIcon/>} label={item.raw.engine_cylinders_cc}/>
                                            } */}
                                            
                                            
                                        {/* </Stack> */}

                                    </Grid>
                           
                     
                                <Stack my={2} spacing={1} justifyContent={"space-evenly"} direction="row" alignItems={"center"}>
                                    
                                            
                                        <Link sx={{ textDecoration:'none' }} target={"_blank"} href={item.raw.source_url} size="small" variant='outlined' >SOURCE URL</Link>
                                        
                                
                                        {item.mm_url != null &&
                                        <Link  target={"_blank"} href={item.mm_url} sx={{ textDecoration:'none' }} variant='outlined'>MM URL</Link>
                                        }
                                        
                                        <Button size='small' variant='contained'>ADD TO MM</Button>
                                        
                                
                                </Stack>
                      
                            </Card>
                        </Grid>
                    ))
                }
            </Grid>
        </Stack>

        <Stack marginY={2}>
        <Pagination onChange={(event,page) => setCurrentPage(page)} defaultPage={1} page={currentPage} count={totalPage} shape="rounded" siblingCount={2}/>
        </Stack>
    </Stack>
  )
}

export default AllListings