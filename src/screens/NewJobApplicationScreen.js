import React, {Fragment} from 'react';
import {Alert, ScrollView, StyleSheet} from 'react-native';
import {Button, Card, Colors, Constants, ListItem, Picker, Text, TextField, View} from 'react-native-ui-lib';
import {connect} from 'react-redux';
import CustomColours from "../constants/CustomColours";
import Icon from 'react-native-ionicons'
import {CONTRACT_TIME, CONTRACT_TYPE, WAGE_CURRENCY, WAGE_FREQUENCY} from "../utils/Arrays";
import _ from 'lodash';


const mapStateToProps = state => {
  return {};
};

class NewJobApplicationRedux extends React.Component {
  static navigationOptions = {
    title: 'New Job Application',
  };

  constructor(props) {
    super(props);
    this.state = {
      showLoader: true,
      jobApplication: '',
      selectedIndex: 0,
      currentPage: 0,
      wageCurrency: WAGE_CURRENCY[0].value,
      wageAmount: 0,
      wageFrequency: WAGE_FREQUENCY[4].value,
      contractType: CONTRACT_TYPE[2].value,
      contractTime: CONTRACT_TIME[0].value
    };

  }

  render() {

    return (
      <Fragment>
        <ScrollView style={styles.container} keyboardShouldPersistTaps="always">
          <View
            style={{paddingTop: 24, paddingRight: 24, paddingLeft: 24}}>
            <TextField
              text50
              style={{color: CustomColours.colorPrimary}}
              placeholder='Job Title'
              textContentType='jobTitle'
              autoCapitalize='words'
              onChangeText={(text) => this.setState({jobTitle: text})}
              value={this.state.jobTitle}/>
            <TextField
              text50
              style={{color: CustomColours.colorPrimary}}
              placeholder='Company Name'
              textContentType='organizationName'
              autoCapitalize='words'
              onChangeText={(text) => this.setState({companyName: text})}
              value={this.state.companyName}/>
          </View>
          <ListItem
            activeBackgroundColor={Colors.dark60}
            activeOpacity={0.3}
            onPress={() => {
              Alert.alert('Location', 'Add Location here.');
            }}
            containerStyle={{padding: 8}}>
            <ListItem.Part left style={styles.image}>
              <Icon
                name='pin'
                size={26}
                color={CustomColours.colorPrimary}
              />
            </ListItem.Part>
            <ListItem.Part middle column>
              <ListItem.Part>
                <Text dark10 text70 numberOfLines={1}>Location</Text>
              </ListItem.Part>
              <ListItem.Part>
                <Text text70 dark40 numberOfLines={1}>Add Location</Text>
              </ListItem.Part>
            </ListItem.Part>
          </ListItem>
          <Card style={styles.card}
                onPress={() => {
                }}>
            <View style={{margin: 16}}>
              <View
                style={{alignItems: 'center', justifyContent: 'center'}}
                onPress={() => {
                }}>
                <Text text70 dark10>
                  Wishlist
                </Text>
              </View>
              <Button
                backgroundColor={CustomColours.colorPrimary}
                color={CustomColours.colorOnPrimary}
                label="Start Application"
                labelStyle={{fontWeight: '600'}}
                style={{marginTop: 8, borderRadius: 3}}
                onPress={() => {
                  Alert.alert('New Application Stage', 'Add First Application Stage here.');
                }}
              />
            </View>
          </Card>

          <View style={{marginLeft: 16, marginRight: 16}}>

            <Button
              backgroundColor={CustomColours.colorPrimary}
              color={CustomColours.colorOnPrimary}
              label='Set Deadline'
              labelStyle={{fontWeight: '600'}}
              style={{marginTop: 8, borderRadius: 3}}
              iconSource={() => <Icon name='calendar' color={CustomColours.colorOnPrimary} style={{marginRight: 8}}/>}
              onPress={() => {
                Alert.alert('Set Deadline', 'Set a Deadline here.');
              }}
            />

            <Button
              outline
              /*            backgroundColor={CustomColours.colorPrimary}*/
              color={CustomColours.colorPrimary}
              label='Add Reminder(s)'
              labelStyle={{fontWeight: '600'}}
              style={{marginTop: 8, borderRadius: 3}}
              iconSource={() => <Icon name='alarm' color={CustomColours.colorPrimary} style={{marginRight: 8}}/>}
              onPress={() => {
                Alert.alert('Set Reminder(s)', 'Set a Deadline here.');
              }}
            />

          </View>

          <View
            style={{paddingTop: 24, paddingRight: 24, paddingLeft: 24}}>
            <Text dark10 text70 numberOfLines={1}>Wages</Text>
          </View>
          <View style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'flex-start',
            marginTop: 8
          }}>

            <View style={{flex: 1}}>
              <Picker
                placeholder={this.state.wageCurrency}
                text50
                hideUnderline
                value={this.state.wageCurrency}
                enableModalBlur={false}
                onChange={item => this.setState({wageCurrency: item.value})}
                topBarProps={{title: 'Wage Currency'}}
                style={{color: Colors.red20, textAlign: 'center'}}>
                {WAGE_CURRENCY.map(option => (
                  <Picker.Item key={option.value} value={option} disabled={option.disabled} label={option.label}/>
                ))}
              </Picker>
            </View>

            <View style={{flex: 4}}>
              <TextField
                text50
                style={{color: CustomColours.colorPrimary, paddingTop: 1}}
                placeholder='0'
                keyboardType='numeric'
                onChangeText={(text) => this.setState({wageAmount: text})}
                value={this.state.wageAmount ? String(this.state.wageAmount) : null}/>
            </View>

            <View style={{flex: 2}}>
              <Picker
                placeholder={this.state.wageFrequency}
                text50
                hideUnderline
                value={this.state.wageFrequency}
                enableModalBlur={false}
                onChange={item => this.setState({wageFrequency: item.value})}
                topBarProps={{title: 'Wage Frequency'}}
                style={{color: Colors.red20, textAlign: 'center'}}>
                {WAGE_FREQUENCY.map(option => (
                  <Picker.Item key={option.value} value={option} disabled={option.disabled} label={option.label}/>
                ))}
              </Picker>
            </View>

          </View>

          <View
            style={{paddingTop: 16, paddingRight: 24, paddingLeft: 24}}>
            <Text dark10 text70 numberOfLines={1}>Contract Type and Time</Text>
          </View>
          <View style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'flex-start',
            marginTop: 8
          }}>

            <View style={{flex: 2}}>
              <Picker
                placeholder={this.state.contractTime}
                text50
                hideUnderline
                value={this.state.contractTime}
                enableModalBlur={false}
                onChange={item => this.setState({contractTime: item.value})}
                topBarProps={{title: 'Contract Type'}}
                style={{color: Colors.red20, paddingLeft: 32}}>
                {CONTRACT_TYPE.map(option => (
                  <Picker.Item key={option.value} value={option} disabled={option.disabled} label={option.label}/>
                ))}
              </Picker>
            </View>

            <View style={{flex: 1}}>
              <TextField
                text50
                style={{color: CustomColours.colorPrimary, paddingTop: 1}}
                placeholder='0'
                keyboardType='numeric'
                onChangeText={(text) => this.setState({wageAmount: text})}
                value={this.state.wageAmount ? String(this.state.wageAmount) : null}/>
            </View>
            <Text dark10 text70 numberOfLines={1}>Hours</Text>

          </View>

          <View style={{flex: 1}}>
            <Picker
              placeholder={this.state.contractType}
              text50
              hideUnderline
              value={this.state.contractType}
              enableModalBlur={false}
              onChange={item => this.setState({contractType: item.value})}
              topBarProps={{title: 'Contract Type'}}
              style={{color: Colors.red20, textAlign: 'center'}}>
              {CONTRACT_TYPE.map(option => (
                <Picker.Item key={option.value} value={option} disabled={option.disabled} label={option.label}/>
              ))}
            </Picker>
          </View>
          <View style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-evenly',
          }}>
            <Button
              backgroundColor={CustomColours.colorPrimary}
              color={CustomColours.colorOnPrimary}
              label='Set Deadline'
              labelStyle={{fontWeight: '600'}}
              style={{marginTop: 8, borderRadius: 3}}
              iconSource={() => <Icon name='calendar' color={CustomColours.colorOnPrimary} style={{marginRight: 8}}/>}
              onPress={() => {
                Alert.alert('Set Deadline', 'Set a Deadline here.');
              }}
            />
            <Button
              outline
              backgroundColor={CustomColours.colorPrimary}
              color={CustomColours.colorOnPrimary}
              label='Add Reminder(s)'
              labelStyle={{fontWeight: '600'}}
              style={{marginTop: 8, borderRadius: 3}}
              iconSource={() => <Icon name='alarm' color={CustomColours.colorOnPrimary} style={{marginRight: 8}}/>}
              onPress={() => {
                Alert.alert('Add Reminders', 'Add Reminders here.');
              }}
            />
          </View>


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
  },
  image: {
    marginRight: 16,
    marginLeft: 8,
    alignItems: 'center',
    justifyContent: 'center'
  },
});

const NewJobApplicationScreen = connect(
  mapStateToProps,
  null
)(NewJobApplicationRedux);

export default NewJobApplicationScreen;
