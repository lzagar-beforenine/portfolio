import React from "react";
import {
  Dimensions,
  StyleSheet,
  TouchableWithoutFeedback,
  Platform,
  View,
} from "react-native";
import Animated, {
  interpolate,
  SharedValue,
  sin,
  useAnimatedStyle,
} from "react-native-reanimated";

import Content from "./Content";
import { TabModel, OVERVIEW } from "./Model";

const perspective = 1000;
const { height } = Dimensions.get("window");

interface TabProps {
  tab: TabModel;
  selectedTab: number;
  index: number;
  transition: SharedValue<number>;
  closeTab: () => void;
  selectTab: () => void;
}

export default ({
  tab,
  selectedTab,
  index,
  transition,
  selectTab: onPress,
  closeTab,
}: TabProps) => {
  const H = -height / 2;
  const position = index > selectedTab ? height : 0;
  const top = selectedTab === OVERVIEW ? index * 150 : position;

  const animatedStyles = useAnimatedStyle(() => {
    const rotateX = interpolate(transition.value, [0, 1], [0, -Math.PI / 6]);
    const z = H * Math.sin(Math.abs(rotateX));
    const scale = perspective / (perspective - z);
    return {
      transform: [{ perspective }, { rotateX: `${rotateX}rad` }, { scale }],
    };
  });

  return (
    <TouchableWithoutFeedback {...{ onPress }}>
      <Animated.View
        style={[
          animatedStyles,
          {
            ...StyleSheet.absoluteFillObject,
            height,
            top,
          },
        ]}
      >
        <Content {...{ closeTab, tab, selectedTab }} />
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};
