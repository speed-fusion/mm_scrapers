import { Stack, Tab, Tabs } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import RecentListings from '../../../../components/market_check/recent_listings';

const MarketCheckRecentListings = ({token}) => {

    const router = useRouter();

  
    const tab_items = [
        {
            label:"All Listings",
            status:false,
            href:`/mc/manual/all?token=${token}`

        },
        {
            label:"Recently Added",
            status:false,
            href:`/mc/manual/recent?token=${token}`
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

export async function getServerSideProps({query}) {

    const token = query.token;
    console.log(token)
    const correct_token = process.env.DASHBOARD_TOKEN;
    // const correct_token = "yug"

    if (token != correct_token)
    {
        return {
            redirect: {
                permanent: false,
                destination: "/404"
              }
        }
    }

    return {
        props: {
            token : token
        }, 
      }

    
  }

export default MarketCheckRecentListings
