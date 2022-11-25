import * as React from "react";
import { Text, StyleSheet, View } from "react-native";
import Constants from "expo-constants";
import { MIN_HEADER_HEIGHT, HEADER_DELTA } from "./Model";
import Animated, {
  Extrapolate,
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";

interface HeaderProps {
  artist: string;
  animatedValue: SharedValue<number>;
}

export default ({ artist, animatedValue }: HeaderProps) => {
  const containerAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        animatedValue.value,
        [HEADER_DELTA - 16, HEADER_DELTA],
        [0, 1],
        Extrapolate.CLAMP
      ),
    };
  });

  const textAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        animatedValue.value,
        [HEADER_DELTA - 8, HEADER_DELTA - 4],
        [0, 1],
        Extrapolate.CLAMP
      ),
    };
  });
  return (
    <Animated.View style={[styles.container, containerAnimatedStyle]}>
      <Animated.Text style={[styles.title, textAnimatedStyle]}>
        {artist}
      </Animated.Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: MIN_HEADER_HEIGHT,
    backgroundColor: "black",
    paddingTop: Constants.statusBarHeight,
  },
  title: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "400",
  },
});
