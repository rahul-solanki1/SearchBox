import React, {useRef} from 'react';
import {StyleProp, StyleSheet, TextInput, View, ViewStyle} from 'react-native';
import {SuggestionList} from './SuggestionList';

interface Props {
  value?: string;
  highlightWord?: string;
  onFocus?: () => void;
  onValueChange?: (value: string) => void;
  onSuggestionSelected?: (value: string) => void;
  suggestions?: string[];
  style?: StyleProp<ViewStyle>;
}

const SearchBox: React.FC<Props> = (props) => {
  const textInput = useRef<TextInput>(null);

  const {
    value,
    onValueChange,
    suggestions,
    highlightWord = '',
    onSuggestionSelected,
  } = props;

  const onSelected = (selectedItem: string) => {
    onSuggestionSelected && onSuggestionSelected(`${selectedItem} `);
    textInput.current?.focus();
  };

  return (
    <View style={[styles.container, props.style]}>
      <TextInput
        ref={textInput}
        style={[
          styles.textInput,
          textInput.current?.isFocused() && styles.textInputFocused,
        ]}
        onChangeText={onValueChange}
        autoCorrect={false}
        value={value}
        onFocus={props.onFocus}
      />
      <SuggestionList
        suggestions={suggestions}
        highlightWord={highlightWord}
        onSelected={onSelected}
      />
    </View>
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
});

export {SearchBox};
