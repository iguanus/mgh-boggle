function Row(props) {
  const { name, value } = props;
  const stringifiable = typeof value === "object";

  return (
    <tr key={name}>
      <td>{name}</td>
      <td>
        { stringifiable ? keysToSpans(value) : value }
      </td>
    </tr>
  )
}
function keysToSpans(object) {
  return Object.keys(object).map(k => <span>{k}: {JSON.stringify(object[k])}<br /></span>);
}

function StatsTable(props) {
  const { stats } = props;
  const keys = Object.keys(stats);

  return (
    <div>
      <h2>Results</h2>
    <table>
      <tbody>
        {keys.map(k => Row({name: k, value: stats[k]}))}
      </tbody>
    </table>
      </div>
  );
}

export default StatsTable;
