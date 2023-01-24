import React, { useState } from "react";
import { StyleSheet, Dimensions } from "react-native";
import Animated, {
  Transitioning,
  Transition,
  TransitioningView,
  Easing,
  useAnimatedGestureHandler,
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  interpolate,
  Extrapolation,
} from "react-native-reanimated";

import Tab from "./Tab";
import { TabsModel, OVERVIEW } from "./Model";

import { PanGestureHandler } from "react-native-gesture-handler";

const { height } = Dimensions.get("window");
const durationMs = 400;
const easing = Easing.inOut(Easing.ease);
const transition = (
  <Transition.Change durationMs={durationMs} interpolation="easeInOut" />
);

interface TabsProps {
  tabs: TabsModel;
}

export default ({ tabs: tabsProps }: TabsProps) => {
  const ref = React.useRef<TransitioningView>(null);
  const [tabs, setTabs] = useState([...tabsProps]);
  const [selectedTab, setSelectedTab] = useState(OVERVIEW);

  const translateY = useSharedValue(0);
  const transitionValue = useSharedValue(0);

  React.useEffect(() => {
    transitionValue.value = withTiming(Number(selectedTab === OVERVIEW), {
      duration: durationMs,
      easing,
    });
    translateY.value = withTiming(Number(selectedTab === OVERVIEW), {
      duration: durationMs,
      easing,
    });
  }, [selectedTab]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  // const { translateY } = React.useMemo(() => {
  //   const translationY = new Animated.Value(0);
  //   const velocityY = new Animated.Value(0);
  //   const state = new Animated.Value(State.UNDETERMINED);
  //   const translateY1 = diffClamp(
  //     decay(translationY, state, velocityY),
  //     -tabsProps.length * 150,
  //     0
  //   );
  //   return {
  //     translateY: bInterpolate(transitionValue, 0, translateY1),
  //   };
  // }, [tabsProps.length, transitionValue]);

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx: { startY: number }) => {
      ctx.startY = translateY.value;
    },

    onActive: (event, ctx) => {
      if (
        ctx.startY + event.translationY <= 0 &&
        ctx.startY + event.translationY > -tabsProps.length * 150
      )
        translateY.value = ctx.startY + event.translationY;
    },
  });
  return (
    <PanGestureHandler onGestureEvent={gestureHandler}>
      <Animated.View
        style={[
          {
            backgroundColor: "black",
            height: tabsProps.length * height,
          },
          animatedStyle,
        ]}
      >
        <Transitioning.View
          style={StyleSheet.absoluteFill}
          {...{ transition, ref }}
        >
          {tabs.map((tab, index) => (
            <Tab
              transition={transitionValue}
              key={tab.id}
              closeTab={() => {
                if (ref.current) {
                  ref.current.animateNextTransition();
                }
                setTabs((prev) => [
                  ...prev.slice(0, index),
                  ...prev.slice(index + 1),
                ]);
              }}
              selectTab={() => {
                if (ref.current) {
                  ref.current.animateNextTransition();
                }

                setSelectedTab(selectedTab === index ? OVERVIEW : index);
              }}
              {...{ tab, selectedTab, index }}
            />
          ))}
        </Transitioning.View>
      </Animated.View>
    </PanGestureHandler>
  );
};
