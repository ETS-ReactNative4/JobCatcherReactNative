import React from 'react';
import {StyleSheet} from 'react-native';
import {BorderRadiuses, Button, Colors, ListItem, Text, ThemeManager, TouchableOpacity} from 'react-native-ui-lib';
import CustomTag from "./CustomTag";
import moment from "moment/moment";
import * as Animatable from 'react-native-animatable';
import CustomColours from "../constants/CustomColours";
import { withNavigation } from 'react-navigation'

class JobApplicationListItem extends React.PureComponent {

  state = {
    deadlineBackgroundColor: '#ffffff'
  };

  _onPress = () => {
    this.props.navigation.navigate('JobApplicationDetailScreen', {
      jobApplicationID: this.props.item.id,
    });
  };

  daysTill = (days) => {

    switch (days) {
      case 0:
        return 'Today';
      case 1:
        return days + ' day from now';
      default:
        return days + ' days from now';
    }

  };

  setDeadlineTagColor = (days) => {

    if (days === 0) {
      return '#f44336';
    } else if (days === 1 || days === 2 || days === 3) {
      return '#ff9800';
    } else if (days >= 4) {
      return '#8BC34A';
    } else {
      return '#bebebe'
    }

  };

  render() {

    let {jobTitle, companyName, applicationStatus, currentApplicationStage, deadlineDate, todayDateTime} = this.props.item;

    let renderDate = '';
    let dayDiff = 0;
    if (deadlineDate) {
      dayDiff = moment(deadlineDate).diff(todayDateTime, 'days');
      renderDate = dayDiff < 0 ? 'Passed' : this.daysTill(dayDiff);
    }

    return (
      <Animatable.View animation="fadeIn" easing="ease-out-expo"
                       duration={1000} useNativeDriver>
        <ListItem
          activeBackgroundColor={Colors.dark60}
          activeOpacity={0.3}
          onPress={this._onPress}
          containerStyle={[styles.border, {padding: 8}]}>
          <ListItem.Part middle column>
            <ListItem.Part>
              <Text dark10 text70 style={{flex: 1}} numberOfLines={1}>{jobTitle}</Text>
            </ListItem.Part>
            <ListItem.Part>
              <Text style={{flex: 1}} text70 dark40 numberOfLines={1}>{companyName}</Text>
            </ListItem.Part>
            <ListItem.Part containerStyle={{marginTop: 4}}>
              <CustomTag text={currentApplicationStage ? currentApplicationStage : applicationStatus}
                         backgroundColour={CustomColours.colorPrimary}/>
              {!!renderDate &&
              <CustomTag text={renderDate} backgroundColour={this.setDeadlineTagColor(dayDiff)}/>
              }
            </ListItem.Part>
          </ListItem.Part>
        </ListItem>
      </Animatable.View>
    )

  }

}

const styles = StyleSheet.create({
  border: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: ThemeManager.dividerColor
  }
});

export default withNavigation(JobApplicationListItem);
