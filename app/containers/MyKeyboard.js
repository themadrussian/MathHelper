import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactNative from 'react-native';
const {
  View,
  Text,
  TouchableHighlight,
  // TouchableOpacity,
  StyleSheet,
  // Picker
} = ReactNative;
import _ from 'underscore';
import styles from '../css/stylesMyKeyboard';
import Icon from 'react-native-vector-icons/FontAwesome';

class MyKeyboard extends Component {
  render() {
    return (
      <View style={styles.keyboard}>
        <View style={styles.keyboardRow}>
          <TouchableHighlight
            key="one"
            style={styles.keyboardButton}
            underlayColor={"#E2F0DA"}
            onPress={() => this.props.keyboardButtonPressed("1")}
            >
            <Text style={styles.text}>
              1
            </Text>
          </TouchableHighlight>
          <TouchableHighlight
            key="two"
            style={styles.keyboardButton}
            underlayColor={"#E2F0DA"}
            onPress={() => this.props.keyboardButtonPressed("2")}
            >
            <Text style={styles.text}>
              2
            </Text>
          </TouchableHighlight>
          <TouchableHighlight
            key="3"
            style={styles.keyboardButton}
            underlayColor={"#E2F0DA"}
            onPress={() => this.props.keyboardButtonPressed("3")}
            >
            <Text style={styles.text}>
              3
            </Text>
          </TouchableHighlight>
        </View>
        <View style={styles.keyboardRow}>
          <TouchableHighlight
            key="4"
            style={styles.keyboardButton}
            underlayColor={"#E2F0DA"}
            onPress={() => this.props.keyboardButtonPressed("4")}
            >
            <Text style={styles.text}>
              4
            </Text>
          </TouchableHighlight>
          <TouchableHighlight
            key="5"
            style={styles.keyboardButton}
            underlayColor={"#E2F0DA"}
            onPress={() => this.props.keyboardButtonPressed("5")}
            >
            <Text style={styles.text}>
              5
            </Text>
          </TouchableHighlight>
          <TouchableHighlight
            key="6"
            style={styles.keyboardButton}
            underlayColor={"#E2F0DA"}
            onPress={() => this.props.keyboardButtonPressed("6")}
            >
            <Text style={styles.text}>
              6
            </Text>
          </TouchableHighlight>
        </View>
        <View style={styles.keyboardRow}>
          <TouchableHighlight
            key="7"
            style={styles.keyboardButton}
            underlayColor={"#E2F0DA"}
            onPress={() => this.props.keyboardButtonPressed("7")}
            >
            <Text style={styles.text}>
              7
            </Text>
          </TouchableHighlight>
          <TouchableHighlight
            key="8"
            style={styles.keyboardButton}
            underlayColor={"#E2F0DA"}
            onPress={() => this.props.keyboardButtonPressed("8")}
            >
            <Text style={styles.text}>
              8
            </Text>
          </TouchableHighlight>
          <TouchableHighlight
            key="9"
            style={styles.keyboardButton}
            underlayColor={"#E2F0DA"}
            onPress={() => this.props.keyboardButtonPressed("9")}
            >
            <Text style={styles.text}>
              9
            </Text>
          </TouchableHighlight>
        </View>
        <View style={styles.keyboardRow}>
          <TouchableHighlight
            key="-"
            style={styles.keyboardButton}
            underlayColor={"#E2F0DA"}
            onPress={() => this.props.keyboardButtonPressed("-")}
            >
            <Text style={styles.text}>
              -
            </Text>
          </TouchableHighlight>
          <TouchableHighlight
            key="0"
            style={styles.keyboardButton}
            underlayColor={"#E2F0DA"}
            onPress={() => this.props.keyboardButtonPressed("0")}
            >
            <Text style={styles.text}>
              0
            </Text>
          </TouchableHighlight>
          <TouchableHighlight
            key="del"
            style={styles.keyboardButton}
            underlayColor={"#E2F0DA"}
            onPress={() => this.props.keyboardButtonPressed("d")}
            >
            <Text style={styles.delete}>
              &#x2421;
            </Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }

};

function mapStateToProps(state){
  return {
    missed: state.missed
  }
};

export default connect(mapStateToProps)(MyKeyboard);
