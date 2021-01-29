import React from 'react';
import {
  StyleProp,
  StyleSheet,
  FlatList,
  TextStyle,
  ViewStyle,
} from 'react-native';
import {HighlightText} from './HighlightText';

interface Props {
  suggestions?: string[];
  highlightWord?: string;
  onSelected?: (value: string) => void;
  listStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  highlightedTextStyle?: StyleProp<TextStyle>;
}

const SuggestionList: React.FC<Props> = (props) => {
  const {
    suggestions,
    highlightWord,
    onSelected,
    listStyle,
    textStyle,
    highlightedTextStyle,
  } = props;

  if (suggestions && !suggestions.length) {
    return null;
  }

  return (
    <FlatList
      style={[styles.suggestionList, listStyle]}
      data={suggestions}
      keyExtractor={(item, index) => `${index}`}
      keyboardShouldPersistTaps="handled"
      renderItem={({item}) => (
        <HighlightText
          value={item}
          highlightWord={highlightWord}
          onSelected={onSelected}
          textStyle={textStyle}
          highlightedTextStyle={highlightedTextStyle}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  suggestionList: {
    backgroundColor: 'white',
    borderColor: 'gray',
    borderRadius: 10,
    borderWidth: 0.5,
    left: 10,
    right: 10,
    position: 'absolute',
    top: 50,
  },
  itemText: {
    borderColor: 'gray',
    padding: 10,
  },
});

export {SuggestionList};
