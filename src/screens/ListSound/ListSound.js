import React, { Component } from 'react';
import { Image, Text, View, Modal, ScrollView } from 'react-native';
import { downloadFile } from '../../service/audio';
import Player from '../Player/Player';
import RNFetchBlob from 'rn-fetch-blob';
import styles from './Styles';
import CellSound from '../../../components/CellSound/CellSound';

export default class ListSound extends Component {
  constructor(props) {
    super(props);
    this.data = props.navigation.getParam('ListSound');
    this.author = this.data.author;
    this.listSounds = this.data.sounds;

    this.state = {
      modalVisible: false,
      position: 0,
      listSounds: this.listSounds,
    };
  }

  static navigationOptions = {
    title: 'Lista de Sons',
  };

  closeModal = () => {
    this.setState({ modalVisible: false });
  };

  openModal = (modalVisible, index) => {
    this.setState({ modalVisible, position: index });
  };

  searchMusic = async (PATH_TO_READ, index) => {
    await RNFetchBlob.fs
      .readFile(PATH_TO_READ)
      .then(() => {
        this.listSounds[index] = {
          ...this.listSounds[index],
          sound: PATH_TO_READ,
          downloaded: true,
          downloading: false,
        };
      })
      .catch(error => {
        this.listSounds[index] = {
          ...this.listSounds[index],
          downloaded: false,
          downloading: false,
        };
      });
  };

  componentDidMount = () => {
    this.hasSave();
  };

  hasSave = () => {
    const PATH_DEFAULT = '/data/user/0/com.podcast/files/';
    this.listSounds.forEach(async (element, index) => {
      await this.searchMusic(`${PATH_DEFAULT}${element.sound}`, index);
    });
    this.setState({ listSounds: this.listSounds });
  };

  download = (url, index) => {
    this.listSounds[index] = { ...this.listSounds[index], downloading: true };
    this.setState({ listSounds: this.listSounds });
    downloadFile(url)
      .then(res => {
        this.listSounds[index] = {
          ...this.listSounds[index],
          downloading: false,
          downloaded: true,
        };
        this.setState({ listSounds: this.listSounds });
        this.hasSave();
      })
      .catch(err => {
        this.listSounds[index] = {
          ...this.listSounds[index],
          downloaded: true,
          downloading: false,
        };
        this.setState({ listSounds: this.listSounds });
        console.warn('The file err ', err);
      });
  };

  renderCell() {
    const { modalVisible, listSounds } = this.state;

    return listSounds.map((item, index) => (
      <View>
        <CellSound
          title={item.title}
          onPressCell={() => {
            this.openModal(!modalVisible, index);
          }}
          onPressDownload={() => {
            this.download(item.sound, index);
          }}
          image={item.image}
          date={item.date}
          time={item.time}
          sound={item.sound}
          downloading={item.downloading}
          downloaded={item.downloaded}
        />
      </View>
    ));
  }

  render() {
    const { modalVisible, position, listSounds } = this.state;

    return (
      <View style={styles.container}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={modalVisible}
          onRequestClose={this.closeModal}
          style={styles.modalStyle}
        >
          <View style={styles.containerPlayer}>
            <Player
              modalVisible={this.closeModal}
              position={position}
              listSounds={listSounds}
              next={() => {
                this.next(position);
              }}
              image={this.data.image}
            />
          </View>
        </Modal>
        <View style={styles.containerInfo}>
          <Image source={{ uri: this.data.image }} style={styles.imageInfo} />
          <View style={styles.containerTitle}>
            <Text style={styles.titleInfo}>{listSounds[position].title}</Text>
            <Text style={styles.titleInfo}>{this.author}</Text>
          </View>
        </View>
        <ScrollView>{this.renderCell()}</ScrollView>
      </View>
    );
  }
}
