import React, {Fragment} from 'react';
import CustomColours from '../constants/CustomColours';
import {Alert, StyleSheet, View} from "react-native";
import {Button, Card, Text} from 'react-native-ui-lib';
import Icon from 'react-native-ionicons'
import moment from "moment/moment";
import HorizontalRule from "../components/HorizontalRule";

class JobApplicationDetailScreenProgress extends React.Component {
  render() {

    let jobApplication = this.props.jobApplication;

    let displayDateCurrentApplicationStageDateStarted = moment(jobApplication.currentApplicationStageDateStarted).format('DD MMM YY');
    let displayDateCurrentApplicationStageDateCompleted = '-';
    if (jobApplication.currentApplicationStageDateCompleted) {
      displayDateCurrentApplicationStageDateCompleted = moment(jobApplication.currentApplicationStageDateCompleted).format('DD MMM YY');
    }
    let displayDateCurrentApplicationStageNotes = '-';
    if (jobApplication.currentApplicationStageNotes) {
      displayDateCurrentApplicationStageNotes = jobApplication.currentApplicationStageNotes;
    }

    return (
      <View style={{margin: 8}}>
        {jobApplication.applicationStatus === 'Wishlist' ?
          <Fragment>
            <View
              style={{alignItems: 'center', justifyContent: 'center'}}
              onPress={() => {
              }}>
              <Text text70 dark10>
                {jobApplication.applicationStatus}
              </Text>
            </View>
            <Button
              backgroundColor={CustomColours.colorPrimary}
              color={CustomColours.colorOnPrimary}
              label="Start Application"
              labelStyle={{fontWeight: '600'}}
              style={{marginTop: 8, borderRadius: 3}}
              onPress={() => {
                Alert.alert('New Application Stage', 'Add First Application Stage here.');
              }}
            />
          </Fragment> :
          <Fragment>
            <Card style={styles.card} onPress={() => {
            }}>
              <View style={{margin: 16}}>
                <Text text60 dark10>
                  {jobApplication.currentApplicationStage}
                </Text>
                <View style={styles.customTag}>
                  <Text white text90>{jobApplication.currentApplicationStageStatus}</Text>
                </View>
                <View style={{flexDirection: "row"}}>
                  <View style={{flex: 1}}>
                    <Text text70 dark40>
                      Date Started
                    </Text>
                    <Text text70 dark40>
                      {displayDateCurrentApplicationStageDateStarted}
                    </Text>
                  </View>
                  <View style={{flex: 1}}>
                    <Text text70 dark40>
                      Date Completed
                    </Text>
                    <Text text70 dark40>
                      {displayDateCurrentApplicationStageDateCompleted}
                    </Text>
                  </View>
                </View>
                <HorizontalRule/>
                <View>
                  <Text text70 dark40>
                    Notes
                  </Text>
                  <Text text70 dark40>
                    {displayDateCurrentApplicationStageNotes}
                  </Text>
                </View>
                <HorizontalRule/>
                <Button
                  backgroundColor={CustomColours.colorPrimary}
                  color={CustomColours.colorOnPrimary}
                  label='Set Deadline'
                  labelStyle={{fontWeight: '600'}}
                  style={{marginTop: 8, borderRadius: 3}}
                  iconSource={() => <Icon name='calendar' color={CustomColours.colorOnPrimary}
                                          style={{marginRight: 8}}/>}
                  onPress={() => {
                    Alert.alert('Set Deadline', 'Set a Deadline here.');
                  }}
                />

                <Button
                  outline
                  color={CustomColours.colorPrimary}
                  label='Add Reminder(s)'
                  labelStyle={{fontWeight: '600'}}
                  style={{marginTop: 8, borderRadius: 3}}
                  iconSource={() => <Icon name='alarm' color={CustomColours.colorPrimary} style={{marginRight: 8}}/>}
                  onPress={() => {
                    Alert.alert('Set Reminder(s)', 'Set a Deadline here.');
                  }}
                />

              </View>
            </Card>

            <View style={{marginRight: 16, marginLeft: 16}}>

              <Button
                backgroundColor={CustomColours.colorPrimary}
                color={CustomColours.colorOnPrimary}
                label='Add Stage'
                labelStyle={{fontWeight: '600'}}
                style={{marginTop: 8, borderRadius: 3}}
                iconSource={() => <Icon name='add' color={CustomColours.colorOnPrimary} style={{marginRight: 8}}/>}
                onPress={() => {
                  Alert.alert('Set Deadline', 'Set a Deadline here.');
                }}
              />

              <Button
                backgroundColor={CustomColours.colorPrimary}
                color={CustomColours.colorOnPrimary}
                label='View History'
                labelStyle={{fontWeight: '600'}}
                style={{marginTop: 8, borderRadius: 3}}
                iconSource={() => <Icon name='archive' color={CustomColours.colorOnPrimary} style={{marginRight: 8}}/>}
                onPress={() => {
                  Alert.alert('Set Deadline', 'Set a Deadline here.');
                }}
              />
            </View>
          </Fragment>
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    margin: 8
  },
  customTag: {
    marginTop: 8,
    marginBottom: 8,
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderRadius: 3,
    backgroundColor: CustomColours.colorPrimary
  },
});

export default JobApplicationDetailScreenProgress
