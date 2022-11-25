import * as React from "react";
import { Image, StyleSheet } from "react-native";
import Animated from "react-native-reanimated";
import { Album, HEADER_DELTA, MAX_HEADER_HEIGHT } from "./Model";

interface CoverProps {
  album: Album;
  y: Animated.Value<number>;
}

export default ({ album: { cover }, y }: CoverProps) => {
  const scale: any = Animated.interpolate(y, {
    inputRange: [-MAX_HEADER_HEIGHT, 0],
    outputRange: [4, 1],
    extrapolateRight: Animated.Extrapolate.CLAMP,
  });
  const opacity = Animated.interpolate(y, {
    inputRange: [-64, 0, HEADER_DELTA],
    outputRange: [0, 0.2, 1],
    extrapolateRight: Animated.Extrapolate.CLAMP,
  });
  return (
    <Animated.View style={[styles.container, { transform: [{ scale }] }]}>
      <Image style={styles.image} source={cover} />
      <Animated.View
        style={{
          ...StyleSheet.absoluteFillObject,
          backgroundColor: "black",
          opacity,
        }}
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
