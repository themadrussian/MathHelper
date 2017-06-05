import * as types from './types';
import * as Triggers from './triggers';

export function jokeFetched(joke) {
  if (typeof(joke) != "undefined") {
    return {
      type: types.JOKE_FETCHED,
      joke
    }
  } else {
    // console.log("ok, try to generate the joke.");
    return Triggers.fetchJoke();
  }
}

export function catFactFetched(fact) {
  if (typeof(fact) != "undefined") {
    return {
      type: types.CAT_FACT_FETCHED,
      fact
    }
  } else {
    return Triggers.fetchCatJoke();
  }
}

export function problemSolved() {
  // console.log("===> Inside addProblem action")
  return {
    type: types.PROBLEM_SOLVED,
  }
}

export function problemNotSolved() {
  // console.log("===> Inside deleteProblem action")
  return {
    type: types.PROBLEM_NOT_SOLVED,
  }
}

export function problemCreated(problem) {
  // console.log("inside problemCreated action, got this problem: ", problem);
  return {
    type: types.PROBLEM_CREATED,
    problem
  }
}

export function answersCreated(answers) {
  return {
    type: types.ANSWERS_CREATED,
    answers
  }
}

export function seedIncreased() {
  return {
    type: types.SEED_INCREASED,
  }
}

export function rewardToggled() {
  return {
    type: types.REWARD_TOGGLED,
  }
}

export function settingsToggled() {
  return {
    type: types.SETTINGS_TOGGLED,
  }
}

export function levelStepsChanged(level) {
  return {
    type: types.LEVEL_STEPS_CHANGED,
    level
  }
}

export function rewardFrequencyChanged(frequency) {
  return {
    type: types.REWARD_FREQUENCY_CHANGED,
    frequency
  }
}

export function catFactToggled() {
  return {
    type: types.CAT_FACT_TOGGLED
  }
}

export function dadJokeToggled(toggle) {
  return {
    type: types.DAD_JOKE_TOGGLED,
    toggle
  }
}

export function nextRewardSet() {
  return {
    type: types.NEXT_REWARD_SET,
    // reward
  }
}

export function answerInputChanged() {
  return {
    type: types.ANSWER_INPUT_CHANGED
  }
}
