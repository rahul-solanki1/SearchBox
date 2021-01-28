import React from 'react';
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

interface Props {
  value?: string;
  onValueChange?: (value: string) => void;
  onKeyPress?: (value: string) => void;
  suggestion?: Array<string>;
}

interface SuggestionListProps {
  style?: StyleProp<ViewStyle>;
  dataList?: Array<String>;
}

const SuggestionList: React.FC<SuggestionListProps> = (props) => {
  const window = useWindowDimensions();
  return (
    <FlatList
      style={[{width: window.width - 20}, props.style]}
      data={props.dataList}
      keyExtractor={(item, index) => `${index}`}
      renderItem={({item}) => <Text style={styles.itemText}>{item}</Text>}
    />
  );
};

const AutocompleteInput: React.FC<Props> = (props) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        onChangeText={props.onValueChange}
        value={props.value}
        onFocus={() => console.log('Focused')}
        onKeyPress={(e) =>
          props.onKeyPress && props.onKeyPress(e.nativeEvent.key)
        }
      />
      {props.suggestion?.length ? (
        <SuggestionList
          style={styles.suggestionList}
          dataList={props.suggestion}
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
    borderWidth: 1,
    height: 40,
    margin: 10,
    paddingHorizontal: 10,
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
    borderWidth: 0.5,
    padding: 10,
  },
});

export {AutocompleteInput};
