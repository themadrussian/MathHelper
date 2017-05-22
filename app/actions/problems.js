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

export function createProblem() {
  return (dispatch, getState ) => {

    let allNumbers = [];

    function uniqueNumber() {
      let newNumber = Math.floor((Math.random()*100) + 1);

      if (allNumbers.indexOf(newNumber) === -1 ) {
        // not there, yes newNumber is unique
        allNumbers.push(newNumber);
      } else {
        // hit! we already have newNumber in allNumbers array. Get a new one.
        console.log("got a duplicate! ", newNumber, " already exists!");
        newNumber = uniqueNumber();
      }
      // console.log("Generated unique number:", newNumber);
      return newNumber;
    }

    function correctAnswer(myProblem){
      myString=myProblem.members[0] + "  " + myProblem.operation[0] + " " + myProblem.members[1];
      console.log("correct answer: ", eval(myString));
      return eval(myString);
    }

    let myProblem = {
      operation: [ "+" ],
      members: [
        uniqueNumber(),
        uniqueNumber()
      ],
    };

    let myAnswers = [
      {
        value: uniqueNumber(),
        correct: false
      },
      {
        value: correctAnswer(myProblem),
        correct: true
      },
      {
        value: uniqueNumber(),
        correct: false
      }
    ]

    // randomize answers positions
    myAnswers.sort( () => Math.random()*2 - 1 );

    // console.log("===> inside createProblem action. myProblem: ", myProblem)
    dispatch(problemCreated(myProblem));
    dispatch(answersCreated(myAnswers));
  }
}
