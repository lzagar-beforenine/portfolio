import React from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  withDelay,
  withTiming,
  FadeOut,
  FadeIn,
} from "react-native-reanimated";
import AnimatedCard from "./AnimatedCard";

import Card, { Card as CardModel, CARD_WIDTH, CARD_HEIGHT } from "./Card";
import CheckIcon from "./CheckIcon";
import Thumbnail from "./Thumbnail";

interface CardSelectionProps {
  cards: [CardModel, CardModel, CardModel];
}

const INITIAL_INDEX: number = -1;

export default ({ cards }: CardSelectionProps) => {
  const [cardSelectedState, setCardSelectedState] =
    React.useState(INITIAL_INDEX);
  const cardsRef = React.useRef(cards.map(() => 0));

  function selectCard(index: number) {
    setCardSelectedState(index);
    cardsRef.current[index] = Math.max(...cardsRef.current) + 1;
  }

  const step = React.useMemo(() => 30 / (cards.length - 1), [cards]);

  return (
    <View style={styles.container}>
      <Animated.View style={styles.cards}>
        {cards.map((card, index) => (
          <AnimatedCard
            card={card}
            index={index}
            cardsLength={cards.length}
            step={step}
            key={index}
            selectedIndex={cardSelectedState}
            cardsRef={cardsRef}
          />
        ))}
      </Animated.View>
      <SafeAreaView>
        {cards.map(({ id, name, color, thumbnail }, index) => (
          <RectButton key={id} onPress={() => selectCard(index)}>
            <View style={styles.button} accessible>
              <Thumbnail {...{ thumbnail }} />
              <View style={styles.label}>
                <Text>{name}</Text>
              </View>
              {cardSelectedState === index ? (
                <Animated.View
                  style={{ justifyContent: "center" }}
                  exiting={FadeOut.duration(400)}
                  entering={FadeIn.duration(400)}
                >
                  <CheckIcon {...{ color }} />
                </Animated.View>
              ) : null}
            </View>
          </RectButton>
        ))}
      </SafeAreaView>
    </View>
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
