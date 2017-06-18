import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactNative from 'react-native';
const {
  View,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  StyleSheet,
  Picker
} = ReactNative;
import _ from 'underscore';
import styles from '../css/stylesHome';
import Icon from 'react-native-vector-icons/FontAwesome';
import MyKeyboard from './MyKeyboard';

class HomeManual extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selected1: this.props.seed,
      maxBoxes: 5,
      pressed: [false,false,false],
      subtractCoefficientSolved: 0,
      subtractCoefficientMissed: 0,
    }
  }

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

  _onHideUnderlay(id){
    this.setState({ pressed: [false,false,false]});
  }
  _onShowUnderlay(id){
    var temp=[false,false,false];
    temp[id]=true;
    this.setState({ pressed: temp});
  }

  findDimensions(event) {
    this.setState({
      maxBoxes: Math.floor(event.nativeEvent.layout.height / 13) //13 is the size of score box. TODO fix this.
      // maxBoxes: 4 //DEBUG
    });
  }

  _buildScore(score,color=true) {
    var testArray = [];
    var allArray = [];
    var j = 1;
    var max=this.state.maxBoxes;
    var numOfColumns = Math.floor(score/max);

    for (var i = 1; i <= score; i++) {
      if ( (i === 1 && score < max ) || //first box of first column
           (i === (numOfColumns*max+1) && score != numOfColumns*max) || // first box of last column
           (i === ((numOfColumns-1)*max+1) && score === numOfColumns*max) // first box of a full column
         ) {
        testArray.push(
          <View style={color ? styles.greenBoxFirst : styles.redBoxFirst} key={(i+1200).toString()} />
        );
      } else {
        testArray.push(
          <View style={styles.box} key={(i+1200).toString()} />
        );
      }
      if (!(i%this.state.maxBoxes)) {
        allArray.push(
          <View style={styles.column} key={i+1700}>{ testArray }</View>
        );
        testArray = [];
        j = 1;
      }
      j++;
    }

    if (testArray.length) {
      allArray.push(
        <View key={i+600} style={styles.column} key={i+1700}>{ testArray }</View>
      );
    }
    return allArray;
  }

  _checkAnswer() {
    if (this.props.manualAnswer !== "") {
      _.findWhere(this.props.answers, {correct: true}).value === Number(this.props.manualAnswer) ? this.problemSolved() : this.problemNotSolved()
    }
  }

  render() {
    return (
      <View style={styles.field}>
        <View style={styles.formula}>
          <View style={styles.rightSide} onLayout={(event) => this.findDimensions(event)}>
            {this._buildScore(this.props.solved,true)}
          </View>
          <View style={styles.textView}>
            <Text style={styles.text}>
              {this.props.problem.members[0]}
              &nbsp;
              {this.props.problem.operation[0]}
              &nbsp;
              {this.props.problem.members[1]}
            </Text>
          </View>
          <View style={styles.rightSide}>
            {this._buildScore(this.props.missed,false)}
          </View>
        </View>

        <View style={styles.answers}>
          <TouchableHighlight
            key="del"
            style={styles.manualAnswer}
            underlayColor={ _.findWhere(this.props.answers, {correct: true}).value === Number(this.props.manualAnswer) ? "#E2F0DA" : "#FFCCCC"}
            onHideUnderlay={() => this._onHideUnderlay(0)}
            onShowUnderlay={() => this._onShowUnderlay(0)}
            onPress={ () => this._checkAnswer() }>
            <Text style={this.state.pressed[0] ? styles.textDark : styles.text}>
              {this.props.manualAnswer}
            </Text>
          </TouchableHighlight>
          <MyKeyboard {...this.props} />
        </View>
      </View>
    )
  }
};

function mapStateToProps(state){
  return {
    problem: state.problem,
    answers: state.answers,
    seed: state.seed,
    answerInput: state.answerInput,
    solved: state.solved,
    missed: state.missed,
    manualAnswer: state.manualAnswer,
  }
};

export default connect(mapStateToProps)(HomeManual);