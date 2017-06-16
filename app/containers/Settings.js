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
    } else {
      dadJokeStatus.push(<Text style={styles.smallPrint} key="3buttons">disabled</Text>)
    }

    if (this.props.enableCatFact) {
      catFactStatus.push(<Text style={styles.smallPrint} key="3buttons">enabled</Text>);
    } else {
      catFactStatus.push(<Text style={styles.smallPrint} key="3buttons">disabled</Text>);
    }

    if (this.props.answerInput) {
      answerInput.push(
          <Text style={styles.smallPrint} key="3buttons">3 Buttons</Text>
      );
    } else {
      answerInput.push(
          <Text style={styles.smallPrint} key="rolldown">Rolldown</Text>
      );
    }

    return (
      <View style={styles.settingsTop}>

        {/* <TouchableHighlight onPress={this._fullReset} style={styles.resetButton}>
          <Text style={styles.saveButtonText}>Reset Everthing</Text>
        </TouchableHighlight>
        <View style={styles.settingsBody}>
          <View style={styles.oneSetting}>
            <View style={styles.oneSettingInputArea}>
              <Text style={styles.settingName}>
                Add Complexity Every:
              </Text>
              <TextInput style={styles.settingInput}
                  keyboardType="numeric"
                  placeholder={this.props.levelSteps.toString()}
                  placeholderTextColor="green"
                  maxLength={2}
                  onChangeText={(newLevelSteps) => this.setState({newLevelSteps})}
                />
            </View>
          </View>
          <View style={styles.oneSetting}>
            <View style={styles.oneSettingInputArea}>
              <Text style={styles.settingName}>
                Show Reward Every:
              </Text>
              <TextInput style={styles.settingInput}
                  keyboardType="numeric"
                  placeholder={this.props.rewardFrequency.toString()}
                  placeholderTextColor="green"
                  maxLength={2}
                  onChangeText={(newRewardFrequency) => this.setState({newRewardFrequency})}
                />
            </View>
          </View>
 */}
        <TouchableHighlight
          key="Dad"
          style={!this.props.enableDadJokes ? styles.settingsButton : styles.settingsButtonOff}
          // underlayColor={ answer.correct ? "#E2F0DA" : "#FFCCCC" }
          onPress={() => this.props.dadJokeToggled()}
          // onHideUnderlay={() => this._onHideUnderlay(id)}
          // onShowUnderlay={() => this._onShowUnderlay(id)}
        >
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
          // underlayColor={ answer.correct ? "#E2F0DA" : "#FFCCCC" }
          onPress={() => this.props.catFactToggled()}
          // onHideUnderlay={() => this._onHideUnderlay(id)}
          // onShowUnderlay={() => this._onShowUnderlay(id)}
        >
          <View>
            <Text style={styles.text}>
              <Icon name="paw" size={30} key="reset" />&nbsp;Cat Facts
            </Text>
            {catFactStatus}
          </View>
        </TouchableHighlight>

        <TouchableHighlight
          key="Answer"
          style={styles.settingsButtonOff}
          // underlayColor={ answer.correct ? "#E2F0DA" : "#FFCCCC" }
          onPress={() => this.props.answerInputChanged()}
          // onHideUnderlay={() => this._onHideUnderlay(id)}
          // onShowUnderlay={() => this._onShowUnderlay(id)}
        >
          <View>
            <Text style={styles.text}>
              <Icon name="arrows-alt" size={30} key="reset" />&nbsp;Answer Style
            </Text>
            {answerInput}
          </View>

        </TouchableHighlight>

        <TouchableHighlight
          key="Reset"
          style={styles.settingsButtonOff}
          // underlayColor={ answer.correct ? "#E2F0DA" : "#FFCCCC" }
          onPress={this._fullReset}
          // onHideUnderlay={() => this._onHideUnderlay(id)}
          // onShowUnderlay={() => this._onShowUnderlay(id)}
        >
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
    answerInput: state.answerInput,
    missed: state.missed,
    solved: state.solved,
  }
};

export default connect(mapStateToProps)(Settings);
