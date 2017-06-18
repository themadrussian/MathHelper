//React & React-Native libs
import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactNative from 'react-native';
const {
  View,
  Image,
  StyleSheet,
} = ReactNative;

// App Containers
import Home from './Home';
import ToolBar from './ToolBar';
import Settings from './Settings';
import HomeManual from './HomeManual';

class InsideContainer extends Component {
  render() {
    var homeOrSettings = [];

    if (this.props.settingsVisible) {
      homeOrSettings.push(<Settings {...this.props} key="settings"/>);
    } else {
      if (this.props.manualKeyboard) {
        homeOrSettings.push(<HomeManual {...this.props} key="home"/>);
      } else {
        homeOrSettings.push(<Home {...this.props} key="home"/>);
      }
    }

    return (
      <View>
        <Image
          style={styles.image}
          // source={{ uri: 'https://cdn.pixabay.com/photo/2017/05/11/18/20/cool-2304975_960_720.jpg' }}
          source={require('../img/background-darker.jpg')}
          >
          <View style={styles.container}>
            <ToolBar {...this.props} />
            {homeOrSettings}
          </View>
        </Image>
      </View>
    )
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20, // keep the app below the signal/battery bar on the phone
  },
  image: {
    width: '100%',
    height: '100%',
  }
});

function mapStateToProps(state){
  return {
    settingsVisible: state.settingsVisible,
    manualKeyboard: state.manualKeyboard,
  }
};

export default connect(mapStateToProps)(InsideContainer);
