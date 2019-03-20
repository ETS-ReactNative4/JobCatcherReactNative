import React from 'react';
import {ScrollView} from 'react-native';
import {Button, Text, TextField, View} from 'react-native-ui-lib';
import {connect} from 'react-redux';
import firebase from 'react-native-firebase';

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
