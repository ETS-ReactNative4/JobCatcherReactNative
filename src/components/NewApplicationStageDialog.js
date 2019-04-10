import React from 'react';
import {Colors, Picker, View} from 'react-native-ui-lib'
import {
  APPLICATION_STAGE_ARRAY,
  APPLICATION_STAGE_STATUS_ARRAY
} from "../utils/Arrays";

class NewApplicationStageDialog extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      applicationStage: APPLICATION_STAGE_ARRAY[0].value,
      applicationStageStatus: APPLICATION_STAGE_STATUS_ARRAY[0].value,
    };

  }

  render() {
    return(
      <View>

        <Picker
          placeholder={this.state.applicationStage}
          text50
          hideUnderline
          value={this.state.applicationStage}
          enableModalBlur={false}
          onChange={item => this.setState({applicationStage: item.value})}
          topBarProps={{title: 'Application Stage'}}
          style={{color: Colors.red20, textAlign: 'center'}}>
          {APPLICATION_STAGE_ARRAY.map(option => (
            <Picker.Item key={option.value} value={option} disabled={option.disabled} label={option.label}/>
          ))}
        </Picker>
        <Picker
          placeholder={this.state.applicationStageStatus}
          text50
          hideUnderline
          value={this.state.applicationStageStatus}
          enableModalBlur={false}
          onChange={item => this.setState({applicationStageStatus: item.value})}
          topBarProps={{title: 'Status'}}
          style={{color: Colors.red20, textAlign: 'center'}}>
          {APPLICATION_STAGE_STATUS_ARRAY.map(option => (
            <Picker.Item key={option.value} value={option} disabled={option.disabled} label={option.label}/>
          ))}
        </Picker>

      </View>
    )
  }

}