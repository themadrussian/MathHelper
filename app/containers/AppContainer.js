//React & React-Native libs
import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';

//Redux libs
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// My actions
import { ActionCreators } from '../actions';

// Containers
import InsideContainer from './InsideContainer';

// Define top level Container
class AppContainer extends Component {
  render() {
    this.props.createProblem();
    return (
      <View id="AppContainer" style={styles.container}>
        <InsideContainer {...this.props}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
   },

});

//this function makes action fucntion available for the entire app
function mapDispatchToProps(dispatch) {
 return bindActionCreators(ActionCreators, dispatch);
};

// and now connect it all together. plus, create an empty state object.
//                     empty state object,      mapping actions for app
export default connect((state) => {return {} }, mapDispatchToProps)(AppContainer);
