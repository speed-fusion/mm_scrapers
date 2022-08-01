import { Accordion, AccordionDetails, AccordionSummary, Alert, Autocomplete, Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Chip, CircularProgress, Grid, Icon, IconButton, ImageList, ImageListItem, LinearProgress, Link, List, ListItem, ListItemAvatar, ListItemText, Modal, Pagination, Snackbar, SpeedDialIcon, Stack, TextField, Typography } from '@mui/material'
import { Box, height } from '@mui/system';
import React, { useEffect, useState } from 'react'
import EvStationIcon from '@mui/icons-material/EvStation';
import SettingsSuggestRoundedIcon from '@mui/icons-material/SettingsSuggestRounded';
import AddRoadRoundedIcon from '@mui/icons-material/AddRoadRounded';
import ClosedCaptionOffRoundedIcon from '@mui/icons-material/ClosedCaptionOffRounded';
import axios from 'axios';
import { useRouter } from "next/router";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


const AllListings = ({}) => {

    const router = useRouter();


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

    const [showSnackbar,SetShowSnackbar] = useState(false)
    const [snackbarMessage,SetSnackbarMessage] = useState("")


    const [minPrice,setMinPrice] = useState(null);
    const [maxPrice,setMaxPrice] = useState(null);

    const [currentRegistration,setCurrentRegistration] = useState(null);
    const [registrationSuggestion,setRegistrationSuggestion] = useState([]);
    // registration_suggestion

    const [minMileage,setMinMileage] = useState(null);
    const [maxMileage,setMaxMileage] = useState(null);

    const [postcode,setPostcode] = useState(null)
    const [postcodeOptions,setPostcodeOptions] = useState([])

    const [built,setBuilt] = useState(null);

    let price_options = []

    const price_options_min = 3

    const price_options_max = 50

    for (let i =price_options_min;i<= price_options_max;i++)
    {
        price_options.push(i * 1000)
    }

    const goToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    let mileage_options = []

    const min_mileage = 0

    const max_mileage = 120

    for (let i =min_mileage;i<= max_mileage;i++)
    {
        mileage_options.push(i * 1000)
    }

    const built_option = []
    const min_built = 2011
    const max_built = new Date().getFullYear();

    for (let i =min_built;i<= max_built;i++)
    {
        built_option.push(i)
    }


    async function fetch_registration(chars)
    {
        if (chars.length > 0)
        {
            axios.post(`${api_endpoint}/suggestion`,{
                "what":"raw.registration",
                "where":{"raw.registration":{"$regex":chars,"$options" : "i"}},
                "limit":5
            }).then(res => {
                setRegistrationSuggestion(res.data.data)
            }).catch(err => {
                setRegistrationSuggestion([])
            })
        }
        else
        {
            setRegistrationSuggestion([])
        }
    }

    
    async function fetch_postcodes(chars)
    {
        if (chars.length > 0)
        {
            axios.post(`${api_endpoint}/suggestion`,{
                "what":"raw.car_postal_code",
                "where":{"raw.car_postal_code":{"$regex":chars,"$options" : "i"}},
                "limit":5
            }).then(res => {
                setPostcodeOptions(res.data.data)
            }).catch(err => {
                setPostcodeOptions([])
            })
        }
        else
        {
            setPostcodeOptions([])
        }
    }


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

      

    },[selectedModel])

    function add_mm_url(id,registration)
    {
        setShowProgressBar(true)
        axios.get(`${api_endpoint}/add-to-mm?id=${id}&registration=${registration}`).then(res => {
            SetSnackbarMessage(res.data.message)
            SetShowSnackbar(true)
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

        if(currentRegistration != null)
        {
            where["raw.registration"] = {"$regex":currentRegistration,"$options" : "i"}
        }

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
        
        if (maxPrice != null || minPrice != null)
        {
            where["raw.price"] = {}

            if (minPrice != null)
            {
                where["raw.price"]["$gt"] = minPrice
            }

            if(maxPrice != null)
            {
                where["raw.price"]["$lt"] = maxPrice
            }
        }

        if(minMileage != null || maxMileage != null)
        {
            where["raw.mileage"] = {}
            if (minMileage != null)
            {
                where["raw.mileage"]["$gt"] = minMileage
            }

            if (maxMileage != null)
            {
                where["raw.mileage"]["$lt"] = maxMileage
            }
        }

        if(built != null)
        {
            where["raw.built"] = built
        }

        if(postcode != null)
        {
            where["raw.car_postal_code"] = postcode
        }


        axios.post(`${api_endpoint}/listings`,{
            "what":what,
            "where":where,
            "page":currentPage - 1
        }).then(res => {
            setListingList(res.data.data)
            setTotalListings(res.data.listing_count)
            setTotalPage(res.data.page_count)
            setShowProgressBar(false)
            
           
        }).catch(err => {
            console.log(err)
            setShowProgressBar(false)
            goToTop()
            
            
        })

   

    },[minPrice,postcode,minMileage,maxMileage,built,currentRegistration,maxPrice,currentPage,selectedMake,selectedModel,selectedTrim])

  return (
    <Stack alignItems="center">
        
        <Snackbar  anchorOrigin={{ vertical:"top", horizontal:"center" }} open={showSnackbar} onClose={()=>SetShowSnackbar(false)} autoHideDuration={6000}>
            <Alert severity="success" sx={{ width: '100%' }}>
                {snackbarMessage}
            </Alert>
        </Snackbar>
                    
        <Stack id="top" marginY={1}>
                <Modal
                open={showProgressBar}
                onClose={setShowProgressBar}
                >
                <Stack sx={{width:"100%" ,height:"100%"}} alignItems="center" justifyContent={"center"}>
                    <CircularProgress />
                </Stack>
               
                </Modal>
                
            
        </Stack>
       
        <Stack direction={{xs:"column",lg:"row"}} marginY={0}>
            <Stack margin={1}>
                <Autocomplete
                    size='small'
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
                    size='small'
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
                    size='small'
                    onChange={(event,value,reason,detail)=>setSelectedTrim(value)}
                    options={trimList}
                    sx={{ width: 300 }}
                    value={selectedTrim}
                    renderInput={(params) => <TextField {...params} label="Select Trim" />}
                />
            </Stack>
        </Stack>
        

        <Stack direction={{xs:"column",lg:"row"}} marginY={0}>
            <Stack margin={1}>
                <Autocomplete
                    disablePortal
                    id="min_price"
                    size='small'
                    onChange={(event,value,reason,detail)=>setMinPrice(value)}
                    options={price_options}
                    sx={{ width: 300 }}
                    value={minPrice}
                    renderInput={(params) => <TextField {...params} label="Min Price" />}
                />
            </Stack>
            <Stack margin={1}>
                <Autocomplete
                    disablePortal
                    id="max_price"
                    size='small'
                    options={price_options}
                    onChange={(event,value,reason,detail)=>setMaxPrice(value)}
                    value={maxPrice}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="Max Price" />}
                />
            </Stack>

           

        </Stack>

        <Stack direction={{xs:"column",lg:"row"}} marginY={0}>
            <Stack margin={1}>
                <Autocomplete
                    disablePortal
                    id="registration"
                    size='small'
                    onChange={(event,value,reason,detail)=>setCurrentRegistration(value)}
                    options={registrationSuggestion}
                    filterOptions={(x) => x}
                    sx={{ width: 300 }}
                    value={currentRegistration}
                    renderInput={(params) => <TextField onChange={(e)=>fetch_registration(e.target.value)} {...params} label="Registration" />}
                />
            </Stack>

            <Stack margin={1}>
                <Autocomplete
                    disablePortal
                    id="postcode"
                    size='small'
                    onChange={(event,value,reason,detail)=>setPostcode(value)}
                    options={postcodeOptions}
                    filterOptions={(x) => x}
                    sx={{ width: 300 }}
                    value={postcode}
                    renderInput={(params) => <TextField onChange={(e)=>fetch_postcodes(e.target.value)} {...params} label="Postcode" />}
                />
            </Stack>

            <Stack margin={1}>
                <Autocomplete
                    disablePortal
                    id="built"
                    size='small'
                    onChange={(event,value,reason,detail)=>setBuilt(value)}
                    options={built_option}
                    sx={{ width: 300 }}
                    value={built}
                    renderInput={(params) => <TextField {...params} label="Built" />}
                />
            </Stack>

        </Stack>

        <Stack direction={{xs:"column",lg:"row"}} marginY={0}>
            <Stack margin={1}>
                <Autocomplete
                    disablePortal
                    id="minMileage"
                    size='small'
                    onChange={(event,value,reason,detail)=>setMinMileage(value)}
                    options={mileage_options}
                    sx={{ width: 300 }}
                    value={minMileage}
                    renderInput={(params) => <TextField {...params} label="Min Mileage" />}
                />
            </Stack>

            <Stack margin={1}>
                <Autocomplete
                    disablePortal
                    id="maxMileage"
                    size='small'
                    onChange={(event,value,reason,detail)=>setMaxMileage(value)}
                    options={mileage_options}
                    sx={{ width: 300 }}
                    value={maxMileage}
                    renderInput={(params) => <TextField {...params} label="Max Mileage" />}
                />
            </Stack>

        </Stack>

        <Stack marginY={2}>
        <Pagination onChange={(event,page) => setCurrentPage(page)} size='small' page={currentPage} count={totalPage} shape="rounded" siblingCount={1}/>
        </Stack>

        <Stack justify = "center">
            <Grid container rowSpacing={3} columnSpacing={3} justify = "center">
                {listingList &&
                    listingList.map((item)=>(
                        <Grid key={item._id} width={200} minWidth={totalListings > 1 ? 300 : 500} justify = "center" alignItems={"center"} item xs={12} md={6} lg={6}>
                            <Card elevation={3}>
                                <Stack my={1} mx={0} justifyContent="space-evenly" direction={"row"}>
                                    <Stack>
                                        <Typography variant='h5'>{item.raw.make} - {item.raw.model}</Typography>
                                        <Typography color={"grey.700"} variant='subtitle1'>{item.raw.trim}</Typography>
                                    </Stack>
                                
                                
                                </Stack>
                                <Grid container spacing={1} justifyContent="center">
                                    <Grid item>
                                        <Chip label={`${item.raw.registration}`}  variant='outlined' color='secondary' />
                                    </Grid>

                                    <Grid item>
                                    <Chip label={`${item.raw.price} £`} variant='filled' color='secondary' />
                                    </Grid>
                                    
                                </Grid>

                               <Stack justify = "center" alignItems={"center"}>
                               <ImageList key={item._id} sx={{ width: {xs:300,md:450,lg:550}, height: {xs:300,md:450,lg:400} }} cols={2}>
                                {
                                    item.raw.images.map((img,index)=>(
                                        index < 15 &&(
                                    <ImageListItem key={index}>
                                        <img
                                            width={"100%"}
                                            height={"100%"}
                                            src={`${api_endpoint}/resize?url=${img.url}&width=400&height=300`}
                                            loading="lazy"
                                            onError={(e)=>{e.target.src="/default-image.jpg"}}
                                            
                                        />
                                    </ImageListItem>
                                        )
                                    ))
                                }
                                

                                </ImageList>
                               </Stack>
                             
                                    <Grid my={1} justifyContent={"center"} spacing={1} container>
                                        {/* <Stack spacing={1} justifyContent="center" direction={"row"}> */}
                                            <Grid item>
                                           {item.raw.transmission != null &&
                                             <Chip icon={<SettingsSuggestRoundedIcon/>} label={item.raw.transmission}/>
                                           }
                                            </Grid>

                                            <Grid item>
                                            {item.raw.mileage != null &&
                                            <Chip icon={<AddRoadRoundedIcon/>} label={item.raw.mileage}/>
}
                                            </Grid>

                                            <Grid item>
                                            {item.raw.fuel != null &&
                                            <Chip icon={<EvStationIcon/>} label={item.raw.fuel}/>
}
                                            </Grid>

                                            <Grid  item>
                                            {item.raw.engine_cylinders_cc != null &&
                                            <Chip icon={<ClosedCaptionOffRoundedIcon/>} label={item.raw.engine_cylinders_cc}/>
}
                                            </Grid>
                                            
                                            <Grid  item>
                                            {item.raw.built != null &&
                                            <Chip icon={<CalendarMonthIcon/>} label={item.raw.built}/>
}
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
                                <Stack my={1} spacing={1} justifyContent={"space-evenly"} direction="row" alignItems={"center"}>
                                    
                                            
                                        <Link sx={{ textDecoration:'none' }} target={"_blank"} href={item.raw.source_url} size="small" variant='outlined' >SOURCE URL</Link>
                                        
                                
                                        {item.mm_url != null &&
                                        <Link  target={"_blank"} href={item.mm_url} sx={{ textDecoration:'none' }} variant='outlined'>MM URL</Link>
                                        }
                                        
                                        <Button size='small' onClick={()=> add_mm_url(item._id,item.raw.registration)} variant='contained'>ADD TO MM</Button>
                                        
                                
                                </Stack>
                      
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

export default AllListings