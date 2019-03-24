import React, {Fragment} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {
  BorderRadiuses,
  Button,
  Carousel,
  Colors,
  Constants,
  ListItem,
  LoaderScreen,
  TabBar,
  TextField,
  ThemeManager
} from 'react-native-ui-lib';
import {connect} from 'react-redux';

const mapStateToProps = state => {
  return {};
};

class JobApplicationDetailRedux extends React.Component {
  static navigationOptions = {
    title: 'New Job Application',
  };

  constructor(props) {
    super(props);
    this.state = {
      showLoader: true,
      jobApplication: '',
      selectedIndex: 0,
      currentPage: 0
    };

  }

  render() {

    return (
      <Fragment>
        <ScrollView style={styles.container} keyboardShouldPersistTaps="always">
          <TextField
            text50
            dark10
            placeholder='Job Title'
            textContentType='jobTitle'
            keyboardType='default'
            autoCapitalize='words'
            onChangeText={(text) => this.setState({jobTitle: text})}
            value={this.state.jobTitle}/>
          <TextField
            text50
            dark10
            placeholder='Company Name'
            textContentType='organizationName'
            keyboardType='default'
            autoCapitalize='words'
            onChangeText={(text) => this.setState({companyName: text})}
            value={this.state.companyName}/>
        </ScrollView>

      </Fragment>
    );
  }
}

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
