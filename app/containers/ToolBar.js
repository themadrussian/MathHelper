import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactNative from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
const {
  View,
  Text,
  TouchableHighlight,
  StyleSheet
} = ReactNative;

class ToolBar extends Component {
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
        <View>
          <Text style={styles.text}>
            <Icon name="cog" size={20}/>
          </Text>
        </View>
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
  }
});

function mapStateToProps(state){
  return {
    scoreCount: state.scoreCount,
    solved: state.solved,
    missed: state.missed,
    seed: state.seed
  }
};

export default connect(mapStateToProps)(ToolBar);
