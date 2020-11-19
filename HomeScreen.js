import * as React from 'react';
import {  Text,View, StyleSheet, TextInput, TouchableOpacity, Image} from 'react-native';
import { Header } from 'react-native-elements';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      text: '',
      isSearchPressed: false,
      word: 'Loading…',
      lexicalCategory: '',
      examples: [],
      definition: '',
    };
  }
   
  getWord = (word) => {
    var searchKeyword = word.toLowerCase();
    var url =
      'https://rupinwhitehatjr.github.io/dictionary/' + searchKeyword + '.json';
    return fetch(url)
      .then((data) => {
        if (data.status === 200) {
          return data.json();
        } else {
          return null;
        }
      })
      .then((response) => {
        var responseObject = response;
        if (responseObject) {
          var wordData = responseObject.definitions[0];
          var definition = wordData.description;
          var lexicalCategory = wordData.wordtype;
          this.setState({
            word: this.state.text,
            definition: definition,
            lexicalCategory: lexicalCategory,
          });
        } else {
          this.setState({
            word: this.state.text,
            definition: 'Not Found',
          });
          alert('Try searching for another word');
        }
      });
  };

  render() {
    return (
      <View style={{ height: 580, backgroundColor: '#5E88FC' }}>
        <Header
          backgroundColor={'#74D'}
          centerComponent={{
            text: 'Dictionary',
            style: { color: '#74DBEF', fontSize: 24, fontWeight: 'bold' },
          }}
        />

        <Image
          style={{ width: 324, height: 170, marginLeft: 0 }}
          source={require('./assets/letters.jpg')}
        />

        <TextInput
          style={styles.inputBox}
          onChangeText={(text) => {
            this.setState({
              text: text,
              isSearchPressed: false,
              word: 'Loading…',
              lexicalCategory: '',
              examples: [],
              definition: '',
            });
          }}
          value={this.state.text}
        />

        <TouchableOpacity
          style={{ width: 33, height: 33 }}
          onPress={() => {
            this.setState({ isSearchPressed: true });
            this.getWord(this.state.text);
          }}>
          <Image
            style={{ width: 33, height: 33, marginLeft: 283, marginTop: -33 }}
            source={require('./assets/search.png')}
          />
        </TouchableOpacity>

        <Text style={styles.text1}>Word:{''}</Text>
        <Text style={styles.text2}>{this.state.word}</Text>

        <Text style={styles.text3}>Type:{''}</Text>
        <Text style={styles.text2}>{this.state.lexicalCategory}</Text>

        <Text style={styles.text4}>Definition:{''}</Text>
        <Text style={styles.text5}>{this.state.definition}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  inputBox: {
    marginTop: 20,
    width: '80%',
    alignSelf: 'center',
    height: 40,
    textAlign: 'center',
    borderWidth: 4,
    marginLeft: -30,
    borderColor: '#ADD',
  },
  text1: {
    fontSize: 20,
    color: '#AFFFFF',
    fontWeight: 'bold',
  },
  text2: {
    fontSize: 20,
    color: 'yellow',
    fontWeight: 'bold',
    marginTop: -24,
    marginLeft: 90,
  },
  text3: {
    fontSize: 20,
    color: '#AFFFFF',
    fontWeight: 'bold',
    marginTop: 10,
  },
  text4: {
    fontSize: 20,
    color: '#AFFFFF',
    fontWeight: 'bold',
    marginTop: 30,
  },
  text5: {
    fontSize: 20,
    color: 'yellow',
    fontWeight: 'bold',
  },
});