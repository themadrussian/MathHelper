import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactNative from 'react-native';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import Icon from 'react-native-vector-icons/FontAwesome';
const {
  View,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Switch
} = ReactNative;
import Modal from 'react-native-modal';
import { levelStepsChanged, settingsToggled } from '../actions/actions';
import styles from '../css/stylesSettings';

class Settings extends Component {

  _fullReset = () => {
    this.props.fullReset();
    this.props.createProblem();
  }

  render() {
    let answerInput = [];
    let dadJokeStatus = [];
    let catFactStatus = [];

    if (this.props.enableDadJokes) {
      dadJokeStatus.push(<Text style={styles.smallPrint} key="3buttons">enabled</Text>)
      // dadJokeStatus.push(<Icon name="check-square-o" size={30} key="reset" />)
    } else {
      dadJokeStatus.push(<Text style={styles.smallPrint} key="3buttons">disabled</Text>)
      // dadJokeStatus.push(<Icon name="square-o" size={30} key="reset" />)
    }

    if (this.props.enableCatFact) {
      catFactStatus.push(<Text style={styles.smallPrint} key="3buttons">enabled</Text>);
    } else {
      catFactStatus.push(<Text style={styles.smallPrint} key="3buttons">disabled</Text>);
    }

    if (this.props.manualKeyboard) {
      answerInput.push(
          <Text style={styles.smallPrint} key="3buttons">Keyboard</Text>
      );
    } else {
      answerInput.push(
          <Text style={styles.smallPrint} key="rolldown">3 Buttons</Text>
      );
    }

    return (
      <View style={styles.settingsTop}>
        <TouchableHighlight
          key="Dad"
          style={ !this.props.enableDadJokes ? styles.settingsButton : styles.settingsButtonOff }
          onPress={() => this.props.dadJokeToggled()}>
          <View>
            <Text style={styles.text}>
              <Icon name="mars" size={30} key="reset" />&nbsp;Dad Jokes
            </Text>
            {dadJokeStatus}
          </View>
        </TouchableHighlight>

        <TouchableHighlight
          key="Cat"
          style={!this.props.enableCatFact ? styles.settingsButton : styles.settingsButtonOff}
          onPress={() => this.props.catFactToggled()}>
          <View>
            <Text style={styles.text}>
              <Icon name="paw" size={30} key="reset" />&nbsp;Cat Facts
            </Text>
            {catFactStatus}
          </View>
        </TouchableHighlight>

        <TouchableHighlight
          key="Answer"
          style={!this.props.manualKeyboard ? styles.settingsButton : styles.settingsButtonOff}
          onPress={() => this.props.manualKeyboardToggled()}>
          <View>
            <Text style={styles.text}>
              <Icon name="arrows-alt" size={30} key="ans_style" />&nbsp;Answer Style
            </Text>
            {answerInput}
          </View>
        </TouchableHighlight>

        <TouchableHighlight
          key="Reset"
          style={styles.settingsButtonOff}
          onPress={this._fullReset}>
          <View>
            <Text style={styles.text}>
              <Icon name="refresh" size={30} key="reset" />&nbsp;Reset All
            </Text>
            <Text style={styles.smallPrint}>
              Solved: {this.props.solved}&nbsp;Missed: {this.props.missed}
            </Text>
          </View>
        </TouchableHighlight>
      </View>
    )
  }
};

function mapStateToProps(state){
  return {
    levelSteps: state.levelSteps,
    rewardFrequency: state.rewardFrequency,
    enableCatFact: state.enableCatFact,
    enableDadJokes: state.enableDadJokes,
    manualKeyboard: state.manualKeyboard,
    missed: state.missed,
    solved: state.solved,
  }
};

export default connect(mapStateToProps)(Settings);
