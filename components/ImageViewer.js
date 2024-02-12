//Alli Linhart 2024

import { StyleSheet, Image} from 'react-native';

//this is the image that gets picked
export default function ImageViewer({ backgroundImageSource, selectedImage }) {
  const imageSource= selectedImage ? {uri: selectedImage} : backgroundImageSource;
    return (
    <Image source={imageSource} style={styles.image} />
    
    );
}

//WANTS:
//I want the app to scale the photos to fit either 300 x 500 vertical photos
//or 500 x 300 landscaped photos

const styles = StyleSheet.create({
  image: {
    width: 300,
    height: 500,
    borderWidth: 4,    
    borderColor: "#fde9ea",
    borderRadius: 18,

  },
});