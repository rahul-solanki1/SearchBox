import React, {useEffect, useState} from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {SearchBox} from '../../Components';
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
        containerStyle={styles.floatingButtom}
        accessible={false}
        onPress={() => onFocusOut()}
      />
      <SearchBox
        value={value}
        highlightWord={helper.getLastWord(value)}
        suggestions={suggestions}
        onValueChange={setValue}
        onFocus={() =>
          value.length && getSuggestions(helper.getLastWord(value))
        }
        onSuggestionSelected={onSuggestionSelected}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  floatingButtom: {
    flex: 1,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export {Home};
