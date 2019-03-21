import React from 'react';
import {Alert, ScrollView} from 'react-native';
import {Button, Text, TextField, View} from 'react-native-ui-lib';
import {connect} from 'react-redux';
import firebase from 'react-native-firebase';
import {GoogleSignin, GoogleSigninButton, statusCodes} from 'react-native-google-signin';

const mapStateToProps = state => {
  return {};
};

class SignInScreenRedux extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
  }

  onLogin = () => {
    const {email, password} = this.state;
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((user) => {
        // If you need to do anything with the user, do it here
        // The user will be logged in automatically by the
        // `onAuthStateChanged` listener we set up in App.js earlier
        this.props.navigation.navigate('JobApplicationListScreen')
      })
      .catch((error) => {
        const {code, message} = error;
        // For details of error codes, see the docs
        // The message contains the default Firebase string
        // representation of the error
      });
  }

  /**
   * When the App component mounts, we listen for any authentication
   * state changes in Firebase.
   * Once subscribed, the 'user' parameter will either be null
   * (logged out) or an Object (logged in)
   */
  componentDidMount() {
    this._configureGoogleSignIn();
    //await this._getCurrentUser();
  }

  _configureGoogleSignIn() {
    GoogleSignin.configure();
  }

  _signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn()
        .then((data) => {
          // Create a new Firebase credential with the token
          const credential = firebase.auth.GoogleAuthProvider.credential(data.idToken, data.accessToken);
          // Login with the credential
          return firebase.auth().signInWithCredential(credential).then(
            () => {
              this.props.navigation.navigate('JobApplicationListScreen')
            });
        }).then((user) => {
          // If you need to do anything with the user, do it here
          // The user will be logged in automatically by the
          // `onAuthStateChanged` listener we set up in App.js earlier
        })
        .catch((error) => {
          const {code, message} = error;
          // For details of error codes, see the docs
          // The message contains the default Firebase string
          // representation of the error
        });

      ;
      //this.setState({userInfo, error: null});
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // sign in was cancelled
        Alert.alert('cancelled');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation in progress already
        Alert.alert('in progress');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        Alert.alert('play services not available or outdated');
      } else {
        Alert.alert('Something went wrong', error.toString());
        this.setState({
          error,
        });
      }
    }
  };

  render() {

    return (
      <View flex>
        <ScrollView
          keyboardShouldPersistTaps="always"
          contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}>

          <View>
            <Text blue50 text20>Welcome</Text>
            <TextField
              text50
              dark10
              placeholder='email'
              hideUnderline
              textContentType='emailAddress'
              keyboardType='email-address'
              autoCapitalize='none'
              onChangeText={(text) => this.setState({email: text})}
              value={this.state.text}/>
            <TextField
              text50
              dark10
              placeholder='password'
              hideUnderline
              textContentType='password'
              autoCapitalize='none'
              secureTextEntry
              onChangeText={(text) => this.setState({password: text})}
              value={this.state.text}/>
            <View marginT-100 center>
              <Button text70 white background-orange30 label="Login" onPress={this.onLogin}/>
              <Button link text70 orange30 label="Sign Up" marginT-20/>
              <GoogleSigninButton
                style={{width: 212, height: 48}}
                size={GoogleSigninButton.Size.Standard}
                color={GoogleSigninButton.Color.Auto}
                onPress={this._signIn}
              />
            </View>

          </View>

          {/*          <View style={{flexDirection: 'row'}}>
            <View style={{width: '20%'}}/>
            <View style={{width: '60%'}}>
              <Text>Sign In</Text>
              <TextField
                text40
                placeholder='email'
                hideUnderline
                textContentType='emailAddress'
                keyboardType='email-address'/>
              <TextField
                text40
                placeholder='password'
                hideUnderline
                textContentType='password'
                secureTextEntry={true}/>
            </View>
            <View style={{width: '20%'}}/>
          </View>*/}
        </ScrollView>
      </View>
    );
  }
}

const SignInScreen = connect(
  mapStateToProps,
  null
)(SignInScreenRedux);

export default SignInScreen;
