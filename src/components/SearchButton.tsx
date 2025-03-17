import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface SearchButtonProps {
  onPress: () => void;
}

const SearchButton: React.FC<SearchButtonProps> = ({ onPress }) => {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={onPress}
    >
      <Icon name="search" size={22} color="#FFFFFF" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#333333',
  },
});

export default SearchButton;
