import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState, useRef } from 'react'
import styles from '../styles/Home.module.css'
import Lottie from 'react-lottie-player'
import lottieJson from './dragon.json'
import {
  CloseCircleOutlined
} from '@ant-design/icons';
import Highlighter from "react-highlight-words"
import { List, Avatar } from 'antd'

export default function Home() {
  const [searchterm, setsearchterm] = useState('')
  const [searcharray, setsearcharray] = useState('')
  const [error, showerror] = useState(false)
  const [loading, showloading] = useState(false)
  const [text, showtext] = useState(false)
  const [qdata, setdata] = useState('') 
  const [data, showdata] = useState(false)

  const handleInput = (event) => {
    var search = String(event.target.value)
    setsearchterm(search);
  }; 

  function handleSearch() {

    showerror(false)
    showloading(true)
    var searcharray = searchterm.split(' ')
    setsearcharray(searcharray)
    if(searcharray.length > 6)
    {
      showloading(false)
      showerror(true)
      return
    }
    const apiurl = '/api/search';
    const postBody = {
        search: searcharray,
        limit: 10
    };
    const requestMetadata = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(postBody)
    };
    fetch(apiurl, requestMetadata)
    .then(response => response.json())
    .then(data => {
      console.log(data)
      setdata(data.resp)
      showdata(true)
      showloading(false)
      showtext(true)
    })
    .catch(e => {
      
    });  
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Search through Inheritance Cycle</title>
        <meta name="description" content="Search through the Inheritance Trilogy" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.right}>
          <img src="./1.png" className={styles.image}/>
        </div>
        <div className={styles.left}>
          {!loading && !data && <div>
            <h1 className={styles.title}>
              Search the full text of the Inheritance Cycle
            </h1>
            
            <p className={styles.description}>
              Separate search terms by space
              
            </p>
            <div className={styles.containerinputsearch}>
              <input type="text" className={styles.input} onChange={handleInput} value={searchterm}/>
              <button className={styles.button} onClick={handleSearch}>Search</button>
                
            </div>
            {error && <div>
                <p className={styles.description}>Please limit to a max of five keywords</p>
              </div>} 
          </div>} 
          {loading && <Lottie
          loop
          animationData={lottieJson}
          play
          style={{ width: 150, height: 150 }}
          />}
          {!loading && data && <div style={{ height: '100vh', padding: '1em' }}>
          <div>
            <div>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' ,paddingLeft: '40px', marginBottom: '4em' }}>
              <div className={styles.containerinputsearchother}>
                <input type="text" className={styles.input} onChange={handleInput} value={searchterm}/>
                <button className={styles.button} onClick={handleSearch}>Search</button>
                
              </div>
              <CloseCircleOutlined style={{ color: 'white', fontSize: '1.5rem', marginRight: '0.9em' }}/>
            </div>
            {error && <div>
                <p className={styles.description}>Please limit to a max of five keywords</p>
              </div>} 
          </div>
          </div>
          <List
    itemLayout="vertical"
    bordered
    dataSource={qdata}
    renderItem={item => (
      
          <div>
            <p className={styles.chapter}>{item.chap}</p>
            <p className={styles.book}>{item.book}</p>
            <Highlighter
              highlightClassName="YourHighlightClass"
              searchWords={searcharray}
              autoEscape={true}
              style={{ color: 'white', fontSize: '1rem', color: '#6c757d' }}
              textToHighlight={item.text}
            />

          </div>  
      
    )}
  />
  </div>}
        </div>
        
        
      </main>
      
      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Made by {'u/zukhzukh'}
          <span className={styles.logo}>
          </span>
        </a>
      </footer>
    </div>
  )
}
