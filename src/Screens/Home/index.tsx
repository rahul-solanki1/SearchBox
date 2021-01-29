import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';

import {SearchBox} from '../../Components';
import {MockAPI} from '../../Services/API';
import {helper} from '../../Util';

const Home: React.FC<{}> = () => {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const placeholder = 'Just start typing...';

  /**
   *
   * @param {string} word Pass the word to fetch suggestions from Mock API
   */
  const getSuggestions = (word: string) => {
    if (!word.length) {
      return;
    }
    MockAPI.getSuggestions(word)
      .then((values) => {
        console.log(values);
        setSuggestions(values);
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
    const word = helper.getLastWord(value);
    getSuggestions(word);
  };

  return (
    <View style={styles.container}>
      <SearchBox
        containerStyle={styles.searchBox}
        placeholder={placeholder}
        suggestions={suggestions}
        onValueChange={onFocusOrValueChange}
        onFocus={onFocusOrValueChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F6F7',
  },
  searchBox: {
    marginHorizontal: 10,
  },
});

export {Home};
