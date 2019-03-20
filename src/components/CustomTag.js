import React from 'react';
import {Colors, Text, View} from 'react-native-ui-lib';
import {StyleSheet} from 'react-native';

export default class CustomTag extends React.Component {
  render() {
    return (
      <View style={[styles.customTag, {backgroundColor: this.props.backgroundColour}]}>
        <Text white text90>{this.props.text}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  customTag: {
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 3,
  },
});
