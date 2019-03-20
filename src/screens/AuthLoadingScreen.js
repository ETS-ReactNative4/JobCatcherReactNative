import React from 'react';
import {BorderRadiuses, LoaderScreen, Text, ThemeManager, View} from 'react-native-ui-lib';
import {connect} from 'react-redux';
import firebase from 'react-native-firebase';


const mapStateToProps = state => {
  return {};
};

class CompareRedux extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  /**
   * When the App component mounts, we listen for any authentication
   * state changes in Firebase.
   * Once subscribed, the 'user' parameter will either be null
   * (logged out) or an Object (logged in)
   */
  componentDidMount() {
    this.authSubscription = firebase.auth().onAuthStateChanged((user) => {

      if (user) {
        this.props.navigation.navigate('JobApplicationListScreen')
      } else {
        this.props.navigation.navigate('SignInScreen')
      }

    });
  }

  /**
   * Don't forget to stop listening for authentication state changes
   * when the component unmounts.
   */
  componentWillUnmount() {
    this.authSubscription();
  }

  render() {

    const {animationConfig} = this.state;

    // The application is initialising
    return (<View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <LoaderScreen
        color='#bebebe'
        message='Logging in to JobCatcher...'
        overlay
        {...animationConfig}/></View>);
  }


}

const CompareScreen = connect(
  mapStateToProps,
  null
)(CompareRedux);

export default CompareScreen;
