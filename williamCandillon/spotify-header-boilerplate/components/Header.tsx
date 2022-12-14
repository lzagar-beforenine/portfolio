import * as React from "react";
import { StyleSheet } from "react-native";
import Constants from "expo-constants";
import Animated from "react-native-reanimated";
import { MIN_HEADER_HEIGHT, HEADER_DELTA } from "./Model";
import { BUTTON_HEIGHT } from "./ShufflePlay";

interface HeaderProps {
  artist: string;
  y: Animated.Value<number>;
}

export default ({ artist, y }: HeaderProps) => {
  const opacity = Animated.interpolate(y, {
    inputRange: [HEADER_DELTA + 40, HEADER_DELTA + 40],
    outputRange: [0, 1],
    extrapolate: Animated.Extrapolate.CLAMP,
  });
  const textOpacity = Animated.interpolate(y, {
    inputRange: [HEADER_DELTA - 8, HEADER_DELTA - 4],
    outputRange: [0, 1],
    extrapolate: Animated.Extrapolate.CLAMP,
  });
  return (
    <Animated.View style={[styles.container, { opacity }]}>
      <Animated.Text style={[styles.title, { opacity: textOpacity }]}>
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
    height: MIN_HEADER_HEIGHT + 42,
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
