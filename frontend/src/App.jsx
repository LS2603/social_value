import { useState, useEffect } from 'react';
import './App.css';
import LocalAuthorityTable from './LocalAuthorityTable';
import LocalAuthorityDetail from './LocalAuthorityDetail';

function App() {
  const [localAuthorities, setLocalAuthorities] = useState([]);
  const [selectedDetail, setSelectedDetail] = useState(null);
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')


  async function handleSelectAuthority(code) {
    setLoading(true)
    try {
      const res = await fetch(`http://localhost:3001/api/local-authorities/${code}`)
      const data = await res.json()
      setSelectedDetail(data)
      setLoading(false)
    } catch (err) {
      console.log(err);
      setSelectedDetail(null);
      setLoading(false)
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

  const filteredAuthorities = localAuthorities.filter((la) => la.la_district_name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <main style={{ padding: '2rem' }}>
      <h1>Social Value – Deprivation Tool</h1>

      <input 
        type="text"
        placeholder="Search for local authority"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: '1rem', padding: '0.5rem', width: '100%', maxWidth: '400px' }}
      />

      <h2>Top 10 most deprived local authorities</h2>

      <LocalAuthorityTable
        items={filteredAuthorities}
        onSelect={handleSelectAuthority}
      />

      <LocalAuthorityDetail detail={selectedDetail} loading={loading}/>
    </main>
  );
}

export default App;
