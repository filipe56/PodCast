import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Image,
  ScrollView,
} from 'react-native';
import PropTypes from 'prop-types';
export default class ListPodCast extends Component {
  constructor(props) {
    super(props);
    const imagePodCast =
      'https://blog.pluga.co/uploads/2017/03/podcast-empreendedorismo.jpg';
    const uri = 'https://m.toqueparacelular.com.br/n04/Star_Wars_Remix.mp3';
    this.listPodCast = [
      {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        title: 'BB TECH ANALYTICS',
        date: '20 de dezembro de 2019',
        time: '53:20',
        image: imagePodCast,
        sound: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
        uri: uri,
      },
      {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        title: ' BB TECH 1',
        date: '20 de dezembro de 2021',
        time: '50:00',
        image: imagePodCast,
        sound: 'https://s3.eu-west-3.amazonaws.com/evolum/beginner_1.mp3',
        uri: uri,
      },
      {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'BB TECH 2',
        date: '20 de dezembro de 2020',
        time: '43:50',
        image: imagePodCast,
        sound: 'https://m.toqueparacelular.com.br/n04/Star_Wars_Remix.mp3',
        uri: uri,
      },
    ];
    this.data = [
      {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        title: 'Analitics na Cabeça',
        author: 'Analitics',
        sounds: this.listPodCast,
        image: imagePodCast,
        uri: uri,
      },
      {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        title: 'BB TEC',
        author: 'Gdigi',
        sounds: this.listPodCast,
        image: imagePodCast,
        uri: uri,
      },
      {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'PodCast',
        author: 'podtag team',
        sounds: this.listPodCast,
        image: imagePodCast,
        uri: uri,
      },
    ];
  }
  static navigationOptions = {
    title: 'Lista de podCast',
  };

  static propTypes = {
    navigation: PropTypes.shape({ navigate: PropTypes.func }).isRequired,
  };

  navigationToDetail = ({ title, author, sounds }) => {
    this.props.navigation.navigate('ListSound', { title, author, sounds });
  };

  renderCell() {
    return this.data.map(item => (
      <TouchableOpacity
        key={item.title}
        onPress={() => this.navigationToDetail(item)}
      >
        <View style={styles.containerTop}>
          <View style={styles.item}>
            <Image
              source={{
                uri: item.image,
              }}
              style={styles.imageAuthor}
            />
            <View>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.author}>{item.author}</Text>
            </View>
          </View>
          <View style={styles.line} />
        </View>
      </TouchableOpacity>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  containerList: {
    paddingTop: 20,
  },
  containerTop: {
    marginTop: 10,
  },
  item: {
    paddingLeft: 20,
    paddingRight: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    flexDirection: 'row',
  },
  title: {
    fontSize: 15,
    marginLeft: 20,
    color: '#4169E1',
  },
  author: {
    fontSize: 10,
    marginLeft: 20,
    marginTop: 5,
    color: 'gray',
  },
  line: {
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    marginLeft: 20,
    marginBottom: 15,
    paddingBottom: 5,
  },
  imageAuthor: {
    width: 50,
    height: 50,
    borderRadius: 10,
  },
  list: {
    paddingTop: 10,
    backgroundColor: 'white',
    paddingBottom: 200,
  },
});
