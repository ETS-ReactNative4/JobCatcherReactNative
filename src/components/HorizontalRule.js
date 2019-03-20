import {View} from "react-native";
import React from "react";

export default class HorizontalRule extends React.Component {

  render() {
    return (
      <View style={{
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        marginTop: 8,
        marginBottom: 8
      }}/>
    )
  }


}
