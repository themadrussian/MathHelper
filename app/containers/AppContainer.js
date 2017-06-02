//React & React-Native libs
import React, { Component } from 'react';
import ReactNative from 'react-native';
const { View, StyleSheet } = ReactNative;

//Redux libs
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// My actions
import { ActionCreators } from '../actions';

// Containers
import Home from './Home';
import ToolBar from './ToolBar';

// Define top level Container
class AppContainer extends Component {
  componentWillMount(){
    // create the problem before going to <Home>
    this.props.createProblem();
  }

  render() {
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
    marginTop: 20, // keep the app below the signal/battery bar on the phone
  },
});

//this function makes action fucntion available for the entire app
function mapDispatchToProps(dispatch) {
 return bindActionCreators(ActionCreators, dispatch);
};

// and now connect it all together. plus, create an empty state object.
//                     empty state object,      mapping actions for app
export default connect((state) => {return {} }, mapDispatchToProps)(AppContainer);
