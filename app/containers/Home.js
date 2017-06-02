import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactNative from 'react-native';
const {
  View,
  Text,
  TouchableHighlight,
  StyleSheet
} = ReactNative;

class Home extends Component {
  problemSolved() {
    this.props.problemSolved();
    this.nextScreen();
  }

  problemNotSolved() {
    this.props.problemNotSolved();
    this.nextScreen();
  }

  nextScreen() {
    this.props.showReward();
    this.props.createProblem();
  }

  render() {
    var myAnswers = [];

    this.props.answers.forEach( (answer, id) => {
      myAnswers.push(
        <TouchableHighlight
          key={id}
          style={styles.answer_button}
          underlayColor={ answer.correct ? "green" : "orange" }
          onPress={ answer.correct ? () => this.problemSolved() : () => this.problemNotSolved() }
        >
          <Text style={styles.text}>{answer.value}</Text>
        </TouchableHighlight>
      );
    })

    return (
      <View style={styles.field}>
        <View style={styles.formula}>
          <Text style={styles.text}>
            {this.props.problem.members[0]}
            &nbsp;
            {this.props.problem.operation[0]}
            &nbsp;
            {this.props.problem.members[1]}
          </Text>
        </View>
        <View style={styles.answers}>
            {myAnswers}
        </View>
      </View>
    )
  }
};

const styles = StyleSheet.create({
  field: {
    flex: 1,
    backgroundColor: '#ecf0f1',
  },
  formula: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  answers: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'purple'
  },
  answer_button: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "powderblue",
    width: '100%'
  },
  text: {
    fontSize: 30,
    fontWeight: 'bold',
  },
});

function mapStateToProps(state){
  return {
    problem: state.problem,
    answers: state.answers
  }
};

export default connect(mapStateToProps)(Home);
