import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import styles from './Style';

export default class CellSound extends Component {
  constructor(props) {
    super(props);
    this.iconDownload =
      'https://cdn.icon-icons.com/icons2/902/PNG/512/download-1_icon-icons.com_69391.png';
  }

  render() {
    const {
      title,
      onPressCell,
      onPressDownload,
      image,
      date,
      time,
      downloading,
      downloaded,
    } = this.props;
    return (
      <TouchableOpacity key={title} onPress={onPressCell}>
        <View>
          <View style={styles.item}>
            <Image source={{ uri: image }} style={styles.imageAuthor} />
            <View>
              <Text style={styles.title}>{title}</Text>
              <View style={styles.infoDateTime}>
                <Text style={styles.date}>{date}</Text>
                <Text style={styles.time}>{time}</Text>
              </View>
            </View>
            {!downloading && !downloaded ? (
              <TouchableOpacity
                onPress={onPressDownload}
                style={styles.containerIconDownload}
              >
                <Image
                  source={{
                    uri: this.iconDownload,
                  }}
                  style={styles.iconDownload}
                />
              </TouchableOpacity>
            ) : (
              <View style={styles.iconDownload} />
            )}
            {downloading && (
              <ActivityIndicator
                style={{ width: 10, height: 10 }}
                color="green"
              />
            )}
          </View>
          <View style={styles.line} />
        </View>
      </TouchableOpacity>
    );
  }
}
