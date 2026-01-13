function LocalAuthorityDetail ({ detail, loading }) {
    if(loading) {
        return <p>Loading details...</p>
    }
    
    if(!detail) {
        return <p>Select local authority</p>
    }

    return (
        <section style={{ marginTop: '2rem' }}>
            <h3>{detail.la_district_name}</h3>
            <p>IMD Ranking from Averages : {detail.imd_average_rank}</p>

            <h4>Domain Ranks</h4>
            <ul className="domain-list">
              {detail.domains.map((domain) => (
                <li key={domain.name}>
                    {domain.name}: rank {domain.rank}
                </li>
                ))}
            </ul>
        </section>
    )
}

export default LocalAuthorityDetail