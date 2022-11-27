import React from "react";
import { StyleSheet } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";
import Card, { Card as CardModel, CARD_HEIGHT } from "./Card";

interface Props {
  index: number;
  card: CardModel;
  cardsLength: number;
  step: number;
  selectedIndex: number;
  cardsRef: React.MutableRefObject<Array<number>>;
}

function AnimatedCard({
  card,
  cardsLength,
  index,
  step,
  selectedIndex,
  cardsRef,
}: Props) {
  const translateYAnimated = useSharedValue(0);
  const rotationAnimated = useSharedValue(0);
  const zIndexAnimated = useSharedValue(0);

  React.useEffect(() => {
    if (selectedIndex === -1) {
      translateYAnimated.value = withDelay(
        300,
        withTiming(-CARD_HEIGHT / 3 + (CARD_HEIGHT / 3) * index)
      );
      rotationAnimated.value = withDelay(300, withTiming(-15 + index * step));
    } else {
      if (selectedIndex === index) {
        zIndexAnimated.value = withTiming(cardsRef.current[index], {
          duration: 200,
        });
        translateYAnimated.value = withTiming(
          -CARD_HEIGHT * 1.5,
          { duration: 200 },
          (finished) => {
            if (finished) {
              translateYAnimated.value = withTiming(0, { duration: 200 });
            }
          }
        );
        rotationAnimated.value = withTiming(
          45,
          {
            duration: 200,
          },
          (finished) => {
            if (finished)
              rotationAnimated.value = withTiming(0, { duration: 200 });
          }
        );
      } else {
        translateYAnimated.value = withTiming(0);

        rotationAnimated.value = withTiming(
          (15 / 2) *
            (cardsRef.current
              .map((_, i) => i)
              .filter((_, i) => i !== selectedIndex)
              .findIndex((i) => i === index) %
              2 ===
            0
              ? -1
              : 1)
        );
      }
    }
  }, [selectedIndex]);

  const style = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotateZ: `${rotationAnimated.value}deg`,
        },
        { translateY: translateYAnimated.value },
      ],
      elevation: zIndexAnimated.value,
      zIndex: zIndexAnimated.value,
    };
  });

  return (
    <Animated.View
      key={card.id}
      style={[
        {
          ...StyleSheet.absoluteFillObject,
        },
        style,
        ,
      ]}
    >
      <Card key={card.id} {...{ card }} />
    </Animated.View>
  );
}

export default AnimatedCard;
