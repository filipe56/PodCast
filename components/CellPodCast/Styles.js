import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
  containerTop: {
    marginTop: 10,
  },
  item: {
    paddingLeft: 20,
    paddingRight: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    flexDirection: 'row',
  },
  title: {
    fontSize: 15,
    marginLeft: 20,
    color: '#4169E1',
  },
  author: {
    fontSize: 10,
    marginLeft: 20,
    marginTop: 5,
    color: 'gray',
  },
  line: {
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    marginLeft: 20,
    marginBottom: 15,
    paddingBottom: 5,
  },
  imageAuthor: {
    width: 50,
    height: 50,
    borderRadius: 10,
  },
});
