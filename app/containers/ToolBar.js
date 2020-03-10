import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
// import Modal from 'react-native-modal';
// import Settings from './Settings';
import styles from '../css/stylesToolBar';

class ToolBar extends Component {

  _rewardToggled = () => this.props.showReward(1);

  _settingsToggled = () => this.props.settingsToggled();

  render() {
    let toolBarButton = [];

    if (!this.props.settingsVisible) {
      toolBarButton.push(
        <TouchableOpacity onPress={this._settingsToggled} key="bars" style={styles.menuButton}>
          <Text style={styles.bars}>
            <Icon name="bars" size={30} key="menu" />

          </Text>
        </TouchableOpacity>
      );
    } else {
      toolBarButton.push(
        <TouchableOpacity onPress={this._settingsToggled} key="back" style={styles.menuButton}>
          <Text style={styles.bars}>
            <Icon name="chevron-left" size={30} key="back" />

          </Text>
        </TouchableOpacity>
      );
    }

    return (
      <View style={styles.toolbar}>
        {toolBarButton}
      </View>
    )
  }

};

function mapStateToProps(state){
  return {
    settingsVisible: state.settingsVisible,
  }
};

export default connect(mapStateToProps)(ToolBar);
