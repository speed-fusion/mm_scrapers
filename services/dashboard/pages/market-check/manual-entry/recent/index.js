import { Stack, Tab, Tabs } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import RecentListings from '../../../../components/listings/recent';

const MarketCheckRecentListings = () => {

    const router = useRouter();
    const tab_items = [
        {
            label:"All Listings",
            status:false,
            href:"/market-check/manual-entry/all"

        },
        {
            label:"Recently Added",
            status:false,
            href:"/market-check/manual-entry/recent"
        }
    ]

    const [selectedTab,setSelectedTab] = useState(1)

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
        
        <RecentListings/>
        
    </Stack>

</Stack>
  )
}

export default MarketCheckRecentListings