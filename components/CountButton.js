import { View, Pressable, StyleSheet } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function CountButton({ onPress }) {
  return (
    <View style={styles.countButtonContainer}>
      <Pressable style={styles.counteButton} onPress={onPress}>
        <MaterialIcons name="add" size={38} color="#e7b5ac" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  countButtonContainer: {
    width: 100,
    height: 80,
    marginHorizontal: 40,
    padding: 3,
  },
  countButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 42,
    backgroundColor: '#fff',
  },
});