import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
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
