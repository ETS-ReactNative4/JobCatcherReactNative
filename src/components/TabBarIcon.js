import React from 'react';
import CustomColours from '../constants/CustomColours';
import Icon from 'react-native-ionicons'

export default class TabBarIcon extends React.Component {
  render() {
    return (
      <Icon
        name={this.props.name}
        size={26}
        style={{marginBottom: -3}}
        color={this.props.focused ? CustomColours.tabIconSelected : CustomColours.tabIconDefault}
      />
    );
  }
}
