import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactNative from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
const {
  View,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  StyleSheet,
  // Modal
} = ReactNative;
import Modal from 'react-native-modal';

class ToolBar extends Component {

  _toggleJoke = () => this.props.toggleJoke()

  render() {
    return (
      <View style={styles.toolbar}>
        <View>
          <Text style={styles.text}>
            Level {this.props.seed/10}
          </Text>
        </View>
        <View>
          <Text style={styles.text}>
            <Icon name="thumbs-o-up" color="green" size={20} /> {this.props.solved}
          </Text>
        </View>
        <View>
          <Text style={styles.text}>
            <Icon name="thumbs-o-down" color="red" size={20} /> {this.props.missed}
          </Text>
        </View>
        <Modal isVisible={this.props.dadJokeVisible}>
          <TouchableOpacity onPress={this._toggleJoke} style={styles.modalContent}>
            <Text style={styles.heyGirl}>Time for a {this.props.jokeOrFact ? "dad joke" : "cat fact"}!</Text>
            <Text style={styles.dadJoke}>
              {
                this.props.jokeOrFact ? this.props.dadJoke.joke : this.props.catFact[0]
              }
            </Text>
            <Text style={styles.smallPrint}>
              For more jokes solve more problems!
            </Text>
          </TouchableOpacity>
        </Modal>
        <TouchableOpacity onPress={this._toggleJoke}>
          <Text style={styles.text}>
            <Icon name="smile-o" size={20}/>
          </Text>
        </TouchableOpacity>

      </View>
    )
  }

};

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 6
  },
  toolbar: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  heyGirl: {
    fontSize: 25,
    fontWeight: 'bold',
    color: "green",
  },
  dadJoke: {
    fontSize: 20,
    fontWeight: 'bold',
    color: "darkblue",
    padding: 20,
    textAlign: 'center',
    borderColor: "darkblue",
    borderRadius: 5,
  },
  smallPrint: {
    fontSize: 12,
    fontWeight: 'normal',
    color: "darkgray",
    textAlign: 'center'
  }
});

function mapStateToProps(state){
  return {
    scoreCount: state.scoreCount,
    solved: state.solved,
    missed: state.missed,
    seed: state.seed,
    dadJoke: state.dadJoke,
    dadJokeVisible: state.dadJokeVisible,
    jokeOrFact: state.jokeOrFact,
    catFact: state.catFact
  }
};

export default connect(mapStateToProps)(ToolBar);
