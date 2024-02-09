//Alli Linhart 2024
//imports from react libraries
import { GestureHandler, GestureHandlerRootView} from "react-native-gesture-handler";
import { StyleSheet, Text, View, Image } from 'react-native';
import { useState} from 'react';

//imports from components folder
import Button from './components/Button'
import CircleButton from './components/CircleButton';
import EmojiList from './components/EmojiList';
import EmojiPicker from './components/EmojiPicker';
import EmojiSticker from './components/EmojiSticker';
import IconButton from './components/IconButton';
import ImageViewer from './components/ImageViewer';

import * as ImagePicker from 'expo-image-picker';
import { StatusBar } from 'expo-status-bar';



const BackgroundImage = require ('./assets/images/background-image.png')

export default function App() {
  const [pickdEmoji, setPickedEmoji]= useState(null);
  const [selectedImage, setSelectedImage]= useState(null);
  const [isModalVisible, setIsModalVisible]= useState(false);
  const [showAppOptions, setShowAppOptions]= useState(false);
  
  const onReset = () => {
    setShowAppOptions(false);
  };

  const onAddSticker = () => {
    setIsModalVisible(true);
  };

  const onModalClose = () =>{
    setIsModalVisible(false);
  };

  const onSaveImageAsync = async () => {
  };

  const pickImageAsync = async ()=> {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled){
      setSelectedImage(result.assets[0].uri);
      setShowAppOptions(true);
    } else{
      alert ('You did not select an image.');
    }
  }
  
//turn circle button into a choose photo button instead of emoji sticker button
//use click and drag to move the photo around the page. Collage-ify the

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style= {styles.imageContainer}>
        <ImageViewer backgroundImageSource={BackgroundImage} selectedImage={selectedImage} />
        {pickdEmoji && <EmojiSticker imageSize={40} stickerSource={pickdEmoji} />}
        </View>
        {showAppOptions ? (
          <View style={styles.optionsContainer}>
            <View style={styles.optionsRow}>
              <IconButton icon="refresh" label="Reset" onPress={onReset} />
              <CircleButton onPress={onAddSticker} />
              <IconButton icon="save-alt" label="Save" onPress={onSaveImageAsync} />
            </View>
        </View>
        ) : (
      <View style={styles.footerContainer}>
        <Button theme ="primary" label ="Choose a photo" onPress= {pickImageAsync}/>
        <Button label ="Use this photo" onPress={()=> setShowAppOptions(true)}/>
      </View>
      )}
      <EmojiPicker isVisible={isModalVisible} onClose={onModalClose}>
          <EmojiList onSelect={setPickedEmoji} onCloseModal={onModalClose} />
        </EmojiPicker>
      <StatusBar style="auto" />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  footerContainer: {
    flex: 1 / 3,
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer:{
    flex: 1,
    paddingTop: 60,
  },
  optionsContainer: {
    position: 'absolute',
    bottom: 80,
  },
  optionsRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
});
