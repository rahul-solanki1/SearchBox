import React, {useRef} from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  View,
  ViewStyle,
  FlatList,
  useWindowDimensions,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

interface Props {
  value?: string;
  style?: StyleProp<ViewStyle>;
  highlightWord?: string;
  onFocus?: () => void;
  onValueChange?: (value: string) => void;
  onSuggestionSelected?: (value: string) => void;
  suggestion: string[];
}

const AutocompleteInput: React.FC<Props> = (props) => {
  const textInput = useRef<TextInput>(null);

  const {
    value,
    onValueChange,
    suggestion,
    highlightWord = '',
    onSuggestionSelected,
  } = props;

  const onSelected = (selectedItem: string) => {
    onSuggestionSelected && onSuggestionSelected(`${selectedItem} `);
    textInput.current?.focus();
  };

  const window = useWindowDimensions();

  return (
    <View style={[props.style, styles.container]}>
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

      {suggestion.length !== 0 ? (
        <FlatList
          style={[{width: window.width - 20}, styles.suggestionList]}
          data={suggestion}
          keyExtractor={(item, index) => `${index}`}
          renderItem={({item, index}) => {
            const values = highlightWord.length
              ? item.split(highlightWord)
              : [item];

            var texts = [];

            if (item.indexOf(highlightWord) === 0) {
              texts.push(
                <Text key={0} style={styles.highlightWord}>
                  {highlightWord}
                </Text>,
              );
            }

            values.forEach((value, valueIndex) => {
              console.log('Log: ', item, values, highlightWord);
              if (values.length === 1 && values[0] === highlightWord) {
                return;
              }
              texts.push(<Text key={texts.length}>{value}</Text>);
              if (values.length > 1 && valueIndex < values.length - 1) {
                texts.push(
                  <Text key={texts.length} style={styles.highlightWord}>
                    {highlightWord}
                  </Text>,
                );
              }
            });

            // if (values.length === 2) {
            //   texts.push(
            //     <Text key={0}>{values[0]}</Text>,
            //     <Text key={1} style={styles.highlightWord}>
            //       {highlightWord}
            //     </Text>,
            //     <Text key={2}>{values[1]}</Text>,
            //   );
            // } else {
            //   texts.push(
            //     <Text key={0}>{values[0]}</Text>,
            //     <Text key={1} style={styles.highlightWord}>
            //       {highlightWord}
            //     </Text>,
            //   );
            // }

            return (
              <TouchableOpacity onPress={() => onSelected(item)}>
                <Text style={styles.itemText}>{texts}</Text>
              </TouchableOpacity>
            );
          }}
        />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    zIndex: 1,
  },
  textInput: {
    backgroundColor: 'white',
    borderColor: 'gray',
    borderRadius: 10,
    borderWidth: 0.5,
    height: 40,
    margin: 10,
    paddingHorizontal: 10,
  },
  textInputFocused: {
    borderColor: 'blue',
  },
  suggestionList: {
    backgroundColor: 'white',
    borderColor: 'gray',
    borderRadius: 10,
    borderWidth: 0.5,
    left: 10,
    position: 'absolute',
    top: 50,
  },
  itemText: {
    borderColor: 'gray',
    padding: 10,
  },
  highlightWord: {
    backgroundColor: 'yellow',
  },
});

export {AutocompleteInput};
