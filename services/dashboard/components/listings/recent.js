import { Autocomplete, Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Chip, CircularProgress, Grid, Icon, IconButton, ImageList, ImageListItem, LinearProgress, Link, List, ListItem, ListItemAvatar, ListItemText, Modal, Pagination, SpeedDialIcon, Stack, TextField, Typography } from '@mui/material'
import { Box, height } from '@mui/system';
import React, { useEffect, useState } from 'react'
import EvStationIcon from '@mui/icons-material/EvStation';
import SettingsSuggestRoundedIcon from '@mui/icons-material/SettingsSuggestRounded';
import AddRoadRoundedIcon from '@mui/icons-material/AddRoadRounded';
import ClosedCaptionOffRoundedIcon from '@mui/icons-material/ClosedCaptionOffRounded';
import axios from 'axios';
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'

const RecentListings = ({}) => {


    const api_endpoint = "https://dashboard.motor.market/api/dashboard"

    const [selectedMake,setSelectedMake] = useState(null);
    const [makeList,setMakeList] = useState([]);

    const [selectedModel,setSelectedModel] = useState(null);
    const [modelList,setModelList] = useState([]);

    const [selectedTrim,setSelectedTrim] = useState(null);
    const [trimList,setTrimList] = useState([]);

    const [listingList,setListingList] = useState([])

    const [showProgressBar,setShowProgressBar] = useState(false);

    const [totalPage,setTotalPage] = useState(0)
    const [currentPage,setCurrentPage] = useState(1)
    const [totalListings,setTotalListings] = useState(0)

    // English.
    

    TimeAgo.addDefaultLocale(en)

    // Create formatter (English).
    const timeAgo = new TimeAgo('en-US')



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

        axios.post(`${api_endpoint}/recently-added`,{
            "page":currentPage - 1
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

    },[currentPage])

  return (
    <Stack alignItems="center">

        <Stack marginY={2}>
        <Pagination onChange={(event,page) => setCurrentPage(page)} size='small' page={currentPage} count={totalPage} shape="rounded" siblingCount={1}/>
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
                                
                                    
                                </Stack>

                                <Stack px={6} my={2} justifyContent={"center"}>
                                  
                                  <Grid container justifyContent={"center"} spacing={1}>
                                  <Grid item>
                                    <Chip label={item.status} variant='filled' color={item.status == "active" ? 'secondary' : 'error'} />
                                    </Grid>
                                  <Grid item>
                                        <Chip label={`${item.raw.registration}`}  variant='outlined' color='secondary' />
                                    </Grid>
                                  </Grid>
                                  <Typography textAlign={"center"} my={1} variant="body2">current status : {item.message}</Typography>
                                </Stack>

                                {
                                  <Grid justifyContent={"center"} container spacing={1}>
                                    
                                  <Grid item>
                                  <Chip label={`mm price : ${item.mm_price == null ? "NA" : `${item.mm_price}$` }`} variant='filled' color='secondary' />
                                  </Grid>

                                  <Grid item>
                                  <Chip label={`margin : ${item.margin == null ? "NA" : `${item.margin}$` }`}  variant='filled' color='secondary' />
                                  </Grid>

                                  <Grid item>
                                  <Chip label={`source price : ${item.source_mrp == null ? "NA" : `${item.source_mrp}$` }`}  variant='filled' color='secondary' />
                                  </Grid>
                              
                              </Grid>
                                }


                               <Stack justify = "center" alignItems={"center"}>
                              
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

                                  
                                </Stack>
                               
                                   {item.created_at != null &&
                                   <Typography my={1} textAlign={"center"}>{timeAgo.format(new Date(item.created_at))}</Typography>
                                   }
                                
                               
                      
                            </Card>
                        </Grid>
                    ))
                }
            </Grid>
        </Stack>

        <Stack marginY={2}>
        <Pagination onChange={(event,page) => setCurrentPage(page)} page={currentPage} count={totalPage} shape="rounded" size='small' siblingCount={1}/>
        </Stack>
    </Stack>
  )
}

export default RecentListings