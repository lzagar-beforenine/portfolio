import React from "react";
import { StyleSheet, View, TouchableWithoutFeedback } from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import Logo from "./components/Logo";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default function App() {
  const animation = useSharedValue(1);
  const state = React.useRef(false);

  const handleOnPress = React.useCallback(() => {
    animation.value = withTiming(Number(state.current), { duration: 4000 });
    state.current = !state.current;
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    const scale = interpolate(animation.value, [0, 1], [0.4, 1]);
    const rotate = interpolate(animation.value, [0, 1], [0, 360 * 5]);

    return { transform: [{ scale }, { rotate: `${rotate}deg` }] };
  });
  return (
    <TouchableWithoutFeedback onPress={handleOnPress}>
      <View style={styles.container}>
        <Animated.View style={animatedStyle}>
          <Logo />
        </Animated.View>
      </View>
    </TouchableWithoutFeedback>
  );
}
