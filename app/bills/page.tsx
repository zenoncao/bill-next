import ClientOnly from '../components/ClientOnly';
import BillsClient from './BillsClient';

import getBills from '../actions/getBills'
import { useEffect, useState } from 'react';

const BillsPage = async () => {
  const billList = await getBills()
  
  return (
      <ClientOnly>
        <BillsClient billsList={billList}/>
      </ClientOnly>
  )
};

export default BillsPage;
