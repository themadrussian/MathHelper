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

class Settings extends Component {
  constructor(props) {
    super(props)
    this.state = {
      newLevelSteps: this.props.levelSteps,
      enableDadJokes: this.props.enableDadJokes,
      enableCatFact: this.props.enableCatFact,
      newRewardFrequency: this.props.rewardFrequency,
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

    this.props.settingsToggled();
  }

  render() {
    return (
      <View style={styles.modalContent}>
        <Text style={styles.settingsHeader}>Settings</Text>
        <View style={styles.settingsBody}>
          <View style={styles.oneSetting}>
            <View style={styles.oneSettingInputArea}>
              <Text style={styles.settingName}>
                Level Length:
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
                Reward Frequency:
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
              Dad Jokes
            </Text>
            <Switch
              onValueChange={(value) => this.setState({enableDadJokes: value})}
              onTintColor="#00ff00"
              value={this.state.enableDadJokes} />
          </View>
          <View style={styles.oneSettingInputArea}>
            <Text style={styles.settingName}>
              Cat Facts
            </Text>
            <Switch
              onValueChange={(value) => this.setState({enableCatFact: value})}
              onTintColor="#00ff00"
              value={this.state.enableCatFact} />
          </View>

        </View>
        <TouchableHighlight onPress={this._savePressed} style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Save!</Text>
        </TouchableHighlight>
      </View>
    )
  }
};

const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: 'white',
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
  settingsHeader: {
    fontSize: 25,
    fontWeight: 'bold',
    color: "blue",
  },
  settingsBody: {
    padding: 5,
  },
  saveButton: {
    margin: 5,
    borderWidth: 1,
    borderColor: "blue",
    borderRadius: 30,
    backgroundColor: "blue",
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch'
  },
  saveButtonText: {
    margin: 4,
    color: "white",
    fontSize: 20,
    fontWeight: 'bold',
  },
  oneSetting: {
    borderWidth: 0
  },
  oneSettingInputArea: {
    flexDirection: "row",
    margin: 5,
    justifyContent: 'space-between'
  },
  settingName: {
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 6
  },
  settingInput: {
    width: 50,
    borderColor: "red",
    borderLeftWidth: 1,
    marginLeft: 15,
    color: "red"
  },
  settingHelp: {
    fontSize: 12,
    fontWeight: 'normal',
    color: "darkgray",
    textAlign: 'center'
  },
});

function mapStateToProps(state){
  return {
    levelSteps: state.levelSteps,
    rewardFrequency: state.rewardFrequency,
    enableCatFact: state.enableCatFact,
    enableDadJokes: state.enableDadJokes,
  }
};

export default connect(mapStateToProps)(Settings);
