//import Animated, { useAnimatedStyle, useSharedValue, withSpring} from 'react-native-reanimated';
//import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { View, Image } from 'react-native';

export default function EmojiSticker({ imageSize, stickerSource }) {
  return (
    
    <View style={{ top: -350 }}>
    <Image
        source={stickerSource}
        resizeMode="contain"
        style={{ width: imageSize, height: imageSize }}
      />
      {/* <GestureDetector gesture={doubleTap}>
      <Animated.Image
        source={stickerSource}
        resizeMode="contain"
        style={[imageStyle,{ width: imageSize, height: imageSize }]}
      />
      </GestureDetector> */}
    </View>
    
  );
}