import * as React from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import { Album, MAX_HEADER_HEIGHT, HEADER_DELTA } from "./Model";
import Track from "./Track";
import Animated, {
  Extrapolate,
  interpolate,
  SharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
} from "react-native-reanimated";

interface ContentProps {
  album: Album;
  animatedValue: SharedValue<number>;
}

export default ({ album: { artist, tracks }, animatedValue }: ContentProps) => {
  const linearGradientAnimatedStyle = useAnimatedStyle(() => {
    return {
      height: interpolate(
        animatedValue.value,
        [-MAX_HEADER_HEIGHT, 0],
        [0, MAX_HEADER_HEIGHT],
        Extrapolate.CLAMP
      ),
    };
  });

  const textGradientAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        animatedValue.value,
        [-MAX_HEADER_HEIGHT / 2, 0, MAX_HEADER_HEIGHT / 2],
        [0, 1, 0],
        Extrapolate.CLAMP
      ),
    };
  });

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      animatedValue.value = event.contentOffset.y;
    },
  });

  return (
    <Animated.ScrollView
      onScroll={scrollHandler}
      style={styles.container}
      showsVerticalScrollIndicator={false}
      scrollEventThrottle={1}
    >
      <View style={styles.header}>
        <Animated.View style={[styles.gradient, linearGradientAnimatedStyle]}>
          <LinearGradient
            style={StyleSheet.absoluteFill}
            start={[0, 0.3]}
            end={[0, 1]}
            colors={["transparent", "rgba(0, 0, 0, 0.2)", "black"]}
          />
        </Animated.View>
        <View style={styles.artistContainer}>
          <Animated.Text style={[styles.artist, textGradientAnimatedStyle]}>
            {artist}
          </Animated.Text>
        </View>
      </View>
      <View style={styles.tracks}>
        {tracks.map((track, key) => (
          <Track index={key + 1} {...{ track, key, artist }} />
        ))}
      </View>
    </Animated.ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: MAX_HEADER_HEIGHT,
  },
  gradient: {
    position: "absolute",
    left: 0,
    bottom: 0,
    right: 0,
    alignItems: "center",
  },
  artistContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
  artist: {
    textAlign: "center",
    color: "white",
    fontSize: 48,
    fontWeight: "bold",
  },
  tracks: {
    paddingTop: 32,
    backgroundColor: "black",
  },
});
