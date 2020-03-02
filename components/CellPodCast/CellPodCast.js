import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import PropTypes from 'prop-types';
import styles from './Styles';

/**
 * @class CellPodCast
 * @extends Component
 * @description Célula que informa o nome do podcast e o autor
 * @version 0.0.1
 * @example
 * <CellPodCast title={"Titulo do PodCast"}
 * author='PodCast author' image={'https://blog.pluga.co/uploads/2017/03/podcast-empreendedorismo.jpg'} onPress={() => {}}/>
 */
export default class CellPodCast extends Component {
  render() {
    const { image, title, author, onPress } = this.props;
    return (
      <TouchableOpacity key={title} onPress={onPress}>
        <View style={styles.containerTop}>
          <View style={styles.item}>
            <Image source={{ uri: image }} style={styles.imageAuthor} />
            <View>
              <Text style={styles.title}>{title}</Text>
              <Text style={styles.author}>{author}</Text>
            </View>
          </View>
          <View style={styles.line} />
        </View>
      </TouchableOpacity>
    );
  }
}

/**
 * Prop-Types
 */
CellPodCast.propTypes = {
  /**
   * @prop {string} title - Texto de titulo da celula
   */
  title: PropTypes.string,
  /**
   * @prop {string} image - uri da imagem
   */
  image: PropTypes.string,
  /**
   * @prop {string} author - Nome do autor
   */
  author: PropTypes.string,
  /**
   * @prop {bool} onPress - Ação quando preciona a célula
   */
  onPress: PropTypes.function,
};
