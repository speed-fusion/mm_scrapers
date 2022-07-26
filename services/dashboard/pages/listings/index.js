import { Box, Stack, Tab, Tabs, Typography } from '@mui/material'
import React, { useState } from 'react'
import AllListings from '../../components/listings/all_listings'
import BlockedListings from '../../components/listings/blocked_listings'

const ListingsHome = ({ data }) => {
    // console.log(data)
    const tab_items = [
        {
            label:"All Listings",
            status:false
        },
        {
            label:"Blocked Listings",
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
                <AllListings make={data["data"]}/>
            }
            {selectedTab == 1 &&
                <BlockedListings/>
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
            "what":"predicted_make",
            "where":{"predicted_make":{"$exists":true}}
        }),headers:{
            "Content-Type":"application/json"
        }
    })

    const data = await res.json()

    // console.log(data)
  
    // Pass data to the page via props
    return { props: { data } }
  }
