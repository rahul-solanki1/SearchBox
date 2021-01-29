import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {SearchBox} from '../../Components';
import {MockAPI} from '../../Services/API';
import {helper} from '../../Util';

const Home: React.FC<{}> = () => {
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const placeholder = 'Please enter the search query into the widget.';

  const getSuggestions = (word: string) => {
    if (word.length === 0) {
      return;
    }

    MockAPI.getSuggestions(word)
      .then((values) => {
        let suggestionList = values as string[];
        console.log(suggestionList);
        setSuggestions(suggestionList);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onValueChange = (value: string) => {
    const word = helper.getLastWord(value);
    getSuggestions(word);
  };

  const onFocus = (text: string) => {
    text.length && getSuggestions(helper.getLastWord(text));
  };

  return (
    <View style={styles.container}>
      <SearchBox
        containerStyle={styles.searchBox}
        // inputBoxStyle={styles.inputBoxStyle}
        // inputBoxFocusedStyle={styles.inputBoxFocusedStyle}
        // suggestionContainerStyle={styles.listStyle}
        // textStyle={styles.textStyle}
        // highlightedTextStyle={styles.highlightedTextStyle}
        suggestions={suggestions}
        onValueChange={onValueChange}
        placeholder={placeholder}
        onFocus={onFocus}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchBox: {
    marginHorizontal: 10,
  },
  inputBoxStyle: {
    borderColor: 'gray',
    borderRadius: 0,
  },
  inputBoxFocusedStyle: {
    borderColor: 'green',
  },
  listStyle: {
    padding: 10,
  },
  textStyle: {
    color: 'gray',
  },
  highlightedTextStyle: {
    color: 'green',
    backgroundColor: 'red',
  },
});

export {Home};
