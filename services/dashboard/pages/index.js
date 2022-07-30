import * as React from 'react';
import Box from '@mui/material/Box';
import { useRouter } from 'next/router';

export default function Index() {

 


  return (
    <Box>
     
    </Box>
  );
}


export async function getServerSideProps(context) {
 
  return {
    redirect: {
      permanent: false,
      destination: `/mc/manual/all`,
    },
    props:{},
  };
}