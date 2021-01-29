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
            textInput.current?.isFocused() && inputBoxFocusedStyle,
          ]}
          onChangeText={(text) => {
            setValue(text);
            setSuggestions([]);
            onValueChange && onValueChange(text);
          }}
          placeholder={placeholder}
          autoCorrect={false}
          value={value}
          onFocus={() => onFocus && onFocus(value)}
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
    borderColor: 'gray',
    borderRadius: 10,
    borderWidth: 0.5,
    height: 40,
    paddingHorizontal: 10,
  },
  textInputFocused: {
    borderColor: 'blue',
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

export {SearchBox};
