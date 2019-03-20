import React, {Fragment} from 'react';
import {FlatList} from 'react-native';
import {connect} from 'react-redux';
import JobApplicationListItem from '../components/JobApplicationListItem'
import {Colors, LoaderScreen, View} from 'react-native-ui-lib';

import Icon from 'react-native-ionicons'
import firebase from 'react-native-firebase';
import {FIREBASE_PATH} from "../utils/Constants";
import moment from "moment/moment";

const mapStateToProps = state => {
  return {};
};

class SettingsScreenRedux extends React.Component {
  static navigationOptions = {
    title: 'Job Applications',
    headerRight: (
      <Icon
        name='funnel'
        color='#ffffff'
        style={{marginRight: 8}}
        size={20}
        onPress={() => alert('Filter and Sort goes here')}
      />
    )
  };

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      selected: (new Map()),
      jobApplications: [],
      todayDateTime: moment().startOf('day')
    };
    this.getjobApplications();
  }

  componentDidUpdate(previousProps) {
    console.log('previousProps', previousProps.isFocused ? 'Focused' : 'Not focused');
    if (!previousProps.isFocused && this.props.isFocused) {
      this.getjobApplications();
    }
  }

  _onPressItem = (id) => {
    this.setState((state) => {
      const selected = new Map(state.selected);
      selected.set(id, !selected.get(id));
      return {selected};
    })
  };

  _renderItem = ({item}) => (
    <JobApplicationListItem
      id={item.id}
      onPressItem={this._onPressItem}
      item={item}
      navigation={this.props.navigation}
    />
  );

  getjobApplications = () => {
    const UID = 'iNQaYaxx0rXmPOqvXCK5feZp5FD3';

    firebase.firestore()
      .collection(FIREBASE_PATH.JOB_APPLICATIONS_ROOT)
      .doc(UID)
      .collection(FIREBASE_PATH.JOB_APPLICATION_LIST)
      .get()
      .then(querySnapshot => {
        let jobApplications = [];

        querySnapshot.forEach(doc => {
          let docData = doc.data();

          //console.log('acts', docData.acts);
          //console.log('nationalities', docData.nationalities);

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

          //console.log('jobApplication', jobApplication);

          jobApplications = [jobApplication].concat(jobApplications);
        });

        this.setState({jobApplications, loading: false});
      });
  };

  render() {

    const {loading, animationConfig} = this.state;

    return (
      <Fragment>
        {loading ?
          <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <LoaderScreen
              color='#bebebe'
              message='Loading Job Applications...'
              overlay
              {...animationConfig}/></View> : <FlatList
            data={this.state.jobApplications}
            renderItem={this._renderItem}
          />
        }
      </Fragment>
    );
  }
}

const JobApplicationListScreen = connect(
  mapStateToProps,
  null
)(SettingsScreenRedux);

export default JobApplicationListScreen;
