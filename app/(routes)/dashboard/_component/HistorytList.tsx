'use client'
import Image from 'next/image';
import React, { useState } from 'react'

function HistortList() {

  const [historyList, setHistoryList] = useState([]);
  return (
    <div>
      {historyList.length==0?
      <div>
        <Image src = {"https://tse2.mm.bing.net/th/id/OIP.gl81Vp_dDLqChqsNWu2PQwHaFi?pid=Api&P=0&h=180"} alt="empty" width={200} height={200}/>
      </div>
    :<div>List</div>}
      
      </div>
  )
}

export default HistortList