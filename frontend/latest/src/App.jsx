import { useState, useEffect } from 'react'
import './App.css'
import LocalAuthorityTable from './LocalAuthorityTable'

function App() {
  const [ localAuthorities, setLocalAuthorities ] = useState([])

  useEffect(() => {
    async function loadData () {
      try {
        const res = await fetch (`http://localhost:3001/api/local-authorities/`)
        const data = await res.json()
        setLocalAuthorities(data)
      } catch (err) {
        console.log(err)
        setLocalAuthorities([])
      }
    } loadData()
  }, [])

  return (
    <main style={{ padding: '2rem' }}>
      <h1>Social Value – Deprivation Tool</h1>
      <h2>Top 10 most deprived local authorities</h2>

      <LocalAuthorityTable items={localAuthorities} />
    </main>
  );
}

export default App
