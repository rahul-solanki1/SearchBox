import React, {useCallback, useEffect, useRef, useState} from 'react';

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

const INTERVAL = 500;

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
  const [value, setValue] = useState(''); // Hold the current value typed in input box

  const [highlightWord, setHighlightWord] = useState(''); // Hold highlighted word

  const [suggestions, setSuggestions] = useState<string[]>([]); // Hold suggestions list

  const textInput = useRef<TextInput>(null); // Keeping the text input reference for focusing out when tapped outside.

  // props destructuring.
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

  /**
   * Executre the useEffect when new suggestions list is received
   */
  useEffect(() => {
    setHighlightWord(helper.getLastWord(value)); // Get the last word from the value to update the highlight

    setSuggestions(props.suggestions || []); // Set the props list to internal suggestion list.
  }, [props.suggestions]);

  /**
   * Called when user tap outside the SearchBox
   */
  const onFocusOut = () => {
    Keyboard.dismiss(); // Dismiss the keyboard

    setSuggestions([]); // Empty the suggestion to hide the list.
  };

  /**
   * Callback when the item in the suggestion list is selected
   * @param {string} selectedItem Selected Item
   */
  const onSelected = (selectedItem: string) => {
    setSuggestions([]); //Empty the list

    // Get the last word index and create a sub string from 0 index to the last index where the searching word starts.
    const newValue =
      value.substr(0, value.lastIndexOf(helper.getLastWord(value))) +
      `${selectedItem} `; // Create the newValue from selected word. And append extra space at the end for continuous typing.
    console.log(textInput.current);
    setValue(newValue); // Set the newValue to state hook
    onValueChange && onValueChange(newValue); // If props contains value change listener then update the parent for value change.
    textInput.current?.focus(); // Bring the focus to text input for continuous typing.
  };

  // Callback for debouncing function.
  const callback = useCallback(
    helper.debounce((text: string) => {
      setValue(text);
      setSuggestions([]);
      onValueChange && onValueChange(text);
    }, INTERVAL),
    [],
  );

  return (
    <>
      {/*  Floating button for dismissing the text input focus mode. */}
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
          onChange={(e) => setValue(e.nativeEvent.text)}
          // Added debounce to ignore calling getsuggestion continuosly, so that user experience can be improved.
          value={value}
          onChangeText={callback}
          placeholder={placeholder}
          autoCorrect={false} // Disable auto correct for the input field.
          onFocus={() => onFocus && onFocus(value)} // When input text comes in focus and last word is not ending with space we fetch the suggest list.
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
