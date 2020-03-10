import React, { Component } from 'react';
import { connect } from 'react-redux';
import  {
  View,
  ImageBackground,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Text,
} from 'react-native';

// App Containers
import Home from './Home';
import ToolBar from './ToolBar';
import Settings from './Settings';
import styles from '../css/stylesInsideContainer.js';

class InsideContainer extends Component {
  render() {
    // my rewardModal=[];
    let rewardModalHeader = "";
    let rewardModalText   = "";
    let modalVisible   = false;

    // let settingsTitle = [];

    if (this.props.enableCatFact && this.props.enableDadJokes) {
      rewardModalHeader = this.props.jokeOrFact ? "dad joke" : "cat fact";
      rewardModalText = this.props.jokeOrFact ? this.props.dadJoke.joke : this.props.catFact.fact;
      modalVisible = true;
    } else {
      if (this.props.enableCatFact && !this.props.enableDadJokes) {
        rewardModalHeader =  "cat fact";
        rewardModalText = this.props.catFact.fact;
        modalVisible = true;
      } else if (!this.props.enableCatFact && this.props.enableDadJokes) {
        rewardModalHeader =  "dad joke";
        rewardModalText = this.props.dadJoke.joke;
        modalVisible = true;

      } else {
        // both are false.
        modalVisible = true;
      }
    }

    var homeOrSettings = [];
    var modalBox = [];

    if (this.props.settingsVisible) {
      homeOrSettings.push(<Settings {...this.props} key="home"/>);
    } else {
      homeOrSettings.push(<Home {...this.props} key="settings"/>);
    }

    if (this.props.rewardVisible) {
      // console.log("modal text", rewardModalText);
      // console.log("jokeOrFact semaphore:", this.props.jokeOrFact);
      homeOrSettings = (
        <Modal
            style={styles.modal}
            animationType="fade"
            transparent = {false}
            visible={true}>
          <TouchableOpacity onPress={() => this.props.rewardToggled()} style={styles.modalContent}>
            <Text style={styles.modalHeader}>Time for a {rewardModalHeader}!</Text>
            <Text style={styles.rewardBody}>
              {rewardModalText}
            </Text>
            <Text style={styles.smallPrint}>
              Like what you see? Keep solving!
            </Text>
          </TouchableOpacity>
        </Modal>
      )
    }

    return (
      <View style={styles.container} id="InsideContainer">
        <ImageBackground
         source={{ uri: 'https://cdn.pixabay.com/photo/2017/05/11/18/20/cool-2304975_960_720.jpg' }}
         style = {styles.container}>
           <View style={styles.darkenBackground}>
            <ToolBar {...this.props} />
            {homeOrSettings}

          </View>
        </ImageBackground>
      </View>
    )
  }
};

function mapStateToProps(state){
  return {
    settingsVisible: state.settingsVisible,
    dadJoke: state.dadJoke,
    catFact: state.catFact,
    rewardVisible: state.rewardVisible,
    jokeOrFact: state.jokeOrFact,
    enableCatFact: state.enableCatFact,
    enableDadJokes: state.enableDadJokes,

  }
};

export default connect(mapStateToProps)(InsideContainer);
