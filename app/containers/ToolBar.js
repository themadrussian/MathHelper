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
// import Settings from './Settings';
import styles from '../css/stylesToolBar';

class ToolBar extends Component {

  _rewardToggled = () => this.props.showReward(1);

  _settingsToggled = () => this.props.settingsToggled();

  render() {
    // my rewardModal=[];
    let rewardModalHeader = "";
    let rewardModalText   = "";
    let keepModalHidden   = true;
    let toolBarButton = [];
    // let settingsTitle = [];

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
        keepModalHidden = false;
      }
    }

    if (!this.props.settingsVisible) {
      toolBarButton.push(
        <TouchableOpacity onPress={this._settingsToggled} key="bars" style={styles.menuButton}>
          <Text style={styles.bars}>
            <Icon name="bars" size={20} key="menu" />
          </Text>
        </TouchableOpacity>
      );
    } else {
      toolBarButton.push(
        <TouchableOpacity onPress={this._settingsToggled} key="back" style={styles.menuButton}>
          <Text style={styles.bars}>
            <Icon name="chevron-left" size={20} key="back" />
          </Text>
        </TouchableOpacity>
      );
      // settingsTitle.push(<Text style={styles.settingsTitle} key="title">Settings</Text>);
    }


    return (
      <View style={styles.toolbar}>
        {toolBarButton}

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

      </View>
    )
  }

};

function mapStateToProps(state){
  return {
    dadJoke: state.dadJoke,
    catFact: state.catFact,
    rewardVisible: state.rewardVisible,
    jokeOrFact: state.jokeOrFact,
    enableCatFact: state.enableCatFact,
    enableDadJokes: state.enableDadJokes,
    settingsVisible: state.settingsVisible,
  }
};

export default connect(mapStateToProps)(ToolBar);
