import React, {useState} from 'react';

import {StyleSheet, View} from 'react-native';

import {SearchBox} from '../../Components';

import {MockAPI} from '../../Services/API';

import {helper} from '../../Util';

const Home: React.FC<{}> = () => {
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const placeholder = 'Please enter the search query into the widget.';

  /**
   *
   * @param {string} word Pass the word to fetch suggestions from Mock API
   */
  const getSuggestions = (word: string) => {
    /**
     * If word is empty, fetching suggestion is discarded.
     */
    if (!word.length) {
      return;
    }

    MockAPI.getSuggestions(word)
      .then((values) => {
        let suggestionList = values;

        console.log(suggestionList);

        setSuggestions(suggestionList);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  /**
   * Callback when value is updated in SearchBox.
   * @param {string} value Gives updated value of the SearchBox
   */
  const onFocusOrValueChange = (value: string) => {
    /**
     * Get the last word of the value using helper method
     */
    const word = helper.getLastWord(value);
    /**
     * Pass the word to getSuggestion method.
     */
    getSuggestions(word);
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
        onValueChange={onFocusOrValueChange}
        onFocus={onFocusOrValueChange}
        placeholder={placeholder}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
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
