import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import TabBox from '../components/TabBox/TabBox'

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <TabBox />
      

      
    </div>
  )
}

export default Home
