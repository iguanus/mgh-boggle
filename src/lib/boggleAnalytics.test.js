import boggleAnalytics from "./boggleAnalytics";
import { sessionBuilder } from "./testHelpers";

test("prep works", () => {
  const events = sessionBuilder()

  const subject = new boggleAnalytics(events)
  expect(subject._events).toEqual(events)
});

test("calculates total duration", () => {
  const events = sessionBuilder()

  const subject = new boggleAnalytics(events)
  expect(subject.stats.elapsed_time).toEqual(events[1]["timestamp"] - events[0]["timestamp"])
});

test("calculates successfull words", () => {
  const events = sessionBuilder([
    ["AttemptStart", { attempt: 1 }],
    ["BlockLink", { grid_position: 1, character: "y", attempt: 1 }],
    ["BlockLink", { grid_position: 2, character: "e", attempt: 1 }],
    ["BlockLink", { grid_position: 3, character: "s", attempt: 1 }],
    ["AttemptEnd", { attempt: 1 }],
    ["WordAdd", { word: "yes", attempt: 1 }],
  ])

  const subject = new boggleAnalytics(events)
  expect(subject.stats.successful_words).toEqual(1)
});

test("calculates words by size", () => {
  const events = sessionBuilder([
    ["AttemptStart", { attempt: 1 }],
    ["BlockLink", { grid_position: 1, character: "y", attempt: 1 }],
    ["BlockLink", { grid_position: 2, character: "e", attempt: 1 }],
    ["BlockLink", { grid_position: 3, character: "s", attempt: 1 }],
    ["AttemptEnd", { attempt: 1 }],
    ["WordAdd", { word: "yes", attempt: 1 }],
  ])

  const subject = new boggleAnalytics(events);
  expect(subject.stats.words_by_size).toEqual({ "3": 1 });
});

test("calculates failed words", () => {
  const events = sessionBuilder([
    ["AttemptStart", { attempt: 1 }],
    ["BlockLink", { grid_position: 1, character: "y", attempt: 1 }],
    ["BlockLink", { grid_position: 2, character: "e", attempt: 1 }],
    ["BlockLink", { grid_position: 3, character: "j", attempt: 1 }],
    ["AttemptEnd", { attempt: 1 }],
    ["WordReject", { word: "yej", reason: "non-existing", attempt: 1 }],
  ])

  const subject = new boggleAnalytics(events);
  expect(subject.stats.unsuccesful_words).toEqual(1);
});

test("calculates repeated words", () => {
  const events = sessionBuilder([
    ["AttemptStart", { attempt: 1 }],
    ["BlockLink", { grid_position: 1, character: "y", attempt: 1 }],
    ["BlockLink", { grid_position: 2, character: "e", attempt: 1 }],
    ["BlockLink", { grid_position: 3, character: "s", attempt: 1 }],
    ["AttemptEnd", { attempt: 1 }],
    ["WordAdd", { word: "yes", attempt: 1 }],
    ["AttemptStart", { attempt: 2 }],
    ["BlockLink", { grid_position: 1, character: "y", attempt: 2 }],
    ["BlockLink", { grid_position: 2, character: "e", attempt: 2 }],
    ["BlockLink", { grid_position: 3, character: "s", attempt: 2 }],
    ["AttemptEnd", { attempt: 2 }],
    ["WordReject", { word: "yes", reason: "repeat", attempt: 2 }],
  ])

  const subject = new boggleAnalytics(events);
  expect(subject.stats.repeated_words).toEqual(1);
});

test("calculates longest word", () => {
  const events = sessionBuilder([
    ["AttemptStart", { attempt: 1 }],
    ["BlockLink", { grid_position: 1, character: "y", attempt: 1 }],
    ["BlockLink", { grid_position: 2, character: "e", attempt: 1 }],
    ["BlockLink", { grid_position: 3, character: "s", attempt: 1 }],
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
  expect(subject.stats.longest_word).toEqual(5);
});

test("calculates result", () => {
  const events = sessionBuilder()

  const subject = new boggleAnalytics(events);
  expect(subject.stats.result).toEqual("quit");
});

test("calculates words by quadrant", () => {
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
  expect(subject.stats.words_by_quadrant).toEqual({"1": 1, "1,2": 1});
});

test("calculates max complexity", () => {
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
  // assumes calculateCompexity function to just return word length
  expect(subject.stats.max_complexity).toEqual(5);
});

