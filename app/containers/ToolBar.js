import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactNative from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
const {
  View,
  Text,
  TouchableOpacity,
} = ReactNative;
import Modal from 'react-native-modal';
import Settings from './Settings';
import styles from '../css/stylesToolBar';

class ToolBar extends Component {

  _rewardToggled = () => this.props.showReward(1);

  _settingsToggled = () => this.props.settingsToggled();

  render() {
    // my rewardModal=[];
    let rewardModalHeader = "";
    let rewardModalText   = "";
    let keepModalHidden   = true;

    if (this.props.enableCatFact && this.props.enableDadJokes) {
      rewardModalHeader = this.props.jokeOrFact ? "dad joke" : "cat fact";
      rewardModalText = this.props.jokeOrFact ? this.props.dadJoke.joke : this.props.catFact[0];
      keepModalHidden = false;
    } else {
      if (this.props.enableCatFact && !this.props.enableDadJokes) {
        rewardModalHeader =  "cat fact";
        rewardModalText = this.props.catFact[0];
        keepModalHidden = false;
      } else if (!this.props.enableCatFact && this.props.enableDadJokes) {
        rewardModalHeader =  "dad joke";
        rewardModalText = this.props.dadJoke.joke;
        keepModalHidden = false;
      } else {
        // both are false.
      }
    }

    return (
      <View style={styles.toolbar}>
        <TouchableOpacity onPress={this._rewardToggled}>
          <Text style={styles.text}>
            <Icon name="thumbs-o-up" color="green" size={20} /> {this.props.solved}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={this._settingsToggled}>
          <Text style={styles.text}>
            <Icon name="cog" size={20}/>
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={this._rewardToggled}>
          <Text style={styles.text}>
            <Icon name="thumbs-o-down" color="red" size={20} /> {this.props.missed}
          </Text>
        </TouchableOpacity>

        <Modal isVisible={keepModalHidden ? keepModalHidden : this.props.rewardVisible}>
          <TouchableOpacity onPress={() => this.props.rewardToggled()} style={styles.modalContent}>
            <Text style={styles.modalHeader}>Time for a {rewardModalHeader}!</Text>
            <Text style={styles.rewardBody}>
              {rewardModalText}
            </Text>
            <Text style={styles.smallPrint}>
              For more rewards solve more problems!
            </Text>
          </TouchableOpacity>
        </Modal>

        <Modal
          style={styles.settingsModal}
          isVisible={this.props.settingsVisible}>
          <Settings {...this.props}/>
        </Modal>

      </View>
    )
  }

};

function mapStateToProps(state){
  return {
    // stepsCount: state.stepsCount,
    solved: state.solved,
    missed: state.missed,
    levelSteps: state.levelSteps,
    stepsCount: state.stepsCount,
    dadJoke: state.dadJoke,
    rewardVisible: state.rewardVisible,
    jokeOrFact: state.jokeOrFact,
    catFact: state.catFact,
    settingsVisible: state.settingsVisible,
    enableCatFact: state.enableCatFact,
    enableDadJokes: state.enableDadJokes,
  }
};

export default connect(mapStateToProps)(ToolBar);
