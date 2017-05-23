import * as types from './types'

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

export function createProblem() {
  // first, checkProgress
  // checkProgress();

  return (dispatch, getState ) => {

    // increase seed by 10 every 'levelSteps' solved problems
    if ( getState().solved > 0 && getState().solved%getState().levelSteps === 0 ) {
      dispatch(seedIncreased());
      console.log("increasing seed to: ", getState().seed);
    }

    let allNumbers = [];
    let antiLoop = 0;

    function uniqueNumber(seed = 100,variance = 100) {
      antiLoop++;
      if (antiLoop > 30 ) {
        antiLoop = 0;
        variance++;
        console.log("Got stuck. increasing variance by 1 to:", variance);
      }

      // console.log("seed: ", seed, " variance: ", variance);

      let newNumber = seed - variance + Math.floor((Math.random()*variance) + 1);

      if (newNumber < 0 ) {
        console.log("Caught a negative. Fixing. :", newNumber);
        newNumber = Math.abs(newNumber);
      }

      if (allNumbers.indexOf(newNumber) === -1 ) {
        // not there, yes newNumber is unique
        allNumbers.push(newNumber);
      } else {
        // hit! we already have newNumber in allNumbers array. Get a new one.
        // console.log("got a duplicate! ", newNumber, " already exists!");
        newNumber = uniqueNumber(seed, variance);
      }
      // console.log("Generated unique number:", newNumber);
      return newNumber;
    }

    function correctAnswer(myProblem){
      let myString=myProblem.members[0] + "  " + myProblem.operation[0] + " " + myProblem.members[1];
      allNumbers.push(eval(myString));
      return eval(myString);
    }

    let myProblem = {
      operation: [ "+" ],
      members: [
        //uniqueNumber (staring, variance), controls how large the numbers are
        //empiral tests showed that the first two members need to have
        //both variance and seed the same for better problems.
        //variance is then decreased for answers
        uniqueNumber(getState().seed,getState().seed),  // Keep variance here at least 10
        uniqueNumber(getState().seed,getState().seed)   // possibly, just equal to the seed number.
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
    dispatch(problemCreated(myProblem));
    dispatch(answersCreated(myAnswers));
  }
}
//
// export function checkProgress() {
//   return (dispatch, getState) => {
//     console.log("checking progress score: ", getState().scoreCount);
//     if (getState().scoreCount = 3 ) dispatch(seedIncreased());
//   }
// }
