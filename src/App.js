import './App.css';

import { sessionBuilder } from "./lib/testHelpers";
import boggleAnalytics from "./lib/boggleAnalytics";
import EventsTable from "./EventsTable";
import StatsTable from "./StatsTable";

function App() {
  const events = sessionBuilder([
    ["AttemptStart", { attempt: 1 }],
    ["BlockLink", { grid_position: 1, character: "y", attempt: 1 }],
    ["BlockLink", { grid_position: 2, character: "e", attempt: 1 }],
    ["BlockLink", { grid_position: 6, character: "s", attempt: 1 }],
    ["AttemptEnd", { attempt: 1 }],
    ["WordAdd", { word: "yes", attempt: 1 }],
    ["AttemptStart", { attempt: 2 }],
    ["BlockLink", { grid_position: 1, character: "y", attempt: 2 }],
    ["BlockLink", { grid_position: 2, character: "e", attempt: 2 }],
    ["BlockLink", { grid_position: 3, character: "a", attempt: 2 }],
    ["BlockLink", { grid_position: 4, character: "s", attempt: 2 }],
    ["BlockLink", { grid_position: 8, character: "t", attempt: 2 }],
    ["AttemptEnd", { attempt: 2 }],
    ["WordAdd", { word: "yeast", attempt: 2 }],
  ])

  const subject = new boggleAnalytics(events);

  window.analytics = subject;

  return (
    <div className="App">
      <EventsTable events={events} />
      <StatsTable stats={subject.stats} />
    </div>
  );
}

export default App;
