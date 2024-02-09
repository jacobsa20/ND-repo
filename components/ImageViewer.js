import { StyleSheet, Image } from 'react-native';

export default function ImageViewer({ backgroundImageSource, selectedImage }) {
  const imageSource= selectedImage ? {uri: selectedImage} : backgroundImageSource;
    return <Image source={imageSource} style={styles.image} />;
}

const styles = StyleSheet.create({
  image: {
    width: 500,
    height: 500,
    borderRadius: 18,
  },
});