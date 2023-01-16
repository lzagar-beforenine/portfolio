import * as React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, {
  interpolate,
  SharedValue,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
} from "react-native-reanimated";
import { parsePath, ReanimatedPath } from "react-native-redash";

const TOUCH_SIZE = 200;
const { width } = Dimensions.get("window");
const white = "white";

interface CursorProps {
  d: string;
  r: number;
  borderWidth: number;
  borderColor: string;
}

export const find = (array: number[], index: number) => {
  "worklet";
  return array.find((p) => p === index) || -1;
};

export const cubicBezier = (
  t: number,
  p0: number,
  p1: number,
  p2: number,
  p3: number
): number => {
  "worklet";
  const term = 1 - t;
  const a = 1 * Math.pow(term, 3) * Math.pow(t, 0) * p0;
  const b = 3 * Math.pow(term, 2) * Math.pow(t, 1) * p1;
  const c = 3 * Math.pow(term, 1) * Math.pow(t, 2) * p2;
  const d = 1 * Math.pow(term, 0) * Math.pow(t, 3) * p3;
  return a + b + c + d;
};

export const getPointAtLength = (path: ReanimatedPath, length: number) => {
  "worklet";
  let index = path.segments.findIndex(
    (p, i) => length >= p.start && length <= p.end
  );
  if (index === -1) index = 0;
  const start = path.start[index];
  const end = path.end[index];

  const p0x = path.p0x[index];
  const p1x = path.p1x[index];
  const p2x = path.p2x[index];
  const p3x = path.p3x[index];

  const p0y = path.p0y[index];
  const p1y = path.p1y[index];
  const p2y = path.p2y[index];
  const p3y = path.p3y[index];

  const t = interpolate(length, [start, end], [0, 1]);
  const res = {
    y: cubicBezier(t, p0y, p1y, p2y, p3y),
    x: cubicBezier(t, p0x, p1x, p2x, p3x),
  };

  return res;
};

export default ({ d, r, borderWidth, borderColor }: CursorProps) => {
  const radius = r + borderWidth / 2;
  const translationX = useSharedValue(0);
  const path = useSharedValue(parsePath(d));

  // const velocityX = useSharedValue(0);
  // const state = useSharedValue(State.UNDETERMINED);

  const eventHandler = useAnimatedGestureHandler({
    onStart: (_, ctx: { startX: number }) => {
      ctx.startX = translationX.value;
    },

    onActive: (event, ctx) => {
      translationX.value = ctx.startX + event.translationX;
    },
  });

  const animatedStyle = useAnimatedStyle(() => {
    const length = interpolate(
      translationX.value,
      [0, width],
      [0, path.value.totalLength]
    );

    const { x, y } = getPointAtLength(path.value, length);
    return {
      transform: [
        { translateX: x - TOUCH_SIZE / 2 },
        { translateY: y - TOUCH_SIZE / 2 },
      ],
    };
  });

  return (
    <View style={StyleSheet.absoluteFill}>
      <PanGestureHandler onGestureEvent={eventHandler}>
        <Animated.View
          style={[
            animatedStyle,
            {
              width: TOUCH_SIZE,
              height: TOUCH_SIZE,
              justifyContent: "center",
              alignItems: "center",
            },
          ]}
        >
          <View
            style={{
              width: radius * 2,
              height: radius * 2,
              borderRadius: radius,
              borderColor,
              borderWidth,
              backgroundColor: white,
            }}
          />
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
};
