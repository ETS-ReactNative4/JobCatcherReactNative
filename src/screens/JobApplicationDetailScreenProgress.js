import React, {Fragment} from 'react';
import CustomColours from '../constants/CustomColours';
import {Alert, StyleSheet, View} from "react-native";
import {ActionSheet, Button, Colors, ListItem, Text} from 'react-native-ui-lib';
import Icon from 'react-native-ionicons'
import moment from "moment/moment";
import HorizontalRule from "../components/HorizontalRule";
import ApplicationStageStatusTag from '../components/ApplicationStageStatusTag'
import firebase from "react-native-firebase";
import {
  APPLICATION_STAGE_ENUM,
  APPLICATION_STAGE_STATUS_ENUM,
  APPLICATION_STATUS_ENUM,
  FIREBASE_PATH
} from "../utils/Constants";
import {SET_APPLICATION_STATUS} from "../utils/ApplicationStageStatusMapper";

class JobApplicationDetailScreenProgress extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showActionSheet: false,
      canClose: false,
      applicationStatus: this.props.jobApplication.applicationStatus,
      currentApplicationStage: this.props.jobApplication.currentApplicationStage,
      currentApplicationStageStatus: this.props.jobApplication.currentApplicationStageStatus,
      currentApplicationStageDateStarted: this.props.jobApplication.currentApplicationStageDateStarted,
      currentApplicationStageDateCompleted: this.props.jobApplication.currentApplicationStageDateCompleted,
      currentApplicationStageDateUpdated: this.props.jobApplication.currentApplicationStageDateUpdated,
      currentApplicationStageNotes: this.props.jobApplication.currentApplicationStageNotes
    };

  }

  startJobApplication = () => {

    const UID = firebase.auth().currentUser.uid;
    const updateRef = firebase.firestore().collection(FIREBASE_PATH.JOB_APPLICATIONS_ROOT).doc(UID)
      .collection(FIREBASE_PATH.JOB_APPLICATION_LIST).doc(this.props.jobApplication.id);

    updateRef.update({
      applicationStatus: APPLICATION_STATUS_ENUM.IN_PROGRESS,
      currentApplicationStage: APPLICATION_STAGE_ENUM.APPLICATION_FORM_CV,
      currentApplicationStageStatus: APPLICATION_STAGE_STATUS_ENUM.IN_PROGRESS,
      currentApplicationStageDateStarted: moment().valueOf(),
      currentApplicationStageDateUpdated: moment().valueOf(),
      timestampLastUpdated: firebase.firestore.FieldValue.serverTimestamp()
    }).then(() => {
      this.setState({
        applicationStatus: APPLICATION_STATUS_ENUM.IN_PROGRESS,
        currentApplicationStage: APPLICATION_STAGE_ENUM.APPLICATION_FORM_CV,
        currentApplicationStageStatus: APPLICATION_STAGE_STATUS_ENUM.IN_PROGRESS,
        currentApplicationStageDateStarted: moment().valueOf(),
        currentApplicationStageDateUpdated: moment().valueOf(),
      });
    });

  };

  updateCurrentApplicationStageStatus = (currentApplicationStageStatus) => {

    let applicationStatus = SET_APPLICATION_STATUS(this.state.currentApplicationStage, currentApplicationStageStatus);

    const UID = firebase.auth().currentUser.uid;
    const updateRef = firebase.firestore().collection(FIREBASE_PATH.JOB_APPLICATIONS_ROOT).doc(UID)
      .collection(FIREBASE_PATH.JOB_APPLICATION_LIST).doc(this.props.jobApplication.id);

    updateRef.update({
      currentApplicationStageStatus: currentApplicationStageStatus,
      currentApplicationStageDateCompleted: moment().valueOf(),
      applicationStatus: applicationStatus,
      currentApplicationStageDateUpdated: moment().valueOf(),
      timestampLastUpdated: firebase.firestore.FieldValue.serverTimestamp()
    }).then(() => {
      this.setState({
        currentApplicationStageStatus: currentApplicationStageStatus,
        currentApplicationStageDateCompleted: moment().valueOf(),
        applicationStatus: applicationStatus,
        currentApplicationStageDateUpdated: moment().valueOf(),
      });

    }).catch((error) => {
      console.log("Error updating Job Application: ", error);
    });

  };

  render() {

    let {applicationStatus, currentApplicationStage, currentApplicationStageStatus, currentApplicationStageDateStarted, currentApplicationStageDateCompleted, currentApplicationStageNotes, showActionSheet} = this.state;
    let displayDateCurrentApplicationStageDateStarted = moment(currentApplicationStageDateStarted).format('DD MMM YY');
    let displayDateCurrentApplicationStageDateCompleted = '-';
    if (currentApplicationStageDateCompleted) {
      displayDateCurrentApplicationStageDateCompleted = moment(currentApplicationStageDateCompleted).format('DD MMM YY');
    }

    return (
      <View>
        {applicationStatus === 'Wishlist' ?
          <Fragment>
            <View style={{margin: 8}}>
              <View
                style={{alignItems: 'center', justifyContent: 'center'}}
                onPress={() => {
                }}>
                <Text text70 dark10>
                  Wishlist
                </Text>
              </View>
              <Button
                backgroundColor={CustomColours.colorPrimary}
                color={CustomColours.colorOnPrimary}
                label="Start Application"
                labelStyle={{fontWeight: '600'}}
                style={{marginTop: 8, borderRadius: 3}}
                onPress={() => {
                  this.startJobApplication();
                }}
              />
            </View>
          </Fragment> :
          <Fragment>
            <View style={{margin: 8}}>
              <View style={{marginTop: 8, marginBottom: 8}}>
                <Text text80 dark10>
                  Current Stage:
                </Text>
                <Text text50 dark10>
                  {currentApplicationStage}
                </Text>
              </View>
              <ApplicationStageStatusTag applicationStageStatus={currentApplicationStageStatus}/>
              <View style={{margin: 8}}>
                <View style={{flexDirection: "row"}}>
                  <View style={{flex: 1}}>
                    <Text text70 dark10>
                      Date Started
                    </Text>
                    <Text text70 dark40>
                      {displayDateCurrentApplicationStageDateStarted}
                    </Text>
                  </View>
                  <View style={{flex: 1}}>
                    <Text text70 dark10>
                      Date Completed
                    </Text>
                    <Text text70 dark40>
                      {displayDateCurrentApplicationStageDateCompleted}
                    </Text>
                  </View>
                </View>
                <HorizontalRule style={{marginTop: 16, marginBottom: 16}}/>
                {(currentApplicationStageNotes === '') ?
                  <ListItem
                    activeBackgroundColor={Colors.dark60}
                    activeOpacity={0.3}
                    onPress={() => {
                      Alert.alert('Add Stage Notes', 'Add Stage Notes');
                    }}
                    containerStyle={{padding: 8}}
                    height={40}>
                    <ListItem.Part left style={styles.image}>
                      <Icon
                        name='add'
                        size={26}
                        color={CustomColours.dark40}
                      />
                    </ListItem.Part>
                    <ListItem.Part middle column>
                      <Text dark40 text70>Add Application Stage Notes</Text>
                    </ListItem.Part>
                  </ListItem> :
                  <View style={{marginTop: 8, marginRight: 8, marginLeft: 8}}>
                    <Text dark10 text70>Application Stage Notes</Text>
                    <Text dark40
                          text70>{currentApplicationStageNotes}</Text>
                  </View>
                }

                <HorizontalRule/>

                {currentApplicationStageStatus === APPLICATION_STAGE_STATUS_ENUM.IN_PROGRESS &&
                <Button
                  backgroundColor={CustomColours.colorPrimary}
                  color={CustomColours.colorOnPrimary}
                  label='Mark Stage as Completed'
                  labelStyle={{fontWeight: '600'}}
                  style={{marginTop: 8, borderRadius: 3}}
                  iconSource={() => <Icon name='check' color={CustomColours.colorOnPrimary}
                                          style={{marginRight: 8}}/>}
                  onPress={() => {
                    this.setState({showActionSheet: true})
                  }}
                />}


                <ActionSheet
                  title='Application Stage Status'
                  message='Message of action sheet'
                  useNativeIOS={false}
                  options={[
                    {
                      label: APPLICATION_STAGE_STATUS_ENUM.SUCCESSFUL, onPress: () => {
                        //TODO: Add code to confirm change of currentApplicationStageStatus / stageCompleted
                        //This way it doesn't matter if user dismisses actionsheet without selecting an option
                        this.setState({
                          currentApplicationStageStatus: APPLICATION_STAGE_STATUS_ENUM.SUCCESSFUL,
                          currentApplicationStageCompleted: true
                        }, () => this.updateCurrentApplicationStageStatus(APPLICATION_STAGE_STATUS_ENUM.SUCCESSFUL));
                      }
                    },
                    {
                      label: APPLICATION_STAGE_STATUS_ENUM.UNSUCCESSFUL, onPress: () => {
                        this.setState({
                          currentApplicationStageStatus: APPLICATION_STAGE_STATUS_ENUM.UNSUCCESSFUL,
                          currentApplicationStageCompleted: true
                        }, () => this.updateCurrentApplicationStageStatus(APPLICATION_STAGE_STATUS_ENUM.UNSUCCESSFUL));
                      }
                    },
                    {
                      label: APPLICATION_STAGE_STATUS_ENUM.WITHDRAWN, onPress: () => {
                        this.setState({
                          currentApplicationStageStatus: APPLICATION_STAGE_STATUS_ENUM.WITHDRAWN,
                          currentApplicationStageCompleted: true
                        }, () => this.updateCurrentApplicationStageStatus(APPLICATION_STAGE_STATUS_ENUM.WITHDRAWN));
                      }
                    },
                  ]}
                  visible={showActionSheet}
                  onDismiss={() => {
                    this.setState({showActionSheet: false})
                  }}
                />

              </View>

              <View>

                {currentApplicationStageStatus === APPLICATION_STAGE_STATUS_ENUM.IN_PROGRESS &&
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
                />}

                {/*<Button
                  outline
                  color={CustomColours.colorPrimary}
                  label='Add Reminder(s)'
                  labelStyle={{ fontWeight: '600' }}
                  style={{ marginTop: 8, borderRadius: 3 }}
                  iconSource={() => <Icon name='alarm' color={CustomColours.colorPrimary} style={{ marginRight: 8 }} />}
                  onPress={() => {
                    Alert.alert('Set Reminder(s)', 'Set a Deadline here.');
                  }}
                />*/}

                {currentApplicationStageStatus === APPLICATION_STAGE_STATUS_ENUM.IN_PROGRESS &&
                <Button
                  backgroundColor={CustomColours.colorPrimary}
                  color={CustomColours.colorOnPrimary}
                  label='Add Next Stage'
                  labelStyle={{fontWeight: '600'}}
                  style={{marginTop: 8, borderRadius: 3}}
                  iconSource={() => <Icon name='add' color={CustomColours.colorOnPrimary} style={{marginRight: 8}}/>}
                  onPress={() => {
                    Alert.alert('Set Deadline', 'Set a Deadline here.');
                  }}
                />
                }

                <Button
                  backgroundColor={CustomColours.colorPrimary}
                  color={CustomColours.colorOnPrimary}
                  label='View History'
                  labelStyle={{fontWeight: '600'}}
                  style={{marginTop: 8, borderRadius: 3}}
                  iconSource={() => <Icon name='archive' color={CustomColours.colorOnPrimary}
                                          style={{marginRight: 8}}/>}
                  onPress={() => {
                    Alert.alert('Set Deadline', 'Set a Deadline here.');
                  }}
                />
              </View>
            </View>
          </Fragment>
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    marginRight: 16,
    marginLeft: 8,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default JobApplicationDetailScreenProgress
