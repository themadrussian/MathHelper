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
  constructor(props) {
    super(props)
    this.state = {
      newLevelSteps: this.props.levelSteps,
      enableDadJokes: this.props.enableDadJokes,
      enableCatFact: this.props.enableCatFact,
      newRewardFrequency: this.props.rewardFrequency,
      answerInput: this.props.answerInput,
    }
  }

  _savePressed = () => {
    if (this.props.levelSteps != Math.abs(this.state.newLevelSteps)) {
      this.props.levelStepsChanged(Math.abs(this.state.newLevelSteps));
    };
    if (this.props.rewardFrequency != Math.abs(this.state.newRewardFrequency)) {
      this.props.rewardFrequencyChanged(Math.abs(this.state.newRewardFrequency));
    };
    if (this.props.enableCatFact !== this.state.enableCatFact) {
      this.props.catFactToggled();
    }
    if (this.props.enableDadJokes !== this.state.enableDadJokes) {
      this.props.dadJokeToggled();
    }
    if (this.props.answerInput !== this.state.answerInput){
      this.props.answerInputChanged();
    }

    this.props.settingsToggled();
  }

  _fullReset = () => {
    this.props.fullReset();
    this.props.createProblem();
  }

  render() {
    let answerInput = [];

    if (this.props.answerInput) {
      answerInput.push(
          <Text style={styles.text} key="3buttons">3 Buttons</Text>
      );
    } else {
      answerInput.push(
          <Text style={styles.text} key="rolldown">Rolldown</Text>
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
          <View style={styles.oneSettingInputArea}>
            <Text style={styles.settingName}>
              {this.state.answerInput ? "3 Choice Answers" : "Rolldown Answer Pick"}
            </Text>
            <Switch
              onValueChange={(value) => this.setState({answerInput: value})}
              onTintColor="#00ff00"
              // tintColor="#0000ff"
              value={this.state.answerInput} />
          </View> */}
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
          key="Dad"
          style={this.props.enableDadJokes ? styles.settingsButton : styles.settingsButtonOff}
          // underlayColor={ answer.correct ? "#E2F0DA" : "#FFCCCC" }
          onPress={() => this.props.dadJokeToggled()}
          // onHideUnderlay={() => this._onHideUnderlay(id)}
          // onShowUnderlay={() => this._onShowUnderlay(id)}
        >
          <Text style={styles.text}><Icon name="mars" size={30} key="reset" />&nbsp;Dad Facts</Text>
        </TouchableHighlight>

        <TouchableHighlight
          key="Cat"
          style={this.props.enableCatFact ? styles.settingsButton : styles.settingsButtonOff}
          // underlayColor={ answer.correct ? "#E2F0DA" : "#FFCCCC" }
          onPress={() => this.props.catFactToggled()}
          // onHideUnderlay={() => this._onHideUnderlay(id)}
          // onShowUnderlay={() => this._onShowUnderlay(id)}
        >
          <Text style={styles.text}><Icon name="paw" size={30} key="reset" />&nbsp;Cat Facts</Text>
        </TouchableHighlight>

        <TouchableHighlight
          key="Reset"
          style={styles.settingsButtonOff}
          // underlayColor={ answer.correct ? "#E2F0DA" : "#FFCCCC" }
          onPress={this._fullReset}
          // onHideUnderlay={() => this._onHideUnderlay(id)}
          // onShowUnderlay={() => this._onShowUnderlay(id)}
        >
          <Text style={styles.text}><Icon name="refresh" size={30} key="reset" />&nbsp;Reset All</Text>
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
  }
};

export default connect(mapStateToProps)(Settings);
