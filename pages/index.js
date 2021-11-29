import Head from 'next/head'
import Sidebar from '../components/Sidebar'

export default function Home() {
  return (
    <div className="min-h-screen md:px-6 ">
      <Head>
        <title>WhatsApp</title>
        <link rel="icon" href="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/1021px-WhatsApp.svg.png" />
      </Head>

      <div className="bg-yellow-100 border-2 border-gray-300   w-full ">
        <Sidebar />
        
      </div>

    </div>
  )
}
