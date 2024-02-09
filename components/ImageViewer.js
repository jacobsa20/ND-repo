import Animated, { useAnimatedStyle, useSharedValue, withSpring} from 'react-native-reanimated';
import { StyleSheet, Image } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';

export default function ImageViewer({ backgroundImageSource, selectedImage }) {
  
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  
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

  const imageSource= selectedImage ? {uri: selectedImage} : backgroundImageSource;
    return (
      <Animated.View style ={[containerStyle, { top: -10}]}>
      <GestureDetector gesture={drag}>
    <Animated.Image 
    source={imageSource}
    resizeMode= "contain" 
    style={{ width: backgroundImageSource, height: backgroundImageSource}} />
    </GestureDetector>
    </Animated.View>
    );
}

const styles = StyleSheet.create({
  image: {
    width: 500,
    height: 500,
    borderRadius: 18,
  },
});