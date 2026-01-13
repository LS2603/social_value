function LocalAuthorityTable({ items, onSelect }) {
  if (!items.length) {
    return <p>Loading authorities...</p>;
  }

  return (
    <div className="table-wrapper">
    <table>
      <thead>
        <tr>
          <th>Rank</th>
          <th>Local authority</th>
        </tr>
      </thead>
      <tbody>
        {items.map((la) => (
          <tr
            key={la.la_district_code}
            onClick={() => onSelect(la.la_district_code)}  
            style={{ cursor: 'pointer' }}                  
          >
            <td>{la.imd_average_rank}</td>
            <td>{la.la_district_name}</td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  );
}

export default LocalAuthorityTable;
