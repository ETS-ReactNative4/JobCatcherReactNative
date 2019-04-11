import React, {Fragment} from 'react';
import {View} from 'react-native-ui-lib';
import {Fab} from 'native-base'
import JobApplicationList from './JobApplicationList'

import {default as Ionicon} from 'react-native-ionicons'
import firebase from 'react-native-firebase';
import {FIREBASE_PATH} from "../utils/Constants";
import moment from "moment/moment";

class JobApplicationListScreen extends React.Component {
  static navigationOptions = {
    title: 'Job Applications',
    headerRight: (
      <Ionicon
        name='funnel'
        color='#ffffff'
        style={{marginRight: 8}}
        size={20}
        onPress={() => {
          firebase.auth().signOut().then(() => {
            this.props.navigation.navigate('SignInScreen', {
              screenFrom: 'JobApplicationListScreen'
            })
          })
            .catch((error) => {
              alert('error', error)

            });
        }}
      />
    )
  };

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      jobApplications: [],
      todayDateTime: moment().startOf('day')
    };
    this.getJobApplications();
  }

  componentDidUpdate(previousProps) {
    console.log('previousProps', previousProps.isFocused ? 'Focused' : 'Not focused');
    if (!previousProps.isFocused && this.props.isFocused) {
      this.getJobApplications();
    }
  }

  getJobApplications = () => {

    const UID = firebase.auth().currentUser.uid;

    firebase.firestore()
      .collection(FIREBASE_PATH.JOB_APPLICATIONS_ROOT)
      .doc(UID)
      .collection(FIREBASE_PATH.JOB_APPLICATION_LIST)
      .orderBy('timestampCreated', 'asc')
      .get()
      .then(querySnapshot => {
        let jobApplications = [];

        querySnapshot.forEach(doc => {
          let docData = doc.data();

          let jobApplication = {
            id: doc.id,
            key: doc.id,
            uid: docData.uid,
            jobTitle: docData.jobTitle,
            companyName: docData.companyName,
            applicationStatus: docData.applicationStatus,
            currentApplicationStage: docData.currentApplicationStage,
            isDeadlineSet: docData.isDeadlineSet,
            deadlineDate: docData.deadlineDate,
            todayDateTime: this.state.todayDateTime
          };

          jobApplications = [jobApplication].concat(jobApplications);
        });

        this.setState({jobApplications, loading: false});
      });
  };

  goToNewJobApplicationScreen = () => {
    this.props.navigation.navigate('NewJobApplicationScreen');
  };

  render() {

    const {loading, jobApplications} = this.state;

    return (
      <Fragment>
        <View style={{flex: 1}}>
          <JobApplicationList loading={loading} jobApplications={jobApplications}/>
          <Fab
            direction="up"
            containerStyle={{}}
            style={{backgroundColor: '#5067FF'}}
            position="bottomRight"
            onPress={this.goToNewJobApplicationScreen}>
            <Ionicon name="add" size={20}/>
          </Fab>
        </View>
      </Fragment>
    );
  }
}

export default JobApplicationListScreen;
