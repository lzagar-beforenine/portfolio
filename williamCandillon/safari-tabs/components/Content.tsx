import React, { useMemo, useRef } from "react";
import { StyleSheet, View, Dimensions, WebView, Text } from "react-native";
import Constants from "expo-constants";
import { TabModel, OVERVIEW } from "./Model";
import Animated from "react-native-reanimated";
import { PanGestureHandler, State } from "react-native-gesture-handler";
import {
  approximates,
  onGestureEvent,
  snapPoint,
  spring,
} from "react-native-redash";

const { width } = Dimensions.get("window");
const EXTREMITY = width * 1.2;
const snapPoints = [-EXTREMITY, 0, EXTREMITY];
const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 25,
    overflow: "hidden",
  },
  title: {
    fontWeight: "bold",
    fontSize: 12,
    textAlign: "center",
    alignSelf: "center",
  },
  webView: { flex: 1 },
});

interface ContentProps {
  tab: TabModel;
  closeTab: () => void;
  selectedTab: number;
}

export default ({
  tab: { uri, id: title },
  selectedTab,
  closeTab,
}: ContentProps) => {
  const offset = selectedTab === OVERVIEW ? 0 : Constants.statusBarHeight;

  const { gestureHandler, translateX } = React.useMemo(() => {
    const translationX = new Animated.Value(0);
    const velocityX = new Animated.Value(0);
    const state = new Animated.Value(State.UNDETERMINED);
    return {
      translateX: spring(
        translationX,
        state,
        snapPoint(translationX, velocityX, snapPoints)
      ),
      gestureHandler: onGestureEvent({
        translationX,
        velocityX,
        state,
      }),
    };
  }, []);

  Animated.useCode(
    Animated.cond(
      approximates(Animated.abs(translateX), EXTREMITY, 10),
      Animated.call([], closeTab)
    ),
    [closeTab, translateX]
  );

  return (
    <PanGestureHandler activeOffsetX={[-10, 10]} {...gestureHandler}>
      <Animated.View
        style={[styles.container, { transform: [{ translateX }] }]}
      >
        <View
          style={{
            paddingTop: offset,
            height: 32 + offset,
            backgroundColor: "#fefefe",
            justifyContent: "center",
          }}
        >
          <Text style={styles.title}>{title}</Text>
        </View>
        <View style={styles.webView}>
          <WebView source={{ uri }} style={styles.webView} />
          <View style={StyleSheet.absoluteFill} />
        </View>
      </Animated.View>
    </PanGestureHandler>
  );
};
