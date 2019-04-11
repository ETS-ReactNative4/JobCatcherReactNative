import React, {Fragment} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {
  Carousel,
  Constants,
  LoaderScreen,
  TabBar,
  Text
} from 'react-native-ui-lib';
import {connect} from 'react-redux';
import firebase from "react-native-firebase";
import {FIREBASE_PATH} from "../utils/Constants";
import CustomColours from '../constants/CustomColours'
import JobApplicationDetailScreenProgress from "./JobApplicationDetailScreenProgress";
import JobApplicationDetailScreenDetails from "./JobApplicationDetailScreenDetails";

const mapStateToProps = state => {
  return {};
};

class JobApplicationDetailRedux extends React.Component {
  static navigationOptions = {
    title: '',
  };

  constructor(props) {
    super(props);
    this.state = {
      showLoader: true,
      jobApplication: '',
      selectedIndex: 0,
      currentPage: 0
    };
    this.getjobApplications();

  }

  getjobApplications = () => {
    let jobApplicationID = this.props.navigation.getParam('jobApplicationID', 0);

    const UID = firebase.auth().currentUser.uid;

    let jobApplicationRef = firebase.firestore().collection(FIREBASE_PATH.JOB_APPLICATIONS_ROOT).doc(UID)
      .collection(FIREBASE_PATH.JOB_APPLICATION_LIST).doc(jobApplicationID);

    console.log("jobApplicationsRef: ", jobApplicationRef.path.toString());

    jobApplicationRef.get().then((doc) => {

      if (doc.exists) {

        let docData = doc.data();

        console.log("docDataVal: ", docData.jobTitle);


        let jobApplication = {
          id: doc.id,
          jobTitle: docData.jobTitle || '',
          companyName: docData.companyName || '',

          isLocationSet: docData.isLocationSet || false,
          locationName: docData.locationName || 'No Location Set',
          locationLatitude: docData.locationLatitude || '0.0',
          locationLongitude: docData.locationLongitude || '0.0',
          isRemote: docData.isRemote || false,

          currentApplicationStage: docData.currentApplicationStage,
          currentApplicationStageStatus: docData.currentApplicationStageStatus,
          currentApplicationStageDateStarted: docData.currentApplicationStageDateStarted,
          currentApplicationStageDateCompleted: docData.currentApplicationStageDateCompleted,
          currentApplicationStageNotes: docData.currentApplicationStageNotes,
          applicationStageHistory: docData.applicationStageHistory || [],

          wageCurrency: docData.wageCurrency || '',
          wageAmount: docData.wageAmount || '0.00',
          wageFrequency: docData.wageFrequency || '',

          isDeadlineSet: docData.isDeadlineSet || false,
          deadlineDate: docData.deadlineDate || 'No deadline date set',

          isReminderSet: docData.isReminderSet || false,
          reminderIds: docData.reminderIds || [],

          contractType: docData.contractType || '',
          contractTime: docData.contractTime || '',
          jobHours: docData.jobHours || '',
          jobReference: docData.jobReference || '',
          jobDescription: docData.jobDescription || '',
          jobAdvertURL: docData.jobAdvertURL || '',
          jobAdvertURLAffiliate: docData.jobAdvertURLAffiliate || '',

          applicationNotes: docData.applicationNotes || '',

          contactTitle: docData.contactTitle || '',
          contactFirstName: docData.contactFirstName || '',
          contactSurname: docData.contactSurname || '',
          contactPosition: docData.contactPosition || '',
          contactEmail: docData.contactEmail || '',
          contactPhone: docData.contactPhone || '',
          contactWebsite: docData.contactWebsite || '',

          applicationPriority: docData.applicationPriority || '',
          pinned: docData.pinned || '',

          applicationStatus: docData.applicationStatus || '',

          dateApplied: docData.dateApplied || '',
          dateCompleted: docData.dateCompleted || '',

          timestampCreated: docData.timestampCreated || '',
          timestampLastChanged: docData.timestampLastChanged || '',

          emailFollowupSent: docData.emailFollowupSent || '',
          emailFollowupTimeSent: docData.emailFollowupTimeSent || '',
          emailFollowupTimeCheck: docData.emailFollowupTimeCheck || ''

        };

        let isReminderSet = jobApplication.isReminderSet;

        if (isReminderSet) {
          this.getReminders();
        }

        this.setState({jobApplication: jobApplication, showLoader: false});

      } else {
        console.error("No such Job Application document!");
        this.setState({showLoader: false, jobApplication: {}});
      }

    }).catch((error) => {
      console.error("Error getting Job Application Document", error)
    });

  };

  onChangePage(index) {
    this.setState({selectedIndex: index});
    this.carousel.goToPage(index, true);
  }

  render() {

    let {jobApplication, selectedIndex, showLoader, animationConfig} = this.state;
    console.log('activePage', selectedIndex);

    return (
      <Fragment>
        {
          showLoader ?
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <LoaderScreen
                color='#bebebe'
                message='Loading Job Application...'
                overlay
                {...animationConfig}/></View> :
            <ScrollView style={styles.container} keyboardShouldPersistTaps="always">
              <View
                style={{
                  paddingTop: 24,
                  paddingRight: 8,
                  paddingLeft: 24,
                  backgroundColor: CustomColours.colorPrimary
                }}>
                <Text text60 style={{color: CustomColours.colorOnPrimary}}>{jobApplication.jobTitle}</Text>
                <Text text60 style={{color: CustomColours.colorOnPrimary}}>{jobApplication.companyName}</Text>
              </View>
              <TabBar
                style={{backgroundColor: CustomColours.colorPrimary}}
                indicatorStyle={{borderColor: CustomColours.colorOnPrimary}}
                enableShadow={false}
                selectedIndex={selectedIndex}
                onChangeIndex={(index => this.onChangePage(index))}>
                <TabBar.Item label='Progress' labelStyle={{color: CustomColours.colorOnPrimary}}
                             selectedLabelStyle={{color: CustomColours.colorOnPrimary}}/>
                <TabBar.Item label='Details' labelStyle={{color: CustomColours.colorOnPrimary}}
                             selectedLabelStyle={{color: CustomColours.colorOnPrimary}}/>
              </TabBar>
              <Carousel onChangePage={(index => this.onChangePage(index))} initialPage={selectedIndex}
                        ref={ref => this.carousel = ref}>
                <Page bg-cyan50>
                  <JobApplicationDetailScreenProgress jobApplication={jobApplication}/>
                </Page>
                <Page bg-red50>
                  <JobApplicationDetailScreenDetails jobApplication={jobApplication}/>
                </Page>
              </Carousel>
              <View/>
            </ScrollView>
        }
      </Fragment>
    );
  }
}

const Page = ({children, ...others}) => {
  return (
    <View {...others} style={styles.page}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  page: {
    width: Constants.screenWidth
  }
});

const JobApplicationDetailScreen = connect(
  mapStateToProps,
  null
)(JobApplicationDetailRedux);

export default JobApplicationDetailScreen;
