import { StyleSheet, FlatList, Image, Platform, Pressable} from 'react-native';


//this is the image that gets picked
export default function ImageViewer({ backgroundImageSource, selectedImage }) {
  const imageSource= selectedImage ? {uri: selectedImage} : backgroundImageSource;
    return (
    <Image source={imageSource} style={styles.image} />
    
    );
}

const styles = StyleSheet.create({
  image: {
    width: 300,
    height: 500,
    borderWidth: 4,    
    borderColor: "#fde9ea",
    borderRadius: 18,

  },
});