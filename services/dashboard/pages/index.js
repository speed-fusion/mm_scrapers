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
  const token = context.query.token
  return {
    redirect: {
      permanent: false,
      destination: `/mc/manual/all?token=${token}`,
    },
    props:{},
  };
}