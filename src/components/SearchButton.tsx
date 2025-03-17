import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  StyleProp,
  ViewStyle,
  Text,
} from 'react-native';

interface SearchButtonProps {
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
}

const SearchButton: React.FC<SearchButtonProps> = ({ onPress, style }) => {
  return (
    <TouchableOpacity
      style={[styles.button, style]}
      onPress={onPress}
    >
      <Text style={styles.icon}>🔍</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 8,
  },
  icon: {
    fontSize: 18,
    color: '#FFFFFF',
  },
});

export default SearchButton;
