import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
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
});
