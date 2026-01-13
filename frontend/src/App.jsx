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
    <main>
      <h1>Social Value – Deprivation Tool</h1>
      <h2>Explore deprivation by local authority</h2>

      <div className="layout">
        <section className="card">
          <input
            type="text"
            placeholder="Search local authority..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />

          <LocalAuthorityTable
            items={filteredAuthorities}
            onSelect={handleSelectAuthority}
          />
        </section>

        <section className="card">
          <LocalAuthorityDetail detail={selectedDetail} loading={loading} />
        </section>
      </div>
</main>

  );
}

export default App;
