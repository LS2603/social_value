import { useState, useEffect } from 'react';
import './App.css';
import LocalAuthorityTable from './LocalAuthorityTable';
import LocalAuthorityDetail from './LocalAuthorityDetail';

function App() {
  const [localAuthorities, setLocalAuthorities] = useState([]);
  const [selectedDetail, setSelectedDetail] = useState(null);

  async function handleSelectAuthority(code) {
    try {
      const res = await fetch(`http://localhost:3001/api/local-authorities/${code}`)
      const data = await res.json()
      setSelectedDetail(data)
    } catch (err) {
      console.log(err);
      setSelectedDetail(null);
    }
  }

  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch('http://localhost:3001/api/local-authorities');
        const data = await res.json();
        setLocalAuthorities(data);
      } catch (err) {
        console.log(err);
        setLocalAuthorities([]);
      }
    }
    loadData();
  }, []);

  return (
    <main style={{ padding: '2rem' }}>
      <h1>Social Value – Deprivation Tool</h1>
      <h2>Top 10 most deprived local authorities</h2>

      <LocalAuthorityTable
        items={localAuthorities}
        onSelect={handleSelectAuthority}
      />

      <LocalAuthorityDetail detail={selectedDetail} />
    </main>
  );
}

export default App;
