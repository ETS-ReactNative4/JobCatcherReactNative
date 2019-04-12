import React, {Fragment} from 'react';
import CustomColours from '../constants/CustomColours';
import {Alert, Linking, StyleSheet, View} from "react-native";
import {Button, Colors, ListItem, Text} from 'react-native-ui-lib';
import Icon from 'react-native-ionicons'

class JobApplicationDetailScreenProgress extends React.Component {
  render() {

    let jobApplication = this.props.jobApplication;

    return (
      <Fragment>

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


        <View style={{flexDirection: "row", margin: 8}}>

          {(jobApplication.jobAdvertURL === '') ?
            <Button
              disabled
              backgroundColor={CustomColours.colorPrimary}
              color={CustomColours.colorOnPrimary}
              label={"View Job Advert"}
              labelStyle={{fontWeight: '600'}}
              style={styles.jobAdvertURLButtonLeft}
            />
            :
            <Button
              backgroundColor={CustomColours.colorPrimary}
              color={CustomColours.colorOnPrimary}
              label={"View Job Advert"}
              labelStyle={{fontWeight: '600'}}
              style={styles.jobAdvertURLButtonLeft}
              onPress={() => {
                Linking.canOpenURL(jobApplication.jobAdvertURL).then(supported => {
                  if (supported) {
                    Linking.openURL(jobApplication.jobAdvertURL);
                  } else {
                    Alert.alert("Can't open URL", jobApplication.jobAdvertURL);
                    console.log("Don't know how to open URI: " + jobApplication.jobAdvertURL);
                  }
                });
              }}
            />
          }
          <Button
            backgroundColor={CustomColours.colorPrimaryLight}
            color={CustomColours.colorOnPrimary}
            label=''
            style={styles.jobAdvertURLButtonRight}
            iconSource={() => <Icon name='create' color={CustomColours.colorOnPrimary} size={16}
                                    style={{marginRight: 8, marginLeft: 8}}/>}
            onPress={() => {
              Alert.alert('Edit Job Advert URL', 'Edit Job Advert URL');
            }}
          />
        </View>

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
  jobAdvertURLButtonLeft: {
    flex: 6,
    borderBottomLeftRadius: 3,
    borderBottomRightRadius: 0,
    borderTopLeftRadius: 3,
    borderTopRightRadius: 0
  },
  jobAdvertURLButtonRight: {
    flex: 1,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 3,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 3
  }
});

export default JobApplicationDetailScreenProgress
