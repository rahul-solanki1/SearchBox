import React from 'react';
import {StyleProp, StyleSheet, Text, TextStyle} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

interface Props {
  value: string;
  highlightWord?: string;
  textStyle?: StyleProp<TextStyle>;
  highlightedTextStyle?: StyleProp<TextStyle>;
  onSelected?: (value: string) => void;
}

/**
 *
 * @param {string} value text to show
 * @param {string}  highlightWord text that should be highlighted in the passed value
 * @param {TextStyle} textStyle Add style for the text
 * @param {TextStyle} highlightedTextStyle Add style for highlighted text
 * @param {(value: string) => void} onSelected Gives callback when the text is pressed.
 *
 */
const HighlightText: React.FC<Props> = (props) => {
  const {
    value,
    highlightWord = '',
    textStyle,
    highlightedTextStyle,
    onSelected,
  } = props;

  // Used regex to split the suggestion string matching with the highlighted word.
  const parts = value.split(new RegExp(`(${highlightWord})`, 'gi'));

  // If highlighted word is not provided, simply show the value. If word is present, run map function and check whether the items in the parts match the
  // highlighted word. If yes then created the text with highlighted style. If no directory return the string.
  const elements = highlightWord.length
    ? parts.map((part, index) => {
        if (part.toLowerCase() === highlightWord.toLowerCase()) {
          return (
            <Text
              key={index}
              style={[styles.highlightWord, highlightedTextStyle]}>
              {part}
            </Text>
          );
        }
        return part;
      })
    : value;

  // Render the mapped elements inside a text.
  return (
    <TouchableOpacity onPress={() => onSelected && onSelected(value)}>
      <Text style={[styles.itemText, textStyle]}>{elements}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  itemText: {
    color: '#19384a',
    fontWeight: '600',
    borderColor: 'gray',
    padding: 10,
  },
  highlightWord: {
    backgroundColor: 'yellow',
  },
});

export {HighlightText};
