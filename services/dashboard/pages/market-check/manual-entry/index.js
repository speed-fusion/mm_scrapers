import { Box, Stack, Tab, Tabs, Typography } from '@mui/material'
import React, { useState } from 'react'
import AllListings from '../../../components/listings/all_listings'
import RecentListings from '../../../components/listings/recent'

const ManualEntryMarketCheck = ({ makes,listings,total_pages,current_page,total_listings }) => {
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

export default ManualEntryMarketCheck