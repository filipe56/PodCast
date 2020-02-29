import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from 'react-native';
import Video from 'react-native-video';
import { Slider } from 'react-native-elements';

export default class Player extends Component<Props> {
  constructor(props) {
    super(props);

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
      timeCurrent: 0,
    };
  }

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
    const { indexSelected } = this.state;
    const { listSounds } = this.props;

    if (indexSelected === listSounds.length - 1) {
      this.setState({ indexSelected: 0, progress: 0, rate: 1 });
    } else {
      this.setState({ indexSelected: indexSelected + 1, progress: 0, rate: 1 });
    }
  };

  rate = rate => {
    this.setState({ rate, paused: false });
  };

  // handleSongSliderChange = value => {
  //   this.player.songSeekTo(value);
  // };

  onProgress = data => {
    var timestamp = data.currentTime;
    var hours = Math.floor(timestamp / 60 / 60);
    var minutes = Math.floor(timestamp / 60) - hours * 60;
    var seconds = timestamp % 60;
    let time = '0';

    if (hours > 0 && hours < 10) {
      time = `0${hours}:00:00`;
    } else if (hours > 9) {
      time = `${hours}:${minutes}:00`;
    }

    if (minutes > 0 && minutes < 10) {
      time = `${hours}:0${minutes}:00`;
    } else if (minutes > 9) {
      time = `${hours}:${minutes}:00`;
    }

    if (seconds > 0 && minutes < 10) {
      let secondsWithoutMiliseconds = `${seconds}`.slice(0, 1);
      time = `${hours}:${minutes}:0${secondsWithoutMiliseconds}`;
    } else if (minutes > 9) {
      console.warn('foi');

      let secondsWithoutMiliseconds = `${seconds}`.slice(0, 2);
      time = `${hours}:${minutes}:${secondsWithoutMiliseconds}`;
    }

    this.setState({
      progress: timestamp,
      minimumValue: data,
      timeCurrent: time,
    });
  };

  onLoad = data => {
    console.warn('onLoad');
    this.setState({ duration: data.duration, isLoading: false });
  };

  onLoadStart = data => this.setState({ isLoading: true });

  onSongSliderChange = data => {
    this.player.seek(data);
  };

  plus = () => {
    const { velocity } = this.state;

    const rate = velocity + 0.5;
    this.setState({ velocity: rate, rate, paused: false });
  };

  minus = () => {
    const { velocity } = this.state;

    if (velocity > 1) {
      const rate = velocity - 0.5;
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
      timeCurrent,
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
          onEnd={data => {
            this.onEnd();
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
        <View
          style={{
            flexDirection: 'row',
            width: '80%',
            justifyContent: 'space-between',
          }}
        >
          <Text>{`${timeCurrent === 0 ? '0:00' : `${timeCurrent}`}`}</Text>
          <Text>0:00</Text>
        </View>

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
