//import Animated, { useAnimatedStyle, useSharedValue, withSpring} from 'react-native-reanimated';
//import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { View, Image } from 'react-native';

//const scaleImage = useSharedValue( imageSize);

// const doubleTap = Gesture.Tap()
//   .numberOfTaps(2)
//   .onStart(() => {
//     if (scaleImage.value !== imageSize * 2) {
//       scaleImage.value = scaleImage.value * 2;
//     }
//   });

export default function EmojiSticker({ imageSize, stickerSource }) {
  return (
    //<GestureDetector gesture={doubleTap}>
    <View style={{ top: -350 }}>
    <Image
        source={stickerSource}
        resizeMode="contain"
        style={{ width: imageSize, height: imageSize }}
      />
      
      {/* <Animated.Image
        source={stickerSource}
        resizeMode="contain"
        style={{ width: imageSize, height: imageSize }}
      /> */}
    </View>
    //</GestureDetector>
  );
}