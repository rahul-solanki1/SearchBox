import React from 'react';

import {
  StyleProp,
  StyleSheet,
  FlatList,
  TextStyle,
  ViewStyle,
  View,
} from 'react-native';

import {HighlightText} from '../HighlightText';

interface Props {
  suggestions?: string[];
  highlightWord?: string;
  onSelected?: (value: string) => void;
  listStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  highlightedTextStyle?: StyleProp<TextStyle>;
}

/**
 *
 * @param {string[]} suggestions The string list to show drop down suggestions
 * @param {string}  highlightWord The string that needs to be highlighted in the suggestion dropdown list
 * @param {TextStyle} listStyle The container style of the list
 * @param {TextStyle} textStyle Add style for the text
 * @param {TextStyle} highlightedTextStyle Add style for highlighted text
 * @param {(value: string) => void} onSelected Gives callback when the text is pressed.
 *
 */
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
    <View style={[styles.suggestionList, listStyle]}>
      <FlatList
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
    </View>
  );
};

const styles = StyleSheet.create({
  suggestionList: {
    backgroundColor: 'white',
    borderColor: 'black',
    borderRadius: 10,
    borderWidth: 0,
    position: 'absolute',
    top: 45,
    left: 0,
    right: 0,
    shadowColor: 'gray',
    shadowOpacity: 1,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    elevation: 12,
  },
  itemText: {
    padding: 10,
  },
});

export {SuggestionList};
