import React, {Fragment} from 'react';
import {FlatList} from 'react-native';
import JobApplicationListItem from '../components/JobApplicationListItem'
import {LoaderScreen, View} from 'react-native-ui-lib';

class JobApplicationList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  _onPressItem = (id) => {
    this.setState((state) => {
      const selected = new Map(state.selected);
      selected.set(id, !selected.get(id));
      return {selected};
    })
  };

  _renderItem = ({item}) => (
    <JobApplicationListItem
      id={item.id}
      onPressItem={this._onPressItem}
      item={item}
      navigation={this.props.navigation}
    />
  );

  render() {

    let {loading, jobApplications} = this.props;
    let animationConfig = this.props.animationConfig;

    return (
      <Fragment>
        {loading ?
          <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <LoaderScreen
              color='#bebebe'
              message='Loading Job Applications...'
              overlay
              {...animationConfig}/></View> :
          <View style={{flex: 1}}>
            <FlatList
              data={jobApplications}
              renderItem={this._renderItem}/>
          </View>
        }
      </Fragment>
    );
  }
}

export default JobApplicationList;
