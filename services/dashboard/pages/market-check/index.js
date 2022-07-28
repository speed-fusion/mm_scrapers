import { Box, Stack, Tab, Tabs, Typography } from '@mui/material'
import React, { useState } from 'react'
import AllListings from '../../components/listings/all_listings'
import BlockedListings from '../../components/listings/blocked_listings'
import RecentListings from '../../components/listings/recent'

const ListingsHome = ({ makes,listings,total_pages,current_page,total_listings }) => {
    // console.log(data)
    const tab_items = [
        {
            label:"All Listings",
            status:false
        },
        {
            label:"Recently Added",
            status:false
        }
    ]

    const [selectedTab,setSelectedTab] = useState(0)

  return (
    <Stack>
        <Stack alignItems="center">
            <Tabs
                value={selectedTab}
                variant="scrollable"
                scrollButtons="auto"
                aria-label="listings tabs"
                    >
                {
                    tab_items.map((item,index)=>(
                        <Tab key={index} disabled={item.status} onClick={()=>(setSelectedTab(index))} label={item.label}/>
                    ))
                }
                
            </Tabs>
        </Stack>

        <Stack>
            {selectedTab == 0 &&
                <AllListings makes={makes} listings={listings} total_pages={total_pages} total_listings={total_listings} current_page={current_page}/>
            }
            {selectedTab == 1 &&
                <RecentListings/>
            }
        </Stack>
    
    </Stack>
  )
}

export default ListingsHome

export async function getServerSideProps() {
    // Fetch data from external API
    const res = await fetch(`http://195.181.164.37:5000/listings/unique`,{
        method:"POST",
        body:JSON.stringify({
            "what":"raw.make",
            "where":{"raw.make":{"$exists":true}}
        }),headers:{
            "Content-Type":"application/json"
        }
    })

    const data = await res.json()


    // const listing_res = await fetch(`http://195.181.164.37:5000/listings/filter?page=${0}`,{
    //     method:"POST",
    //     body:JSON.stringify({
    //         "where":{"raw.make":{"$exists":true}}
    //     }),headers:{
    //         "Content-Type":"application/json"
    //     }
    //     })
    
    
    // const listing_data = await listing_res.json()

    return { props: { 
        "makes":data["data"],
        // "listings":listing_data["data"]["listings"],
        "listings":[],
        // "total_pages":listing_data["data"]["total_pages"],
        "total_pages":0,
        // "total_listings":listing_data["data"]["total_listings"],
        "total_listings":0,
        "current_page":0
        
     } }
  }
