import React, {useEffect} from 'react';
import {Pressable, StyleSheet, Text, useWindowDimensions} from 'react-native';
import {Canvas, Rect, SweepGradient, vec} from '@shopify/react-native-skia';
import {
  Easing,
  useDerivedValue,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  dayText: {
    position: 'absolute',
    top: 70,
    fontSize: 90,
    alignSelf: 'center',
  },
  nightText: {
    position: 'absolute',
    bottom: 70,
    fontSize: 90,
    alignSelf: 'center',
    color: 'white',
  },
});

interface GradientClockProps {
  onPress?: () => void;
}

export const GradientClock = ({onPress}: GradientClockProps) => {
  const {height, width} = useWindowDimensions();
  const centerX = width / 2;
  const centerY = height / 2;
  const centerVec = vec(centerX, centerY);
  const rotation = useSharedValue(0);

  useEffect(() => {
    rotation.value = withRepeat(
      withTiming(2, {
        duration: 5000,
        easing: Easing.linear,
      }),
      -1,
      false,
    );
  }, [rotation]);

  const animatedRotation = useDerivedValue(() => {
    return [{rotate: Math.PI * rotation.value}];
  }, [rotation]);

  return (
    <Pressable style={styles.container} onPress={onPress}>
      <Canvas style={styles.container}>
        <Rect color={'black'} x={0} y={0} height={height} width={width}>
          <SweepGradient
            c={centerVec}
            origin={centerVec}
            colors={['white', 'black']}
            start={0}
            end={360}
            transform={animatedRotation}
          />
        </Rect>
      </Canvas>
      <Text style={styles.dayText}>DAY</Text>
      <Text style={styles.nightText}>NIGHT</Text>
    </Pressable>
  );
};
