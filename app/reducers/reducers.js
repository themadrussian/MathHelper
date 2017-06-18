import createReducer from '../lib/createReducer';
import * as types from '../actions/types';
import * as myConst from './constants';

export const stepsCount = createReducer(0, {
  [types.PROBLEM_SOLVED](state, action){
    return state + 1;
  },

  [types.PROBLEM_NOT_SOLVED](state, action){
    return state + 1;
  },
});

export const jokeOrFact = createReducer(false, {
  [types.NEXT_REWARD_SET](state, action){
    return ( state ? false : true )
  }
});

export const problem = createReducer({}, {
  [types.PROBLEM_CREATED](state, action){
    return action.problem;
  }
});

export const answers = createReducer({}, {
  [types.ANSWERS_CREATED](state, action){
    return action.answers;
  }
});

export const solved = createReducer(0, {
  [types.PROBLEM_SOLVED](state, action){
    return state + 1;
  }
});

export const missed = createReducer(0, {
  [types.PROBLEM_NOT_SOLVED](state, action){
    return state + 1;
  }
});

export const seed = createReducer(myConst.SEED_STEP, {
  [types.SEED_INCREASED](state, action){
    return state + myConst.SEED_STEP;
  }
});

export const variance = createReducer(myConst.VARIANCE_STEP, {
  //Nothing here for now
});

export const levelSteps = createReducer(myConst.LEVEL_STEP, {
  [types.LEVEL_STEPS_CHANGED](state, action){
    return action.level;
  }
});

export const previousStepSolved = createReducer(true, {
  [types.PROBLEM_SOLVED](state, action){
    return true;
  },

  [types.PROBLEM_NOT_SOLVED](state, action){
    return false;
  }
});

export const dadJoke = createReducer({joke: "...wait for it..."}, {
  [types.JOKE_FETCHED](state, action){
    return action.joke;
  }
});

export const catFact = createReducer(["...wait for a fresh cat fact...",], {
  [types.CAT_FACT_FETCHED](state, action){
    return action.fact;
  }
});

export const rewardVisible = createReducer(false, {
  [types.REWARD_TOGGLED](state, action){
    return ( state ? false : true );
  }
});

export const settingsVisible = createReducer(false, {
  [types.SETTINGS_TOGGLED](state, action){
    return ( state ? false : true );
  }
});

export const allNumbers = createReducer([],{
  [types.PROBLEM_CREATED](state, action){
    // every time a problem is created, null out the allNumbers array
    return [];
  }
});

export const rewardFrequency = createReducer(myConst.LEVEL_STEP, {
  [types.REWARD_FREQUENCY_CHANGED](state, action){
      return action.frequency;
  }
});

export const enableCatFact = createReducer(true, {
  [types.CAT_FACT_TOGGLED](state, action){
    return (state ? false : true );
  }
});

export const enableDadJokes = createReducer(true, {
  [types.DAD_JOKE_TOGGLED](state, action){
    return (state ? false : true );
  }
});

export const manualAnswer = createReducer("", {
  [types.KEYBOARD_BUTTON_PRESSED](state, action){
    let tempState = state;

    switch (action.key) {
      case "d":
        if (tempState.length != 0) {
          tempState = tempState.slice(0,tempState.length-1);
        }
        break;
      case "-":
        if (tempState.slice(0,1) === "-") {
          tempState = tempState.slice(1,tempState.length);
        } else {
          tempState = "-".concat(tempState.toString());
        }
        break;
      default:
        if (tempState.length === 0) {
          tempState=action.key.toString();
        } else {
          tempState=state.concat(action.key);
        }
    }

    return tempState;
  },

  [types.PROBLEM_SOLVED](state, action){
    return "";
  },

  [types.PROBLEM_NOT_SOLVED](state, action){
    return "";
  },
});

export const manualKeyboard = createReducer(false, {
  [types.MANUAL_KEYBOARD_TOGGLED](state, action){
    return (state ? false : true );
  }
})
