import React, { useState } from "react";
import { StyleSheet, Dimensions, View } from "react-native";
import Animated, {
  Transitioning,
  Transition,
  TransitioningView,
  Easing,
} from "react-native-reanimated";

import Tab from "./Tab";
import { TabsModel, OVERVIEW } from "./Model";
import {
  bInterpolate,
  decay,
  onGestureEvent,
  useTransition,
} from "react-native-redash";
import { PanGestureHandler, State } from "react-native-gesture-handler";

const { eq, neq, diffClamp } = Animated;

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

  const transitionValue = useTransition(
    selectedTab,
    neq(selectedTab, OVERVIEW),
    eq(selectedTab, OVERVIEW),
    durationMs,
    easing
  );

  const { translateY, gestureHandler } = React.useMemo(() => {
    const translationY = new Animated.Value(0);
    const velocityY = new Animated.Value(0);
    const state = new Animated.Value(State.UNDETERMINED);
    const translateY1 = diffClamp(
      decay(translationY, state, velocityY),
      -tabsProps.length * 150,
      0
    );
    return {
      translateY: bInterpolate(transitionValue, 0, translateY1),
      gestureHandler: onGestureEvent({
        state,
        translationY,
        velocityY,
      }),
    };
  }, [tabsProps.length, transitionValue]);

  return (
    <PanGestureHandler {...gestureHandler}>
      <Animated.View
        style={{
          backgroundColor: "black",
          height: tabsProps.length * height,
          transform: [{ translateY }],
        }}
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
