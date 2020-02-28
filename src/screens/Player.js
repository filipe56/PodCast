import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Button,
  Image,
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from 'react-native';
import Video from 'react-native-video';
import { Slider } from 'react-native-elements';
import Icon from '../assets/index';
// import moment from 'moment';

export default class Player extends Component<Props> {
  constructor(props) {
    super(props);
    this.listUri = [
      'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
      'https://s3.eu-west-3.amazonaws.com/evolum/beginner_1.mp3',
      'https://m.toqueparacelular.com.br/n04/Star_Wars_Remix.mp3',
    ];

    this.playIcon = require('../assets/play.png');
    this.pauseIcon = require('../assets/pause.png');
    this.nextIcon = require('../assets/next.png');
    this.backIcon = require('../assets/back.png');
    this.downIcon = require('../assets/down.png');
    this.plusIcon = require('../assets/plus.png');
    this.minusIcon = require('../assets/minus.png');

    const { position } = this.props;

    this.state = {
      paused: false,
      rate: 1,
      value: 0,
      currentTime: 0,
      duration: 0,
      progress: 0,
      minimumValue: 0,
      indexSelected: position,
      isLoading: false,
      velocity: 1,
    };
  }

  // componentDidMount = () => {
  //   console.warn('position- didmount', position);

  //   this.setState({ indexSelected: position });
  // };

  play = () => {
    this.setState({ paused: false });
  };

  next = () => {
    const { listSounds } = this.props;
    const { indexSelected } = this.state;

    const hasPlusAudio = indexSelected < listSounds.length - 1;

    this.setState({ indexSelected: hasPlusAudio ? indexSelected + 1 : 0 });
  };

  back = () => {
    const { listSounds } = this.props;
    const { indexSelected } = this.state;

    const hasBackAudio = indexSelected > 0;

    this.setState({
      indexSelected: hasBackAudio ? indexSelected - 1 : listSounds.length - 1,
    });
  };

  pause = () => {
    this.setState({ paused: true });
  };

  onEnd = () => {
    const { value } = this.state;
    this.setState({ value: value + 1 });
  };

  rate(rate) {
    this.setState({ rate, paused: false });
  }

  handleSongSliderChange = value => {
    this.player.songSeekTo(value);
  };

  onProgress = data => {
    this.setState({ progress: data.currentTime, minimumValue: data });
  };

  onLoad = data => {
    // console.warn('onLoad');
    this.setState({ duration: data.duration, isLoading: false });
  };

  onLoadStart = data => this.setState({ isLoading: true });

  onSongSliderChange = data => {
    this.player.seek(data);
  };

  plus = () => {
    const { velocity } = this.state;

    const rate = velocity + 1;
    this.setState({ velocity: rate, rate, paused: false });
  };

  minus = () => {
    const { velocity } = this.state;
    if (velocity > 1) {
      // this.state({ velocity: velocity - 1 });
      const rate = velocity - 1;
      this.setState({ velocity: rate, rate, paused: false });
    }
  };

  render() {
    const {
      rate,
      value,
      duration,
      progress,
      paused,
      indexSelected,
      isLoading,
      velocity,
    } = this.state;
    const {
      modalVisible,
      image,
      name,
      sound,
      next,
      listSounds,
      position,
    } = this.props;
    console.warn('title', listSounds[indexSelected]);

    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={modalVisible}
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            width: '90%',
            paddingTop: 20,
            paddingBottom: 20,
          }}
        >
          <Image source={this.downIcon} style={{ height: 20, width: 20 }} />
        </TouchableOpacity>
        <Video
          source={{
            uri: listSounds[indexSelected].sound,
          }}
          ref={ref => {
            this.player = ref;
          }}
          onBuffer={this.onBuffer}
          onEnd={this.onEnd}
          onError={this.videoError}
          style={styles.backgroundVideo}
          // style={{ width: 300, height: 300 }}
          paused={paused}
          // controls
          playInBackground={true}
          rate={rate}
          onProgress={data => {
            this.onProgress(data);
          }}
          onLoad={data => {
            this.onLoad(data);
          }}
          onLoadStart={this.onLoadStart}
          playWhenInactive
          lockPortraitOnFsExit
          controlDuration={3}
        />
        <Image
          source={{ uri: image }}
          style={{ height: 300, width: 300, borderRadius: 10 }}
        />

        {isLoading && (
          <View
            style={{
              backgroundColor: 'rgba(200, 200, 200, 0.3)',
              width: 300,
              height: 300,
              position: 'absolute',
              marginTop: 60,
              borderRadius: 10,
              justifyContent: 'center',
            }}
          >
            <ActivityIndicator size="large" color="#4169E1" />
          </View>
        )}
        <Text
          style={{
            paddingBottom: 10,
            marginTop: 20,
            fontSize: 20,
            color: 'black',
          }}
        >
          {listSounds[indexSelected].title}
        </Text>
        <Slider
          style={styles.playerSlider}
          thumbStyle={styles.playerThumb}
          minimumTrackTintColor="#4169E1"
          maximumTrackTintColor="gray"
          minimumValue={0}
          maximumValue={duration}
          onValueChange={this.onSongSliderChange}
          value={progress}
        />
        <View style={styles.containerControls}>
          <TouchableOpacity onPress={this.back}>
            <Image source={this.backIcon} style={{ height: 40, width: 40 }} />
          </TouchableOpacity>
          {paused && (
            <TouchableOpacity onPress={this.play}>
              <Image source={this.playIcon} style={{ height: 40, width: 40 }} />
            </TouchableOpacity>
          )}
          {!paused && (
            <TouchableOpacity onPress={this.pause}>
              <Image
                source={this.pauseIcon}
                style={{ height: 40, width: 40 }}
              />
            </TouchableOpacity>
          )}

          <TouchableOpacity
            onPress={() => {
              this.next();
            }}
          >
            <Image source={this.nextIcon} style={{ height: 40, width: 40 }} />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: 'row',
            paddingTop: 20,
            width: '30%',
            justifyContent: 'space-around',
            alignItems: 'center',
            alignSelf: 'center',
          }}
        >
          <TouchableOpacity onPress={this.minus}>
            <Image source={this.minusIcon} style={{ height: 10, width: 10 }} />
          </TouchableOpacity>
          <Text style={{ fontSize: 15 }}>{`${velocity} x`}</Text>
          <TouchableOpacity onPress={this.plus}>
            <Image source={this.plusIcon} style={{ height: 10, width: 10 }} />
          </TouchableOpacity>
          {/* 
          <Button onPress={() => this.rate(1)} title="1x"></Button>
          <Button onPress={() => this.rate(1.5)} title="1.5x"></Button>
          <Button onPress={() => this.rate(2)} title="2x"></Button> */}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  containerControls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingTop: 20,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  toolbar: {
    marginTop: 30,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
  },
  mediaPlayer: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: 'black',
  },
  playerSlider: {
    width: '80%',
    marginLeft: 20,
    marginRight: 20,
  },
  playerThumb: {
    width: 16,
    height: 16,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#4169E1',
  },
  trackStyle: {
    backgroundColor: 'red',
  },
});
