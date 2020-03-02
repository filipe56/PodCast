import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import styles from './Styles';
import CellPodCast from '../../../components/CellPodCast/CellPodCast';
import { listPodCast, data } from '../../mock/mock';

export default class ListPodCast extends Component {
  constructor(props) {
    super(props);
    this.listPodCast = listPodCast;
    this.data = data;
  }

  static navigationOptions = {
    title: 'Lista de podCast',
  };

  navigationToDetail = ListSound => {
    this.props.navigation.navigate('ListSound', { ListSound });
  };

  renderCell() {
    return this.data.map(item => (
      <View>
        <CellPodCast
          image={item.image}
          title={item.title}
          author={item.author}
          onPress={() => this.navigationToDetail(item)}
        />
      </View>
    ));
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.containerList}>
          {this.renderCell()}
        </ScrollView>
      </View>
    );
  }
}
