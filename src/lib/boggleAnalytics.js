import sampleGrid from "./sampleGrid";
import { groupList, groupCount } from "./aggregators"
// There is a lot of space for improvement here
// Some optimizations might make it run faster or consume less memory. But, for data with less than a few k inputs, on iPads, it should still feel instant and memory is neglectable (ie: 1mb of memory is nothing).
// Some others are just related to using more idiomatic Javascript. But, since I don't know the language will be used at the end, I won't spend more time on it.
// If needed, I can provide a state machine to handle the game and have hooks to call external services.

const calculateComplexity = (string) => {
  // placeholder
  return string.length;
}
class BoggleAnalytics {
  constructor(events, grid) {
    this._events = [...events];
    this._grid = grid || sampleGrid;

    const bound = [
      "addComplexity", "addQuadrants", "addSize", "blockLinks", "blockQuadrant", 
      "calculateResult",
      "enhanceWordAdd", "enhanceWordAdds", "gameEnd", "gameStart", "groupEvents",
      "longestWordLength", "maxComplexity", "prep", "sameAttempt", "totalDuration",
      "wordAdds", "wordAttempts", "wordLinks", "wordRepeats",
      "wordsByQuadrant", "wordsBySize"
    ]
    bound.forEach(item => { this[item] = this[item].bind(this); })

    this.prep();
  }

  prep() {
    this.groupEvents();
    this.enhanceWordAdds();
    const stats = {
      elapsed_time: this.totalDuration(),
      successful_words: this.wordAdds().length,
      unsuccesful_words: this.wordAttempts().length - this.wordAdds().length,
      words_by_size: this.wordsBySize(),
      repeated_words: this.wordRepeats().length,
      longest_word: this.longestWordLength(),
      result: this.calculateResult(),
      words_by_quadrant: this.wordsByQuadrant(),
      max_complexity: this.maxComplexity()
    }

    this.stats = stats;
  }

  // prep functions
  groupEvents() { this._groupedEvents = groupList(this._events, "name") }
  enhanceWordAdds() { this.wordAdds().forEach(this.enhanceWordAdd); }
  enhanceWordAdd(w) {
    this.addComplexity(w);
    this.addQuadrants(w);
    this.addSize(w);
  }
  addQuadrants(w) {
    const quadrants = this.wordLinks(w).map(l => this.blockQuadrant(l.meta.grid_position));
    // sorting here is only to keep same order of presentation, so that 1,2 is same as 2,1
    const uniqueQuadrants = [... new Set(quadrants)].sort();
    w.meta["quadrants"] = uniqueQuadrants;
  }
  addSize(w) { w.meta["size"] = w.meta.word.length; }
  addComplexity(w) { w.meta["complexity"] = calculateComplexity(w.meta.word); }
  blockQuadrant(gridPosition) { return sampleGrid[gridPosition] }

  // access helpers
  wordAdds() { return this._groupedEvents["WordAdd"] || []; }
  wordAttempts() { return this._groupedEvents["AttemptEnd"] || [] }
  wordRepeats() { return this.wordAttempts().filter(e => e.meta.reason === "repeat") }
  gameStart() { return this._groupedEvents["GameStart"][0] }
  gameEnd() { return this._groupedEvents["GameEnd"][0] }
  blockLinks() { return this._groupedEvents["BlockLink"] }

  // conveniece heleprs
  wordLinks(event) { return this.blockLinks().filter((link => this.sameAttempt(link, event))) }
  sameAttempt(e1, e2) { return e1.meta.attempt && e1.meta.attempt === e2.meta.attempt }

  // calculations
  wordsBySize() { return groupCount(this.wordAdds(), ["meta", "size"]) }
  maxComplexity() { return Math.max(...this.wordAdds().map(w => w.meta.complexity)); }
  longestWordLength() { return Math.max(...this.wordAdds().map(w => w.meta.size)); }
  totalDuration() { return this.gameEnd()["timestamp"] - this.gameStart()["timestamp"] }
  calculateResult() { return this.gameEnd().meta.reason === "quit" ? "quit" : "win"; }
  wordsByQuadrant() { return groupCount(this.wordAdds(), ["meta", "quadrants"]); }
}

export default BoggleAnalytics;