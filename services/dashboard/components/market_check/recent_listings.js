import { Accordion, AccordionDetails, AccordionSummary, Autocomplete, Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Chip, CircularProgress, Grid, Icon, IconButton, ImageList, ImageListItem, LinearProgress, Link, List, ListItem, ListItemAvatar, ListItemText, Modal, Pagination, SpeedDialIcon, Stack, TextField, Typography } from '@mui/material'
import { Box, height } from '@mui/system';
import React, { useEffect, useState } from 'react'
import EvStationIcon from '@mui/icons-material/EvStation';
import SettingsSuggestRoundedIcon from '@mui/icons-material/SettingsSuggestRounded';
import AddRoadRoundedIcon from '@mui/icons-material/AddRoadRounded';
import ClosedCaptionOffRoundedIcon from '@mui/icons-material/ClosedCaptionOffRounded';
import axios from 'axios';
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import RefreshIcon from '@mui/icons-material/Refresh';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { indigo } from '@mui/material/colors';

TimeAgo.addDefaultLocale(en)

const RecentListings = ({}) => {


    const api_endpoint = "https://dashboard.motor.market/api/dashboard"

    const [trimList,setTrimList] = useState([]);

    const [listingList,setListingList] = useState([])

    const [showProgressBar,setShowProgressBar] = useState(false);

    const [totalPage,setTotalPage] = useState(0)
    const [currentPage,setCurrentPage] = useState(1)
    const [totalListings,setTotalListings] = useState(0)


    const timeAgo = new TimeAgo('en-US')

  
    // English.

    // Create formatter (English).
    



    

    useEffect(()=>{
        setShowProgressBar(true)

        axios.post(`${api_endpoint}/recently-added`,{
            "page":currentPage - 1
        }).then(res => {
            setListingList(res.data.data)
            setTotalListings(res.data.listing_count)
            setTotalPage(res.data.page_count)
            setShowProgressBar(false)
            // console.log(res.data)
        }).catch(err => {
            console.log(err)
            setShowProgressBar(false)
            
        })

    },[currentPage])

  return (
    <Stack alignItems="center">


        {totalPage > 1 &&
            <Stack marginY={2}>
            <Pagination onChange={(event,page) => setCurrentPage(page)} size='small' page={currentPage} count={totalPage} shape="rounded" siblingCount={1}/>
            </Stack>
        }

        

        <Stack my={2} justify = "center">
            <Grid container rowSpacing={3} columnSpacing={3} justify = "center">
                {listingList &&
                    listingList.map((item)=>(
                        <Grid key={item._id} width={300} minWidth={300} justify = "center" alignItems={"center"} item xs={12} md={6} lg={6}>
                            <Card elevation={3}>
                                <Stack my={2} mx={0} justifyContent="space-evenly" direction={"row"}>
                                    <Stack>
                                        <Typography textAlign={"center"} variant='h5'>{item.raw?.make} - {item.raw.model}</Typography>
                                        <Typography textAlign={"center"} height={20} color={"grey.700"} variant='subtitle1'>{item.raw.trim}</Typography>
                                    </Stack>
                                
                                    
                                </Stack>

                                <Stack px={6} my={2} justifyContent={"center"}>
                                  
                                  <Grid container justifyContent={"center"} spacing={1}>
                                  <Grid item>
                                    <Chip label={item.status} variant='filled' color={item.status == "active" ? 'success' : 'error'} />
                                    </Grid>
                                  <Grid item>
                                        <Chip label={`${item.raw.registration}`}  variant='outlined' color='secondary' />
                                    </Grid>
                                  </Grid>
                                  
                                  {item.status == "to_parse" &&
                                    <Stack my={2}>
                                    <LinearProgress color='success' />
                                    
                                    </Stack>
                                  }
                                
                                    <Typography textAlign={"center"} my={1} variant="body2">{item.message}</Typography>
                                  
                                </Stack>

                                {
                                  <Grid justifyContent={"center"} container spacing={1}>
                                    
                                    <Grid item>
                                  <Chip label={`source price : ${item.source_mrp == null ? "NA" : `${item.source_mrp} £` }`}  variant='outlined' color='secondary' />
                                  </Grid>


                                  <Grid item>
                                  <Chip label={`margin : ${item.margin == null ? "NA" : `${item.margin} £` }`}  variant='outlined' color='info' />
                                  </Grid>

                                  <Grid item>
                                  <Chip label={`mm price : ${item.mm_price == null ? "NA" : `${item.mm_price} £` }`} variant='filled' color={'secondary'} />
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
                                    <Stack>
                                <Accordion  elevation={0}>
                                    <AccordionSummary

                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                    >
                                    <Typography textAlign={"center"}>DEALER INFORMATION</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                    
                                    <Grid justifyContent={"center"} spacing={1} container>
                                       
                                            <Grid item>
                                             <Chip variant='outlined' label={`DEALER ID : ${item.raw.dealer_id}`}/>
                                            </Grid>

                                            <Grid item>
                                             <Chip variant='outlined' label={`DEALER NAME : ${item.raw.dealer_name}`}/>
                                            </Grid>

                                            <Grid item>
                                             <Chip variant='outlined' label={`DEALER PHONE : ${item.raw.dealer_number}`}/>
                                            </Grid>

                                            <Grid item>
                                             <Chip variant='outlined' label={`POST CODE : ${item.raw.dealer_location}`}/>
                                            </Grid>
                                    </Grid>
                                
                                    </AccordionDetails>
                                </Accordion>
                                </Stack>
                     
                                <Stack my={2} spacing={1} justifyContent={"space-evenly"} direction="row" alignItems={"center"}>
                                    
                                            
                                        
                                        <Button target={"_blank"}  color='primary' href={item.raw.source_url} variant='outlined' >SOURCE URL</Button>
                                
                                        {item.status == "active" &&
                                      
                                            <Button target={"_blank"}  color='primary' href={item.mm_url} variant='contained' >MM URL</Button>
                                      
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
        {totalPage > 1 &&
        <Stack marginY={2}>
        <Pagination onChange={(event,page) => setCurrentPage(page)} page={currentPage} count={totalPage} shape="rounded" size='small' siblingCount={1}/>
        </Stack>
        }
    </Stack>
  )
}

export default RecentListings