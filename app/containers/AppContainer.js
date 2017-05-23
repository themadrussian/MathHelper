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
import ToolBar from './ToolBar';
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
        <ToolBar {...this.props} />
        <Home {...this.props} />
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
