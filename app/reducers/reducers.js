import createReducer from '../lib/createReducer'
import * as types from '../actions/types'

export const scoreCount = createReducer(0, {
  [types.PROBLEM_SOLVED](state, action){
    return state + 1;
  },

  [types.PROBLEM_NOT_SOLVED](state, action){
    return ( state ? state - 1 : state );
  },

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

export const seed = createReducer(10, {
  [types.SEED_INCREASED](state, action){
    return state + 10;
  }
});

export const variance = createReducer(10, {

});

export const levelSteps = createReducer(3, {

});

export const jokeOrFact = createReducer(true, {
  [types.PROBLEM_SOLVED](state, action){
    return ( state ? false : true )
  },

  [types.PROBLEM_NOT_SOLVED](state, action){
    return ( state ? false : true )
  }

})

export const previousStepSolved = createReducer(true, {
  [types.PROBLEM_SOLVED](state, action){
    return true;
  },

  [types.PROBLEM_NOT_SOLVED](state, action){
    return false;
  }
})

export const dadJoke = createReducer({joke: "...wait for it..."}, {
  [types.JOKE_FETCHED](state, action){
    // console.log(" ===> reducer dadJoke. state: ", state, "action: ", action);
    return action.joke;
  }
});

export const catFact = createReducer({fact: "...wait for a fresh cat fact..."}, {
  [types.CAT_FACT_FETCHED](state, action){
    console.log(" ===> reducer dadJoke. state: ", state, "action: ", action);
    return action.fact;
  }
});

export const dadJokeVisible = createReducer(true, {
  [types.SHOW_HIDE_JOKE](state, action){
    if (state) {
      return false;
    } else {
      return true;
    }
  }
})

export const allNumbers = createReducer([],{
  [types.PROBLEM_CREATED](state, action){
    // every time a problem is created, null out the allNumber
    return [];
  }
})
