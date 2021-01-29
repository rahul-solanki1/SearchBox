import React, {useEffect, useRef, useState} from 'react';

import {
  Keyboard,
  StyleProp,
  StyleSheet,
  TextInput,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';

import {TouchableWithoutFeedback} from 'react-native-gesture-handler';

import {helper} from '../../Util';

import {SuggestionList} from './SuggestionList';

interface Props {
  placeholder?: string;
  value?: string;
  highlightWord?: string;
  onFocus?: (text: string) => void;
  onValueChange?: (value: string) => void;
  onSuggestionSelected?: (value: string) => void;
  suggestions?: string[];
  containerStyle?: StyleProp<ViewStyle>;
  inputBoxStyle?: StyleProp<ViewStyle>;
  inputBoxFocusedStyle?: StyleProp<ViewStyle>;
  suggestionContainerStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  highlightedTextStyle?: StyleProp<TextStyle>;
}

/**
 * @param {string} placeholder show your placeholder for search box
 * @param {string} value assign default value to search box
 * @param  {string} highlightWord provide a word to highlight in suggestion list
 * @param {(text: string) => void} onFocus called when search box is tapped in.
 * @param {(value: string) => void} onValueChange called each time when value is change in search box
 * @param { (value: string) => void} onSuggestionSelected called when item is selected from suggestion list
 * @param {string[]} suggestions provide suggestion list of type string to show
 * @param {StyleProp<ViewStyle>} containerStyle style the outer search container
 * @param {StyleProp<ViewStyle>} inputBoxStyle apply style on input box
 * @param {StyleProp<ViewStyle>} inputBoxFocusedStyle apply the prefered style when search box is focused
 * @param {StyleProp<ViewStyle>} suggestionContainerStyle style your suggestion list container
 * @param {StyleProp<TextStyle>} textStyle style the text present insdie suggestion list
 * @param {StyleProp<TextStyle>} highlightedTextStyle style how the word should highlight in suggestion list
 */
const SearchBox: React.FC<Props> = (props) => {
  const [value, setValue] = useState('');

  const [highlightWord, setHighlightWord] = useState('');

  const [suggestions, setSuggestions] = useState<string[]>([]);

  const textInput = useRef<TextInput>(null);

  const {
    suggestionContainerStyle,
    textStyle,
    highlightedTextStyle,
    placeholder,
    inputBoxStyle,
    inputBoxFocusedStyle,
    containerStyle,
    onValueChange,
    onFocus,
  } = props;

  useEffect(() => {
    setHighlightWord(helper.getLastWord(value));
    setSuggestions(props.suggestions || []);
  }, [props.suggestions]);

  const onFocusOut = () => {
    Keyboard.dismiss();
    setSuggestions([]);
  };

  const onSelected = (selectedItem: string) => {
    setSuggestions([]);

    const newValue =
      value.substr(0, value.lastIndexOf(helper.getLastWord(value))) +
      `${selectedItem} `;

    setValue(newValue);
    onValueChange && onValueChange(newValue);
    textInput.current?.focus();
  };

  return (
    <>
      <TouchableWithoutFeedback
        containerStyle={styles.floatingButtom}
        accessible={false}
        onPress={() => onFocusOut()}
      />
      <View style={[styles.container, containerStyle]}>
        <TextInput
          ref={textInput}
          style={[
            styles.textInput,
            inputBoxStyle,
            textInput.current?.isFocused() &&
              Object.assign(styles.textInputFocused, inputBoxFocusedStyle),
          ]}
          onChangeText={helper.debounce((text: string) => {
            setValue(text);
            setSuggestions([]);
            onValueChange && onValueChange(text);
          })}
          placeholder={placeholder}
          autoCorrect={false}
          onFocus={() => {
            setSuggestions([]);
            onFocus && onFocus(value);
          }}
        />
        <SuggestionList
          listStyle={suggestionContainerStyle}
          textStyle={textStyle}
          highlightedTextStyle={highlightedTextStyle}
          suggestions={suggestions}
          highlightWord={highlightWord}
          onSelected={onSelected}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    zIndex: 10,
  },
  textInput: {
    backgroundColor: 'white',
    color: '#19384a',
    fontWeight: '700',
    borderRadius: 10,
    height: 40,
    paddingHorizontal: 15,
    shadowColor: 'gray',
    shadowOpacity: 1,
    shadowRadius: 3,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    elevation: 12,
  },
  textInputFocused: {},
  floatingButtom: {
    flex: 1,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export {SearchBox};
