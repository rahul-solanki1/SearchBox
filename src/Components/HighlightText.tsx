import React from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
} from 'react-native';

interface Props {
  value: string;
  highlightWord?: string;
  textStyle?: StyleProp<TextStyle>;
  highlightedTextStyle?: StyleProp<TextStyle>;
  onSelected?: (value: string) => void;
}

const HighlightText: React.FC<Props> = (props) => {
  const {
    value,
    highlightWord = '',
    textStyle,
    highlightedTextStyle,
    onSelected,
  } = props;

  const parts = value.split(new RegExp(`(${highlightWord})`, 'gi'));

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

  return (
    <TouchableOpacity onPress={() => onSelected && onSelected(value)}>
      <Text style={[styles.itemText, textStyle]}>{elements}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  itemText: {
    borderColor: 'gray',
    padding: 10,
  },
  highlightWord: {
    backgroundColor: 'yellow',
  },
});

export {HighlightText};
