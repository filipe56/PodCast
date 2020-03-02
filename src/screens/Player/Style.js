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
  titleMusic: {
    paddingBottom: 10,
    marginTop: 20,
    fontSize: 20,
    color: 'black',
  },
  containerLoading: {
    backgroundColor: 'rgba(200, 200, 200, 0.3)',
    width: 300,
    height: 300,
    position: 'absolute',
    marginTop: 60,
    borderRadius: 10,
    justifyContent: 'center',
  },
  buttonBack: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: '90%',
    paddingTop: 20,
    paddingBottom: 20,
  },
  iconButtonBack: {
    height: 20,
    width: 20,
  },
  imagePodCast: {
    height: 300,
    width: 300,
    borderRadius: 10,
  },
});
