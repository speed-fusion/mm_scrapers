import { Box, Stack, Tab, Tabs, Typography } from '@mui/material'
import React, { useState } from 'react'
import AllListings from '../../components/listings/all_listings'
import BlockedListings from '../../components/listings/blocked_listings'

const ListingsHome = () => {

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
                        <Tab disabled={item.status} onClick={()=>(setSelectedTab(index))} label={item.label}/>
                    ))
                }
                
            </Tabs>
        </Stack>

        <Stack>
            {selectedTab == 0 &&
                <AllListings/>
            }
            {selectedTab == 1 &&
                <BlockedListings/>
            }
        </Stack>
    
    </Stack>
  )
}

export default ListingsHome