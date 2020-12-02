import "./Grid.css";

function Grid() {
  return (
    <div>
      <h2>Grid</h2>
      <table>
        <tbody>
          <tr>
            <td className="qi q1" colspan="2">Q1</td>
            <td className="qi q2" colspan="2">Q2</td>
          </tr>
          <tr>
            <td className="q1">1</td>
            <td className="q1">2</td>
            <td className="q2">3</td>
            <td className="q2">4</td>
          </tr>
          <tr>
            <td className="q1">5</td>
            <td className="q1">6</td>
            <td className="q2">7</td>
            <td className="q2">8</td>
          </tr>

          <tr>
            <td className="q3">9</td>
            <td className="q3">10</td>
            <td className="q4">11</td>
            <td className="q4">12</td>
          </tr>
          <tr>
            <td className="q3">13</td>
            <td className="q3">14</td>
            <td className="q4">15</td>
            <td className="q4">16</td>
          </tr>
          <tr>
            <td className="qi q3" colspan="2">Q3</td>
            <td className="qi q4" colspan="2">Q4</td>
          </tr>
        </tbody>
      </table>
    </div>
    
  );
}

export default Grid;
