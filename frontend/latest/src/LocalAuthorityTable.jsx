function LocalAuthorityTable({ items }) {
  if (!items.length) {
    return <p>Loading top 10 authorities...</p>;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Rank</th>
          <th>Local authority</th>
        </tr>
      </thead>
      <tbody>
        {items.map((la) => (
          <tr key={la.la_district_code}>
            <td>{la.imd_average_rank}</td>
            <td>{la.la_district_name}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default LocalAuthorityTable;
