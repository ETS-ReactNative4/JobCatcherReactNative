import React, {Fragment} from 'react';
import CustomColours from '../constants/CustomColours';
import {Alert, StyleSheet, View} from "react-native";
import {Button, Colors, ListItem, Text} from 'react-native-ui-lib';
import Icon from 'react-native-ionicons'
import * as Animatable from 'react-native-animatable';

class JobApplicationDetailScreenProgress extends React.Component {
  render() {

    let jobApplication = this.props.jobApplication;

    return (
      <Fragment>

        <Animatable.View animation="fadeIn" easing="ease-out-expo"
                         duration={1000} useNativeDriver>
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
                <Text dark10 text70 numberOfLines={1}>{jobApplication.locationName}</Text>
              </ListItem.Part>
              <ListItem.Part>
                <Text text70 dark40 numberOfLines={1}>x miles from you.</Text>
              </ListItem.Part>
            </ListItem.Part>
          </ListItem>
        </Animatable.View>

        <View style={{marginTop: 8, marginRight: 8, marginLeft: 8}}>
          <Text dark10 text70>Wages/Salary</Text>
          <Text dark40
                text70>{jobApplication.wageCurrency}{jobApplication.wageAmount} {jobApplication.wageFrequency}</Text>
        </View>
        <View style={{marginTop: 8, marginRight: 8, marginLeft: 8}}>
          <Text dark10 text70>Job Type</Text>
          <Text dark40
                text70>{jobApplication.contractType}{jobApplication.contractTime} ({jobApplication.jobHours})</Text>
        </View>

        <View style={{marginBottom: 8}}/>

        {(jobApplication.jobAdvertURL === '') ?
          <ListItem
            activeBackgroundColor={Colors.dark60}
            activeOpacity={0.3}
            onPress={() => {
              Alert.alert('Add Job Advert URL', 'Add Job Advert URL');
            }}
            containerStyle={{padding: 8}}
            height={40}>
            <ListItem.Part left style={styles.image}>
              <Icon
                name='add'
                size={26}
                color={CustomColours.dark40}
              />
            </ListItem.Part>
            <ListItem.Part middle column>
              <Text dark40 text70>Add Job Advert URL</Text>
            </ListItem.Part>
          </ListItem> :
          <Button
            backgroundColor={CustomColours.colorPrimary}
            color={CustomColours.colorOnPrimary}
            label={"View Job Advert"}
            labelStyle={{fontWeight: '600'}}
            style={{margin: 8, borderRadius: 3}}
            onPress={() => {
              Alert.alert('View Job Advert', 'View Job Advert at \n ' + jobApplication.jobAdvertURL);
            }}
          />
        }

        {(jobApplication.jobReference === '') ?
          <ListItem
            activeBackgroundColor={Colors.dark60}
            activeOpacity={0.3}
            onPress={() => {
              Alert.alert('Add Job Reference', 'Add Job Reference');
            }}
            containerStyle={{padding: 8}}
            height={40}>
            <ListItem.Part left style={styles.image}>
              <Icon
                name='add'
                size={26}
                color={CustomColours.dark40}
              />
            </ListItem.Part>
            <ListItem.Part middle column>
              <Text dark40 text70>Add Job Reference</Text>
            </ListItem.Part>
          </ListItem> :
          <View style={{marginTop: 8, marginRight: 8, marginLeft: 8}}>
            <Text dark10 text70>Job Reference</Text>
            <Text dark40
                  text70>{jobApplication.jobReference}</Text>
          </View>
        }


        {(jobApplication.jobDescription === '') ?
          <ListItem
            activeBackgroundColor={Colors.dark60}
            activeOpacity={0.3}
            onPress={() => {
              Alert.alert('Add Job Description', 'Add Job Description');
            }}
            containerStyle={{padding: 8}}
            height={40}>
            <ListItem.Part left style={styles.image}>
              <Icon
                name='add'
                size={26}
                color={CustomColours.dark40}
              />
            </ListItem.Part>
            <ListItem.Part middle column>
              <Text dark40 text70>Add Job Description</Text>
            </ListItem.Part>
          </ListItem> :
          <View style={{marginTop: 8, marginRight: 8, marginLeft: 8}}>
            <Text dark10 text70>Job Description</Text>
            <Text dark40
                  text70>{jobApplication.jobDescription}</Text>
          </View>
        }

        {(jobApplication.applicationNotes === '') ?
          <ListItem
            activeBackgroundColor={Colors.dark60}
            activeOpacity={0.3}
            onPress={() => {
              Alert.alert('Add Application Notes', 'Add Application Notes');
            }}
            containerStyle={{padding: 8}}
            height={40}>
            <ListItem.Part left style={styles.image}>
              <Icon
                name='add'
                size={26}
                color={CustomColours.dark40}
              />
            </ListItem.Part>
            <ListItem.Part middle column>
              <Text dark40 text70>Add Application Notes</Text>
            </ListItem.Part>
          </ListItem> :
          <View style={{marginTop: 8, marginRight: 8, marginLeft: 8}}>
            <Text dark10 text70>Notes</Text>
            <Text dark40
                  text70>{jobApplication.applicationNotes}</Text>
          </View>
        }

      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    marginRight: 16,
    marginLeft: 8,
    alignItems: 'center',
    justifyContent: 'center'
  },
});

export default JobApplicationDetailScreenProgress
