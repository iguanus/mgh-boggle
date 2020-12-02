export const sessionBuilder = (list = []) => {
  const events = list.map(i => eventMaker(i[0], i[1], i[2]))
  
  let i = 1;
  const result = [gameStart(), ...events, gameEnd(i + 1)]
  result.forEach(item => { item.timestamp = i; i++ });

  return result; 
}

const gameStart = () => eventMaker("GameStart", { session_uuid: 1 });
const gameEnd = () => eventMaker("GameEnd", { session_uuid: 1, reason: "quit" });
const eventMaker = (name, meta, timestamp) => {
  return {
    name,
    meta: meta,
    timestamp: timestamp
  }
}