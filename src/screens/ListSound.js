import React, { Component } from 'react';
import {
  Image,
  Screen,
  Text,
  View,
  StyleSheet,
  FlatList,
  Modal,
  TouchableHighlight,
  Alert,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { downloadFile } from '../service/audio';
import Player from './Player';
import RNFetchBlob from 'rn-fetch-blob';

export default class ListSound extends Component {
  constructor(props) {
    super(props);
    this.listSounds = props.navigation.getParam('sounds');
    this.author = props.navigation.getParam('author');
    this.title = props.navigation.getParam('title');
    this.iconDownload =
      'https://cdn.icon-icons.com/icons2/902/PNG/512/download-1_icon-icons.com_69391.png';

    this.state = {
      modalVisible: false,
      soundChoosed: { image: '' },
      position: 0,
    };

    // console.warn('constructor - list 0', this.listSounds[0].uri);
    // console.warn('constructor - list 1', this.listSounds[1].uri);
    // console.warn('constructor - list 2', this.listSounds[2].uri);
  }

  static navigationOptions = {
    title: 'Lista de Sons',
  };

  closeModal = () => {
    this.setState({ modalVisible: false });
  };

  openModal = (modalVisible, index) => {
    this.setState({ modalVisible, position: index });
    // this.props.navigation.navigate('Player', {
    //   title: 'nome do podCast',
    // });
  };

  download = url => {
    console.warn('url', url);
    downloadFile(url);
    // .then(res =>
    //   RNFetchBlob.fs.scanFile([{ path: res.path(), mime: 'audio/mpeg' }])
    // )
    // .then(respo => {
    //   // scan file success
    //   console.warn('foi');
    //   console.log('The file saved to ', respo.path());

    //   const NEW_FILE_PATH = RNFetchBlob.fs.dirs.CacheDir + '/teste.mp3';

    //   RNFetchBlob.fs.writeFile(NEW_FILE_PATH, response);
    // })
    // .catch(err => {
    //   // scan file error
    //   console.warn('err', err);
    // });
    // downloadFile(url).then(response => {
    //   // RNFetchBlob.fs.writeFile(c, response, 'utf8');

    //   console.warn('response', response);
    // });
  };

  renderCell() {
    const { modalVisible } = this.state;
    // console.warn('this.listSound', this.listSounds[0].uri);
    // console.warn('this.listSound', this.listSounds[1].uri);
    // console.warn('this.listSound', this.listSounds[2].uri);

    return this.listSounds.map((item, index) => (
      <TouchableOpacity
        key={item.title}
        onPress={() => {
          this.openModal(!modalVisible, index);
        }}
      >
        <View>
          <View style={styles.item}>
            <Image source={{ uri: item.image }} style={styles.imageAuthor} />
            <View>
              <Text style={styles.title}>{item.title}</Text>
              <View style={styles.infoDateTime}>
                <Text style={styles.date}>{item.date}</Text>
                <Text style={styles.time}>{item.time}</Text>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => {
                this.download(item.sound);
              }}
              style={styles.containerIconDownload}
            >
              <Image
                source={{
                  uri: this.iconDownload,
                }}
                style={styles.iconDownload}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.line} />
        </View>
      </TouchableOpacity>
    ));
  }

  render() {
    const {
      modalVisible,
      image,
      position,
      soundChoosed,
      listSounds,
    } = this.state;

    return (
      <View style={styles.container}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={modalVisible}
          onRequestClose={this.closeModal}
          style={{ marginTop: 40, flex: 1 }}
        >
          <View style={{ marginTop: 22, flex: 1 }}>
            {/* <View> */}
            <Player
              modalVisible={this.closeModal}
              image={this.listSounds[position].image ?? ''}
              name={this.listSounds[position].title}
              position={position}
              listSounds={this.listSounds}
              next={() => {
                this.next(position);
              }}
            />
            {/* <Text>Hello World!</Text>
              <TouchableHighlight
                onPress={() => {
                  this.openModal(!modalVisible);
                }}
              >
                <Text>Hide Modal</Text>
              </TouchableHighlight> */}
            {/* </View> */}
          </View>
        </Modal>

        <View style={styles.containerInfo}>
          <Image
            source={{
              uri:
                'https://blog.pluga.co/uploads/2017/03/podcast-empreendedorismo.jpg',
            }}
            style={styles.imageInfo}
          />
          <View style={styles.containerTitle}>
            <Text style={styles.titleInfo}>
              {this.listSounds[position].title}
            </Text>
            <Text style={styles.titleInfo}>
              {this.listSounds[position].author}
            </Text>
          </View>
        </View>
        <ScrollView>{this.renderCell()}</ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  item: {
    paddingLeft: 20,
    paddingRight: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  title: {
    fontSize: 18,
    color: 'black',
  },
  infoDateTime: {
    marginTop: 5,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  date: {
    fontSize: 10,
    color: 'gray',
  },
  time: {
    fontSize: 10,
    color: 'gray',
    marginLeft: 20,
  },
  iconDownload: {
    width: 20,
    height: 20,
  },
  containerIconDownload: {
    justifyContent: 'center',
  },
  line: {
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    marginLeft: 30,
    marginBottom: 15,
    paddingBottom: 5,
  },
  imageAuthor: {
    width: 50,
    height: 50,
    borderRadius: 10,
    backgroundColor: 'green',
  },
  list: {
    backgroundColor: 'white',
    paddingBottom: 200,
  },
  containerInfo: {
    marginLeft: 40,
    paddingBottom: 30,
    flexDirection: 'row',
    marginTop: 20,
  },
  imageInfo: {
    width: 100,
    height: 100,
    borderRadius: 10,
    backgroundColor: 'green',
  },
  titleInfo: {
    color: 'black',
  },
  containerTitle: {
    marginLeft: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
});
