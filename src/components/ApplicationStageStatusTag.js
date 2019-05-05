import React from 'react';
import {Text, View} from 'react-native-ui-lib';
import {StyleSheet} from 'react-native';
import CustomColours from '../constants/CustomColours';
import {APPLICATION_STAGE_STATUS_ENUM} from "../utils/Constants";

export default class ApplicationStageStatusTag extends React.Component {
  render() {

    let applicationStageStatus = this.props.applicationStageStatus;

    let backgroundColor = CustomColours.colorPrimaryLight;

    switch (applicationStageStatus) {
      case APPLICATION_STAGE_STATUS_ENUM.SUCCESSFUL:
        backgroundColor = CustomColours.applicationStageSuccessful;
        break;
      case APPLICATION_STAGE_STATUS_ENUM.UNSUCCESSFUL:
        backgroundColor = CustomColours.applicationStageUnsuccessful;
        break;
      case APPLICATION_STAGE_STATUS_ENUM.WITHDRAWN:
        backgroundColor = CustomColours.applicationStageWithdrawn;
        break;
    }

    return (
      <View style={[styles.customTag, {backgroundColor: backgroundColor}]}>
        <Text white text80>{applicationStageStatus}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  customTag: {
    marginTop: 8,
    marginBottom: 8,
    marginLeft: -8,
    marginRight: -8,
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 0
  },
});
