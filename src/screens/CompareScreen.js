import React from 'react';
import {View} from 'react-native';
import {BorderRadiuses, Text, ThemeManager} from 'react-native-ui-lib';
import {connect} from 'react-redux';

const mapStateToProps = state => {
  return {};
};

class CompareRedux extends React.Component {
  static navigationOptions = {
    title: 'Compare'
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {

    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>Compare</Text>
      </View>
    );
  }
}

const CompareScreen = connect(
  mapStateToProps,
  null
)(CompareRedux);

export default CompareScreen;
