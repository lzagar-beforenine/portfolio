import * as React from "react";
import { Image, StyleSheet, View } from "react-native";
import Animated, {
  Extrapolate,
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import { Album, HEADER_DELTA, MAX_HEADER_HEIGHT } from "./Model";

interface CoverProps {
  album: Album;
  animatedValue: SharedValue<number>;
}

export default ({ album: { cover }, animatedValue }: CoverProps) => {
  const containerAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: interpolate(
            animatedValue.value,
            [-MAX_HEADER_HEIGHT, 0],
            [4, 1],
            Extrapolate.CLAMP
          ),
        },
      ],
    };
  });

  const viewAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        animatedValue.value,
        [-64, 0, HEADER_DELTA],
        [0, 0.2, 1],
        Extrapolate.CLAMP
      ),
    };
  });

  return (
    <Animated.View style={[styles.container, containerAnimatedStyle]}>
      <Image style={styles.image} source={cover} />
      <Animated.View
        style={[
          {
            ...StyleSheet.absoluteFillObject,
            backgroundColor: "black",
          },
          viewAnimatedStyle,
        ]}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: MAX_HEADER_HEIGHT,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    width: undefined,
    height: undefined,
  },
});
