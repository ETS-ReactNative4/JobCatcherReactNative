import React from 'react';
import {View} from 'react-native';
import {BorderRadiuses, Text, ThemeManager} from 'react-native-ui-lib';
import {connect} from 'react-redux';

const mapStateToProps = state => {
  return {};
};

class HomeScreenRedux extends React.Component {
  static navigationOptions = {
    title: 'Overview'
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {

    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>HomeScreen</Text>
      </View>
    );
  }
}

const OverviewScreen = connect(
  mapStateToProps,
  null
)(HomeScreenRedux);

export default OverviewScreen;
