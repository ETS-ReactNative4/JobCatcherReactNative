import React from 'react';
import {connect} from 'react-redux';
import {Text, View} from "react-native";

const mapStateToProps = state => {
  return {};
};

class JobMapRedux extends React.Component {
  static navigationOptions = {
    title: 'JobMap'
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {

    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>JobMap</Text>
      </View>
    );
  }
}

const OverviewScreen = connect(
  mapStateToProps,
  null
)(JobMapRedux);

export default OverviewScreen;
