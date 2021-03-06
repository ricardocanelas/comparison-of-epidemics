import { useState, useEffect } from 'react'
import Head from 'next/head'
import Chart from '../components/Chart'
import { mergeHistory } from '../lib/stats'

const Home = () => {
  const [data, setData] = useState(null)

  useEffect(() => {
    fetch('/history.json').then(res => res.json()).then(result => {
      fetch('https://corona.lmao.ninja/v2/historical').then(res => res.json()).then(result2 => {
        const final = mergeHistory(result, result2)
        setData(final)
      }).catch(err => {
        console.log("Error")
        console.log(err.message)
      })
    }).catch(err => {
      console.log("Error")
      console.log(err.message)
    })
  }, [])

  return (
    <div className="container">
      <Head>
        <title>Comparison of Epidemics</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Comparison of Epidemics</h1>
        <h3>Death counts of epidemics by days of outbreak</h3>
        {!data && 'Loading...'}
        {data && (
        <div className="d1">
          <Chart data={data} />
          </div>
        )}
      </main>

      <footer>
        <div>
          {`Developed by `}
          <a href="https://github.com/ricardocanelas" target="_blank" rel="noopener noreferrer">
            Ricardo Canelas
          </a>
          {` & Powered by `}
          <a href="https://nextjs.org/" target="_blank" rel="noopener noreferrer">
            Next.js
          </a>
          <br />
          {`Data sources: `}
          <a href="https://www.youtube.com/watch?v=n4no04822NQ" target="_blank" rel="noopener noreferrer">
            Abacaba
          </a>
          {` and `}
          <a href="https://github.com/novelcovid/api" target="_blank" rel="noopener noreferrer">
            NovelCovid Api
          </a>
        </div>
      </footer>

      <style jsx>{`

      h1{ padding: 0; margin: 0 }

      .d1 {
        display: block;
        background-color: #f9f9f9;
        width: 100%;
        max-width: 700px;
        height: 540px;
        overflow-x: scroll;
        overflow-y: hidden;
        border-radius: 6px;
      }
      .container {
        min-height: 100vh;
        padding: 0 0.5rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }

      @media only screen and (max-width: 600px) {
        .container {
          padding-left: 240px
        }
      }

      main {
        padding: 5rem 0;
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }

      footer {
        width: 100%;
        height: 100px;
        border-top: 1px solid #eaeaea;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 12px;
        text-align: center;
      }

      a {
        color: inherit;
        text-decoration: underline;
      }
    `}</style>

      <style jsx global>{`
      html,
      body {
        padding: 0;
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
          Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
      }

      * {
        box-sizing: border-box;
      }
    `}</style>
    </div>
  )
}

export default Home
