//*************************************
// Usually this container is used for
//    Tabs, Navigation, etc.
// from here inside, start diff pages:
//    Home, Settings, Details, etc.

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import Home from './Home';
import ReactNative from 'react-native';
const {
  View,
  Text,
  StyleSheet
} = ReactNative;
import Icon from 'react-native-vector-icons/FontAwesome';

class AppContainer extends Component {
  componentWillMount(){
    // create the problem before going to <Home>
    this.props.createProblem();
  }

  render() {
    // console.log('====> Top AppContainer.js');
    return (
      <View style={styles.container}>
        <View style={styles.toolbar}>
          <View>
            <Text style={styles.text}>
              <Icon name="thumbs-o-up" color="green" /> {this.props.solved}
            </Text>
          </View>
          <View>
            <Text style={styles.text}>
              <Icon name="cog" size={20}/>
            </Text>
          </View>
          <View>
            <Text style={styles.text}>
              <Icon name="thumbs-o-down" color="red" /> {this.props.missed}
            </Text>
          </View>

        </View>
        <View style={styles.homeouter}>
          <Home {...this.props} />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    backgroundColor: 'lightgrey',
  },
  homeouter: {
    flex: 2
  },
  text: {
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 5
  },
  toolbar: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});

function mapDispatchToProps(dispatch) {
  //this function used to send actions to the entire application
 return bindActionCreators(ActionCreators, dispatch);
};

export default connect((state) => {
  return {
    scoreCount: state.scoreCount,
    solved: state.solved,
    missed: state.missed
  }
}, mapDispatchToProps)(AppContainer);
