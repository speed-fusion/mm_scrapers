import { Stack, Tab, Tabs } from '@mui/material'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import AllListings from '../../../../components/market_check/all_listings';

const MarketCheckAllListings = () => {

    const router = useRouter();
    const tab_items = [
        {
            label:"All Listings",
            status:false,
            href:"/mc/manual/all"

        },
        {
            label:"Recently Added",
            status:false,
            href:"/mc/manual/recent"
        }
    ]

    const [selectedTab,setSelectedTab] = useState(0)

    useEffect(()=>{

        let href = tab_items[selectedTab].href
        router.push(href)

    },[selectedTab])




  return (
    <Stack>
    <Stack alignItems="center">
        <Tabs
            value={selectedTab}
            variant="scrollable"
            scrollButtons="auto"
            aria-label="listings tabs"
            onChange={(e,v)=>setSelectedTab(v)}
                >
            {
                tab_items.map((item,index)=>(
                    <Tab key={index} disabled={item.status} onClick={()=>(setSelectedTab(index))} label={item.label}/>
                ))
            }
            
        </Tabs>
    </Stack>

    <Stack>
        
        <AllListings/>
        
    </Stack>

</Stack>
  )
}

export default MarketCheckAllListings