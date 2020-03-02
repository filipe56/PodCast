import React, { Component } from 'react';
import { View, Image, TouchableOpacity, Text } from 'react-native';
import { Slider } from 'react-native-elements';
import styles from './Style';

export default class ControlsPlayes extends Component {
  constructor(props) {
    super(props);
    this.playIcon = require('../../src/assets/play.png');
    this.pauseIcon = require('../../src/assets/pause.png');
    this.nextIcon = require('../../src/assets/next.png');
    this.backIcon = require('../../src/assets/back.png');
    this.plusIcon = require('../../src/assets/plus.png');
    this.minusIcon = require('../../src/assets/minus.png');
  }

  render() {
    const {
      duration,
      progress,
      timeCurrent,
      timeTotal,
      paused,
      next,
      back,
      velocity,
      plus,
      minus,
    } = this.props;

    return (
      <View>
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
          <Text>{`${timeTotal === 0 ? '0:00' : `${timeTotal}`}`}</Text>
        </View>

        <View style={styles.containerControls}>
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

          <TouchableOpacity onPress={next}>
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
          <TouchableOpacity onPress={minus}>
            <Image
              source={this.minusIcon}
              style={{ height: 10, width: 10, padding: 8.5 }}
            />
          </TouchableOpacity>
          <Text style={{ fontSize: 15 }}>{`${velocity} x`}</Text>
          <TouchableOpacity onPress={plus}>
            <Image
              source={this.plusIcon}
              style={{ height: 10, width: 10, padding: 8.5 }}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
