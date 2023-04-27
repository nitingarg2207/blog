import "../styles/globals.css";
import Navbar from "../components/Navbar";
import Head from 'next/head'
// import Script from 'next/script'
import '../styles/signup.css'
import { useEffect, useState } from "react";
import { auth } from "../firebase";

function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState(null)
  useEffect(()=>{
    auth.onAuthStateChanged(user=>{
      if(user) setUser(user)
      else setUser(null)
    })
  },[])
  return (
    <>
    <Head>
      <title>Blog App</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css"/>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KyZXEAg3QhqLMpG8r+8fhAXLRk2vvoC2f3B09zVXn8CA5QIVfZOJ3BCsw2P0p/We" crossOrigin="anonymous"></link>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-U1DAWAznBHeqEIlVSCgzq+c9gqGAJn5c/t99JyeKa9xxaYpSvHU5awsuZVVFIhvj" crossOrigin="anonymous"></script>
    </Head>
      <Navbar user={user} />
      <Component {...pageProps} user={user} />
    </>
  );
}

export default MyApp;
