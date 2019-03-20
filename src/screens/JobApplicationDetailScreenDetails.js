import React, {Fragment} from 'react';
import CustomColours from '../constants/CustomColours';
import {Alert, StyleSheet, View} from "react-native";
import {Button, Colors, ListItem, Text} from 'react-native-ui-lib';
import Icon from 'react-native-ionicons'
import * as Animatable from 'react-native-animatable';

class JobApplicationDetailScreenProgress extends React.Component {
  render() {

    let jobApplication = this.props.jobApplication;

    return (
      <Fragment>
        <Animatable.View animation="fadeIn" easing="ease-out-expo"
                         duration={1000} useNativeDriver>
          <ListItem
            activeBackgroundColor={Colors.dark60}
            activeOpacity={0.3}
            onPress={() => {
              Alert.alert('Location', 'Add Location here.');
            }}
            containerStyle={{padding: 8}}>
            <ListItem.Part left style={styles.image}>
              <Icon
                name='pin'
                size={26}
                color={CustomColours.colorPrimary}
              />
            </ListItem.Part>
            <ListItem.Part middle column>
              <ListItem.Part>
                <Text dark10 text70 numberOfLines={1}>{jobApplication.locationName}</Text>
              </ListItem.Part>
              <ListItem.Part>
                <Text text70 dark40 numberOfLines={1}>x miles from you.</Text>
              </ListItem.Part>
            </ListItem.Part>
          </ListItem>
        </Animatable.View>

        <View style={{marginTop: 8, marginRight: 8, marginLeft: 8}}>
          <Text dark10 text70>Wages/Salary</Text>
          <Text dark40
                text70>{jobApplication.wageCurrency}{jobApplication.wageAmount} {jobApplication.wageFrequency}</Text>
        </View>
        <View style={{marginTop: 8, marginRight: 8, marginLeft: 8}}>
          <Text dark10 text70>Job Type</Text>
          <Text dark40
                text70>{jobApplication.contractType}{jobApplication.contractTime} ({jobApplication.jobHours})</Text>
        </View>
        <View style={{marginTop: 8, marginRight: 8, marginLeft: 8}}>
          <Text dark10 text70>Link to Job Advert</Text>
          <Text dark40
                text70>{jobApplication.jobAdvertURL}</Text>
        </View>
        <View style={{marginTop: 8, marginRight: 8, marginLeft: 8}}>
          <Text dark10 text70>Job Reference</Text>
          <Text dark40
                text70>{jobApplication.jobReference}</Text>
        </View>
        <View style={{marginTop: 8, marginRight: 8, marginLeft: 8}}>
          <Text dark10 text70>Job Description</Text>
          <Text dark40
                text70>{jobApplication.jobDescription}</Text>
        </View>
        <View style={{marginTop: 8, marginRight: 8, marginLeft: 8}}>
          <Text dark10 text70>Notes</Text>
          <Text dark40
                text70>{jobApplication.applicationNotes}</Text>
        </View>
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    marginRight: 16,
    marginLeft: 8,
    alignItems: 'center',
    justifyContent: 'center'
  },
});

export default JobApplicationDetailScreenProgress
