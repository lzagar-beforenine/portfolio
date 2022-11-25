import * as React from "react";
import { View, StyleSheet } from "react-native";

import {
  Album,
  MIN_HEADER_HEIGHT,
  HEADER_DELTA,
  MAX_HEADER_HEIGHT,
} from "./Model";
import Header from "./Header";
import Content from "./Content";
import Cover from "./Cover";
import ShufflePlay, { BUTTON_HEIGHT } from "./ShufflePlay";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

interface AlbumProps {
  album: Album;
}

export default ({ album }: AlbumProps) => {
  const { artist } = album;
  const animatedValue = useSharedValue(0);

  const shufflePlayAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: Math.min(animatedValue.value, HEADER_DELTA) * -1,
        },
      ],
    };
  });

  return (
    <View style={styles.container}>
      <Cover {...{ animatedValue, album }} />
      <Content {...{ animatedValue, album }} />
      <Header {...{ animatedValue, artist }} />
      <Animated.View
        style={[
          {
            position: "absolute",
            top: MAX_HEADER_HEIGHT - BUTTON_HEIGHT / 2,
            left: 0,
            right: 0,
          },
          shufflePlayAnimatedStyle,
        ]}
      >
        <ShufflePlay />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
});
