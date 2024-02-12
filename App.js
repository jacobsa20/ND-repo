//Alli Linhart 2024

//imports from react libraries
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StyleSheet, Text, View, Platform, useWindowDimensions } from 'react-native';
import { useState, useRef, useEffect } from 'react';

//imports from components folder
import Button from './components/Button'
import CircleButton from './components/CircleButton';
import EmojiList from './components/EmojiList';
import EmojiPicker from './components/EmojiPicker';
import EmojiSticker from './components/EmojiSticker';
import IconButton from './components/IconButton';
import ImageViewer from './components/ImageViewer';

import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import { captureRef} from 'react-native-view-shot';
import { StatusBar } from 'expo-status-bar';
import DomToImage from "dom-to-image";


const BackgroundImage = require ('./assets/images/background-image.png')
//object function
export default function App() {
  //components
  const [status, requestPermission]= MediaLibrary.usePermissions();
  const [pickdEmoji, setPickedEmoji]= useState(null);
  const [selectedImage, setSelectedImage]= useState(null);
  const [isModalVisible, setIsModalVisible]= useState(false);
  const [showAppOptions, setShowAppOptions]= useState(false);

  //modal->content presented above the app
  const [count, setCount] = useState(0);

  //WANTS:
  //trying to adjust for screen size
  //this is where my work would have continued
  const {height, width} = useWindowDimensions();

  const imageRef = useRef();

  //useEffect counts how long you have been in the app, sometimes the
  //"timer" lags, I've notived whenever a pop-up shows up the timer lags
  //for a bit, and then falls behind.
  useEffect(() => {
    const interval = this.setTimeout(() => {
      setCount(count +1);
    }, 1000);
    return () => {
      clearInterval(this.interval);
    }
  });


  const onReset = () => {
    setShowAppOptions(false);
  };

  const onAddSticker = () => {
    setIsModalVisible(true);
  };

  const onModalClose = () =>{
    setIsModalVisible(false);
  };

//saves image on the web and android
  const onSaveImageAsync = async () => {
    if (Platform.OS !== 'web'){
    try{
      const localUri = await captureRef(imageRef, {
        height: 500,
        quality: 1,
      });

      await MediaLibrary.saveToLibraryAsync(localUri);
      if (localUri){
        alert("Save Complete");
      }
    } catch (e){
      console.log(e);
    }
  } else {
    try{
      const dataUrl = await DomToImage.toJpeg(imageRef.current, {
        quality: 1,
        width: 300,
        height: 500,
      });
      let link = document.createElement('a');
      link.download = 'photoshop.jpeg';
      link.href = dataUrl;
      link.click();
    } catch (e){
      console.log(e);
    }
  }
  };

  const pickImageAsync = async ()=> {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if(status=== null){
      requestPermission();
    }

    if (!result.canceled){

      setSelectedImage(result.assets[0].uri);
      setShowAppOptions(true);
    } else{
      alert ('You did not select an image.');
    }
  }
  
//WANTS:
//turn circle button into a choose photo button instead of emoji sticker button
//use click and drag to move the photo around the page. Collage-ify the

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style= {styles.imageContainer}>
      <View ref= {imageRef} collapsable= {false}>
        <ImageViewer backgroundImageSource={BackgroundImage} selectedImage={selectedImage}/>
        {pickdEmoji && <EmojiSticker imageSize={40} stickerSource={pickdEmoji} />}
        </View>
        </View>
        {showAppOptions ? (
          <View style={styles.optionsContainer}>
            <View style={styles.optionsRow}>
              <CircleButton onPress={onAddSticker} />
              <IconButton icon="refresh" label="Reset" onPress={onReset}/>
              <IconButton icon="save-alt" label="Save" onPress={onSaveImageAsync} />
              {/*<IconButton icon= "plus-one" label= "Count" onPress={count}/>
              Decided to remove a clickable button and made the use effect more
              of */}
            </View>
            <View style ={styles.counter}>
            <Text> Count: {count} </Text>
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
      <StatusBar style="light" />
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
    backgroundColor: '#172311',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer:{
    flex: 1,
    paddingTop: 40,
  },
  optionsContainer: {
    position: 'absolute',
    bottom: 80,
  },
  optionsRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  counter: {
    alignItems: 'center',
    backgroundColor: '#ff69b4',
    borderRadius: 42,
    padding: 3,
  }
});
