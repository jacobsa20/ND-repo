//Alli Linhart 2024

import Animated, { useAnimatedStyle, useSharedValue, withSpring} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';

export default function EmojiSticker({ imageSize, stickerSource }) {

  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const scaleImage = useSharedValue(imageSize);

  const drag= Gesture.Pan()
    .onChange((event)=>{
      translateX.value += event.changeX;
      translateY.value += event.changeY;
    });

    const containerStyle = useAnimatedStyle(()=> {
      return {
        transform: [
          {
            translateX: translateX.value,
          },
          {
            translateY: translateY.value,
          },
        ],
      };
    });

  const doubleTap = Gesture.Tap()
  .numberOfTaps(2)
  .onStart(() => {
    if (scaleImage.value !== imageSize * 2) {
      scaleImage.value = scaleImage.value * 2;
    }
  });

  const imageStyle = useAnimatedStyle(() => {
    return {
      width: withSpring(scaleImage.value),
      height: withSpring(scaleImage.value),
    };
  });

  //returns emoji to a location near the center of the photo
  // so it doesn't print offscreen
  return (
    <GestureDetector gesture={drag}>
    <Animated.View style={[containerStyle, { 
      top: -225, 
      right: -150 
      }]}>
      <GestureDetector gesture={doubleTap}>
      <Animated.Image
        source={stickerSource}
        resizeMode="contain"
        style={[imageStyle,{ 
          width: imageSize, 
          height: imageSize 
          }]}/>
      </GestureDetector>
    </Animated.View>
    </GestureDetector>
    
  );
}