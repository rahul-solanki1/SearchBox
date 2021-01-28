import React, {useEffect, useState} from 'react';
import {Keyboard, StyleSheet, View} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {AutocompleteInput} from '../../Components';
import {MockAPI} from '../../Services/API';
import {helper} from '../../Util';

const Home: React.FC<{}> = () => {
  const [value, setValue] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);

  useEffect(() => {
    const word = helper.getLastWord(value);

    getSuggestions(word);
  }, [value]);

  const getSuggestions = (word: string) => {
    if (word.length === 0) {
      setSuggestions([]);
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

  const onSuggestionSelected = (item: string) => {
    setSuggestions([]);

    setValue(
      value.substr(0, value.lastIndexOf(helper.getLastWord(value))) + item,
    );
  };

  const onFocusOut = () => {
    Keyboard.dismiss();
    setSuggestions([]);
  };

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback
        containerStyle={styles.container}
        accessible={false}
        onPress={() => onFocusOut()}>
        <AutocompleteInput
          value={value}
          highlightWord={helper.getLastWord(value)}
          suggestion={suggestions}
          onValueChange={setValue}
          onFocus={() =>
            value.length && getSuggestions(helper.getLastWord(value))
          }
          onSuggestionSelected={onSuggestionSelected}
        />
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export {Home};
