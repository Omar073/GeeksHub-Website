import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import Link from 'next/link'
import 'bootstrap/dist/css/bootstrap.css'
import Navbar from '../components/navbar'


function Home(){
    return(
        <div>
            <Head>
        <title>Geeks Hub </title>
        <meta name="description" content=" A co-working space" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
           </Head>

            <Navbar></Navbar>
            <h1>Home</h1>
        </div>

    )
}
export default Home;
