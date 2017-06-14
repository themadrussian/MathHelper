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

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selected1: this.props.seed,
      maxBoxes: 5,
      pressed: [false,false,false],
      subtractCoefficientSolved: 0,
      subtractCoefficientMissed: 0
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
    });
  }

  render() {
    var myAnswers = [];
    var mySolved = [];
    var myMissed = [];
    var myBoxColumnSolved = [];
    var myBoxColumnMissed = [];
    var solvedColumns = Math.floor(this.state.maxBoxes / this.props.solved);
    var missedColumns = Math.floor(this.state.maxBoxes / this.props.missed);
    var solvedMinus = 0;
    var missedMinus = 0;

    if (this.props.answerInput) {
      // true, 3 Choice answers
      this.props.answers.forEach( (answer, id) => {
        myAnswers.push(
          <TouchableHighlight
            key={id}
            style={styles.answer_button}
            underlayColor={ answer.correct ? "#E2F0DA" : "#FFCCCC" }
            onPress={answer.correct ? () => this.problemSolved() : () => this.problemNotSolved()}
            onHideUnderlay={() => this._onHideUnderlay(id)}
            onShowUnderlay={() => this._onShowUnderlay(id)}
          >
            <Text style={this.state.pressed[id] ? styles.textDark : styles.text}>{answer.value}</Text>
          </TouchableHighlight>
        );
      })
    } else {
      // false, Rolldown
      var pickerItems = [];

      for (var i = 1; i <= this.props.seed*2; i++) {
        pickerItems.push(<Picker.Item label={i.toString()} value={i.toString()} key={i.toString()} />);
      };

      myAnswers.push(
        <View key="mainview" style={styles.pickerBigView}>
          <Picker style={styles.picker}
            itemStyle={styles.itemStyle}
            key="rrr"
            selectedValue={this.state.selected1.toString()}
            onValueChange={(selected1) => this.setState({selected1})}
          >
            {pickerItems}
          </Picker>
          <TouchableOpacity
            key="ok"
            style={styles.pickerOkButton}
            onPress={ _.findWhere(this.props.answers, {correct: true}).value == this.state.selected1 ? () => this.problemSolved() : () => this.problemNotSolved() }
          >
            <Text style={styles.pickerOkButtonText}>OK</Text>
          </TouchableOpacity>
        </View>
      );
    }

    // more boxes for solved
    if ( this.props.solved > this.state.maxBoxes ) {
      console.log("===> number of solved coumns: ", Math.floor(this.props.solved/(this.state.maxBoxes)));
      for (var i = 1; i <= this.state.maxBoxes; i++) {
        myBoxColumnSolved.push(
          <View style={styles.redBox} key={(i+300).toString()} />
        )
      }
      // this.setState({subtractCoefficientSolved: 1});
      solvedMinus = 1;
    }

    if ( this.props.missed > this.state.maxBoxes ) {
      console.log("===> number of missed coumns: ", Math.floor(this.props.missed/(this.state.maxBoxes)));
      for (var i = 1; i <= this.state.maxBoxes; i++) {
        myBoxColumnMissed.push(
          <View style={styles.redBox} key={(i+300).toString()} />
        )
      }
      // this.setState({subtractCoefficientMissed: 1});
      missedMinus = 1;
    }

    for (var i = 1; i <= (this.props.solved - this.state.maxBoxes*solvedMinus); i++) {
      if (i === 1) {
        mySolved.push(
            <View style={styles.greenBoxFirst} key={(i+100).toString()} />
        )
      } else {
        mySolved.push(
          <View style={styles.redBox} key={(i+100).toString()} />
        )
      }
    }

    for (var i = 1; i <= (this.props.missed - this.state.maxBoxes*missedMinus); i++) {
      if (i === 1) {
        myMissed.push(
          <View style={styles.redBoxFirst} key={(i+200).toString()} />
        )
      } else {
        myMissed.push(
          <View style={styles.redBox} key={(i+200).toString()} />
        )
      }
    }



    return (
      <View style={styles.field}>
        <View style={styles.formula}>
          <View style={styles.side} onLayout={(event) => this.findDimensions(event)}>
            <View>{ myBoxColumnSolved }</View>
            <View>{mySolved}</View>
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
          <View style={styles.side}>
            <View>{myMissed}</View>
            <View>{myBoxColumnMissed}</View>
          </View>
        </View>

        <View style={styles.answers}>
            {myAnswers}
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
    missed: state.missed
  }
};

export default connect(mapStateToProps)(Home);
