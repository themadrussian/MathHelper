import * as Actions from './actions'

export function fetchJoke() {
  return (dispatch) => {
    fetch('https://icanhazdadjoke.com/', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    })
    .then((response) => response.json())
    .then((responseJson) => {
      dispatch(Actions.jokeFetched(responseJson));
    })
    .catch((error) => {
      //nothing
    });
  }
}

export function fetchCatJoke() {
  return (dispatch) => {
    fetch('http://catfacts-api.appspot.com/api/facts?number=1', {
      method: 'GET'
    })
    .then((response) => response.json())
    .then((responseJson) => {
      // console.log("my cat fact", responseJson);
      if (responseJson.success) {
        dispatch(Actions.catFactFetched(responseJson.facts));
      }
    })
    .catch((error) => {
      // nothing
    });
  }
}

export function showReward(apppress = 0) {
  return (dispatch, getState ) => {
    if (apppress) {// this came from the ToolBar, simple repeat
      if (getState().enableCatFact || getState().enableDadJokes) {
        //if one of them is true -- show the reward
        dispatch(Actions.rewardToggled());
      }

    } else {
      // decide whather to show the reward or not
      if (getState().stepsCount%getState().rewardFrequency === 0
         || (getState().solved > 0
            && (getState().enableCatFact || getState().enableDadJokes) //at least one is enabled
            && getState().solved%getState().levelSteps === 0
            && getState().previousStepSolved)) {
        // first display a reward.
        dispatch(Actions.rewardToggled());
        dispatch(Actions.nextRewardSet());
        dispatch(Actions.jokeFetched());
        dispatch(Actions.catFactFetched());
      }
    }
  }
}

export function createProblem() {
  return (dispatch, getState ) => {
    // first run -- pre-fetch both rewards
    if (getState().stepsCount === 0) {
      dispatch(Actions.jokeFetched());
      dispatch(Actions.catFactFetched());
    };

    // increase seed every 'levelSteps' solved problems
    // make sure previousStepSolved is true (to stop perpetual jokes)
    if ( getState().solved > 0
      && getState().solved%getState().levelSteps === 0
      && getState().previousStepSolved) {
        dispatch(Actions.seedIncreased());
    }

    let antiLoop = 0;

    function uniqueNumber(seed = 100,variance = 100) {
      antiLoop++;
      if (antiLoop > 30 ) {
        antiLoop = 0;
        variance++;
        // console.log("Got stuck. increasing variance by 1 to:", variance);
      }

      let newNumber = seed - variance + Math.floor((Math.random()*variance) + 1);

      if (newNumber < 0 ) {
        // console.log("Caught a negative. Fixing. :", newNumber);
        newNumber = Math.abs(newNumber);
      }

      if (getState().allNumbers.indexOf(newNumber) === -1 ) {
        // not there, yes newNumber is unique
        getState().allNumbers.push(newNumber);
      } else {
        // hit! we already have newNumber in allNumbers array. Get a new one.
        newNumber = uniqueNumber(seed, variance);
      }
      return newNumber;
    }

    function correctAnswer(myProblem){
      let myString = myProblem.members[0] + "  " + myProblem.operation[0] + " " + myProblem.members[1];
      if (getState().allNumbers.indexOf(eval(myString)) === -1) {
        // don't push answer into allNumbers more than once
        getState().allNumbers.push(eval(myString));
      }
      return eval(myString);
    }

    let myProblem = {
      operation: [ "+" ],
      members: [
        //uniqueNumber (staring, variance), controls how large the numbers are
        //heuristic tests showed that the first two members need
        //both variance and seed to be the same number for better problems.
        uniqueNumber(getState().seed,getState().seed),
        uniqueNumber(getState().seed,getState().seed)
      ],
    };

    let myAnswers = [
      {
        value: correctAnswer(myProblem),
        correct: true
      },
      {
        value: uniqueNumber(correctAnswer(myProblem),getState().variance),
        correct: false
      },
      {
        value: uniqueNumber(correctAnswer(myProblem),getState().variance),
        correct: false
      }
    ]

    console.log("correct answer: ", myAnswers[0].value);

    // randomize answers positions
    myAnswers.sort( () => Math.random()*2 - 1 );

    // console.log("===> getState.scoreCount", getState().scoreCount);
    dispatch(Actions.problemCreated(myProblem));
    dispatch(Actions.answersCreated(myAnswers));
  }
}
