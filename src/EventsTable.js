import "./EventsTable.css";

function EventRow(props) {
  const { name, meta, timestamp } = props;

  return (
    <tr key={timestamp}>
      <td>{timestamp}</td>
      <td>{name}</td>
      <td>{
        Object.keys(meta).map(k => <span>{k}: {JSON.stringify(meta[k])}<br /></span>)}
        </td>
    </tr>
  )
}
function EventsTable(props) {
  const { events } = props;
  return (
    <div>
      <h2>Events</h2>
      <table>
        <thead>
          <tr>
            <th>Timestamp</th>
            <th>Name</th>
            <th>Meta</th>
          </tr>
        </thead>

        <tbody>
          {events.map(e => EventRow(e))}
        </tbody>
      </table>
    </div>
      
  );
}

export default EventsTable;
