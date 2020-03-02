import React, { Component } from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from 'react-native';
import Video from 'react-native-video';
import { hourComplete } from '../../Util/Util';
import styles from './Style';
import ControlsPlayer from '../../../components/ControlsPlayer/ControlsPlayer';

export default class Player extends Component<Props> {
  constructor(props) {
    super(props);
    this.downIcon = require('../../assets/down.png');

    const { position } = this.props;

    this.state = {
      paused: false,
      rate: 1,
      currentTime: 0,
      duration: 0,
      progress: 0,
      minimumValue: 0,
      indexSelected: position,
      isLoading: false,
      velocity: 1,
      timeCurrent: 0,
      timeTotal: 0,
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

  onProgress = data => {
    var timestamp = data.currentTime;

    this.setState({
      progress: timestamp,
      minimumValue: data,
      timeCurrent: hourComplete(timestamp),
    });
  };

  onLoad = data => {
    const timeTotal = hourComplete(data.duration);
    this.setState({ duration: data.duration, isLoading: false, timeTotal });
  };

  onLoadStart = () => this.setState({ isLoading: true });

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
      duration,
      progress,
      paused,
      indexSelected,
      isLoading,
      velocity,
      timeCurrent,
      timeTotal,
    } = this.state;
    const { modalVisible, image, listSounds } = this.props;

    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={modalVisible} style={styles.buttonBack}>
          <Image source={this.downIcon} style={styles.iconButtonBack} />
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
          // style={{ width: 300, height: 300 }} present video
          paused={paused}
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
        <Image source={{ uri: image }} style={styles.imagePodCast} />
        {isLoading && (
          <View style={styles.containerLoading}>
            <ActivityIndicator size="small" color="#4169E1" />
          </View>
        )}
        <Text style={styles.titleMusic}>{listSounds[indexSelected].title}</Text>
        <ControlsPlayer
          duration={duration}
          progress={progress}
          minus={this.minus}
          plus={this.plus}
          next={this.next}
          back={this.back}
          velocity={velocity}
          paused={paused}
          timeCurrent={timeCurrent}
          timeTotal={timeTotal}
        />
      </View>
    );
  }
}
