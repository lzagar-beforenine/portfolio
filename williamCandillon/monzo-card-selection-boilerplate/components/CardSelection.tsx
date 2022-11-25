import React from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import Animated, {
  Easing,
  Transition,
  Transitioning,
  TransitioningView,
} from "react-native-reanimated";
import { bInterpolate, max, runTiming } from "react-native-redash";

import Card, { Card as CardModel, CARD_WIDTH, CARD_HEIGHT } from "./Card";
import CheckIcon from "./CheckIcon";
import Thumbnail from "./Thumbnail";

interface CardSelectionProps {
  cards: [CardModel, CardModel, CardModel];
}

const INITIAL_INDEX: number = -1;

export default ({ cards }: CardSelectionProps) => {
  const [selectedCardState, setSelectedCardState] = React.useState(
    INITIAL_INDEX
  );
  const containerRef = React.useRef<TransitioningView | null>(null);

  const {
    selectedCard,
    animation,
    cardRotations,
    cardTranslations,
    cardZIndexes,
    clock,
    isGroupingAnimationDone,
    shouldUpdateZIndex,
    translateX,
  } = React.useMemo(() => {
    const selectedCard = new Animated.Value(INITIAL_INDEX);
    const cardRotations = cards.map(() => new Animated.Value(0));
    const cardTranslations = cards.map(() => new Animated.Value(0));
    const cardZIndexes = cards.map(() => new Animated.Value(0));
    const isGroupingAnimationDone = new Animated.Value(0);
    const clock = new Animated.Clock();
    const animation = new Animated.Value(0);
    const translateX = new Animated.Value(CARD_WIDTH);
    const shouldUpdateZIndex = new Animated.Value(1);
    return {
      selectedCard,
      cardRotations,
      cardTranslations,
      cardZIndexes,
      isGroupingAnimationDone,
      animation,
      translateX,
      shouldUpdateZIndex,
      clock,
    };
  }, []);

  const timing = (animation: Animated.Value<number>, clock: Animated.Clock) =>
    Animated.set(
      animation,
      runTiming(clock, 0, { toValue: 1, duration: 400, easing: Easing.linear })
    );

  const selectCard = (index: number) => {
    containerRef.current?.animateNextTransition()
    selectedCard.setValue(index);
    setSelectedCardState(index);
  };

  Animated.useCode(
    Animated.block([
      Animated.cond(Animated.eq(selectedCard, INITIAL_INDEX), [
        timing(animation, clock),
        Animated.set(cardRotations[0], bInterpolate(animation, 0, -15)),
        Animated.set(cardRotations[2], bInterpolate(animation, 0, 15)),
      ]),
      Animated.cond(
        Animated.and(
          Animated.neq(selectedCard, INITIAL_INDEX),
          Animated.not(isGroupingAnimationDone)
        ),
        [
          timing(animation, clock),
          Animated.set(translateX, bInterpolate(animation, translateX, 0)),
          Animated.set(
            cardRotations[0],
            bInterpolate(animation, cardRotations[0], -15 / 2)
          ),
          Animated.set(
            cardRotations[1],
            bInterpolate(animation, cardRotations[1], 15 / 2)
          ),
          Animated.set(
            cardRotations[2],
            bInterpolate(animation, cardRotations[2], 0)
          ),
          Animated.cond(
            Animated.not(Animated.clockRunning(clock)),
            Animated.set(isGroupingAnimationDone, 1)
          ),
        ]
      ),
      ...cards.map((_, index) =>
        Animated.cond(
          Animated.and(
            Animated.eq(selectedCard, index),
            isGroupingAnimationDone
          ),
          [
            timing(animation, clock),
            ...cards
              .map((_, i) => i)
              .filter((_, i) => i !== index)
              .map((ai, i) =>
                Animated.set(
                  cardRotations[ai],
                  bInterpolate(
                    animation,
                    cardRotations[ai],
                    (15 / 2) * (i % 2 === 0 ? -1 : 1)
                  )
                )
              ),

            Animated.set(
              cardRotations[index],
              Animated.interpolate(animation, {
                inputRange: [0, 0.5, 1],
                outputRange: [0, 45, 0],
                extrapolate: Animated.Extrapolate.CLAMP,
              })
            ),
            Animated.set(
              cardTranslations[index],
              Animated.interpolate(animation, {
                inputRange: [0, 0.5, 1],
                outputRange: [0, -CARD_HEIGHT * 1.5, 1],
                extrapolate: Animated.Extrapolate.CLAMP,
              })
            ),
            Animated.cond(
              Animated.and(
                Animated.greaterOrEq(animation, 0.5),
                shouldUpdateZIndex
              ),
              [
                Animated.set(
                  cardZIndexes[index],
                  Animated.add(max(...cardZIndexes), 1)
                ),
                Animated.set(shouldUpdateZIndex, 0),
              ]
            ),
            Animated.cond(
              Animated.not(Animated.clockRunning(clock)),
              Animated.set(shouldUpdateZIndex, 1)
            ),
          ]
        )
      ),
    ]),
    [cards]
  );
  return (
    <Transitioning.View
      ref={containerRef}
      style={styles.container}
      transition={
        <Transition.Out
          interpolation="easeInOut"
          type="fade"
          durationMs={400}
        />
      }
    >
      <View style={styles.cards}>
        {cards.map((card, index) => {
          const translateY = cardTranslations[index];
          const rotateZ = Animated.concat(cardRotations[index], "deg");
          const elevation = cardZIndexes[index];
          const zIndex = elevation;

          return (
            <Animated.View
              key={card.id}
              style={{
                ...StyleSheet.absoluteFillObject,
                zIndex,
                elevation,
                transform: [
                  { translateX: Animated.multiply(translateX, -1) },
                  { rotateZ },
                  { translateX },
                  { translateY },
                ],
              }}
            >
              <Card key={card.id} {...{ card }} />
            </Animated.View>
          );
        })}
      </View>
      <SafeAreaView>
        {cards.map(({ id, name, color, thumbnail }, index) => (
          <RectButton key={id} onPress={() => selectCard(index)}>
            <View style={styles.button} accessible>
              <Thumbnail {...{ thumbnail }} />
              <View style={styles.label}>
                <Text>{name}</Text>
              </View>
              {selectedCardState === index ? (
                <CheckIcon {...{ color }} />
              ) : null}
            </View>
          </RectButton>
        ))}
      </SafeAreaView>
    </Transitioning.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cards: {
    flex: 1,
    backgroundColor: "#f4f6f3",
  },
  button: {
    flexDirection: "row",
  },
  label: {
    flex: 1,
    borderBottomWidth: 1,
    borderColor: "#f4f6f3",
    justifyContent: "center",
  },
});
