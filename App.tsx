import React, {useState} from 'react';
import {Matrix} from './src/components/Matrix/Matrix';
import {GradientClock} from './src/components/GradientClock/GradientClock';
import {DonutChart} from './src/components/DonutChart/DonutChart';
import {runTiming, useFont, useValue} from '@shopify/react-native-skia';
import {PixelRatio, Pressable, StyleSheet, Text, View} from 'react-native';
import {Easing} from 'react-native-reanimated';
import {Neomorphism} from './src/components/Neomorphism/Neomorphism';

const RADIUS = PixelRatio.roundToNearestPixel(130);
const STROKE_WIDTH = 18;
export const enum Samples {
  MATRIX,
  DONUT_CHART,
  GRADIENT_CLOCK,
  NEOMORPHISM,
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'green',
    paddingHorizontal: 60,
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 40,
  },
  buttonTitle: {
    color: 'white',
    fontSize: 20,
  },
  donutChartContainer: {
    height: RADIUS * 2,
    width: RADIUS * 2,
  },
});

function App(): Element {
  const [sample, setSample] = useState<Samples>(Samples.NEOMORPHISM);
  const percentageComplete = 0.85;
  const animationState = useValue(0);

  const font = useFont(require('./src/assets/fonts/Roboto-Light.ttf'), 60);
  const smallFont = useFont(require('./src/assets/fonts/Roboto-Light.ttf'), 24);
  if (!font || !smallFont) {
    return <View />;
  }

  const animateChart = () => {
    animationState.current = 0;

    runTiming(animationState, percentageComplete, {
      duration: 1500,
      easing: Easing.inOut(Easing.cubic),
    });
  };
  const changeSample = () => {
    switch (sample) {
      case Samples.MATRIX:
        setSample(Samples.DONUT_CHART);
        return;
      case Samples.DONUT_CHART:
        setSample(Samples.GRADIENT_CLOCK);
        return;
      case Samples.GRADIENT_CLOCK:
        setSample(Samples.NEOMORPHISM);
        return;
      case Samples.NEOMORPHISM:
        setSample(Samples.MATRIX);
        return;
      default:
        setSample(Samples.MATRIX);
    }
  };

  switch (sample) {
    case Samples.MATRIX:
      return (
        <Pressable style={styles.container} onPress={changeSample}>
          <Matrix />
        </Pressable>
      );
    case Samples.DONUT_CHART:
      return (
        <Pressable style={styles.container} onPress={changeSample}>
          <View style={styles.donutChartContainer}>
            <DonutChart
              strokeWidth={STROKE_WIDTH}
              radius={RADIUS}
              percentageComplete={animationState}
              titleFont={font}
              subtitleFont={smallFont}
              targetPercentage={percentageComplete}
            />
          </View>
          <Pressable style={styles.button} onPress={animateChart}>
            <Text style={styles.buttonTitle}>Show animation</Text>
          </Pressable>
        </Pressable>
      );
    case Samples.GRADIENT_CLOCK:
      return <GradientClock onPress={changeSample} />;
    case Samples.NEOMORPHISM:
      return <Neomorphism />;
    default:
      throw new Error('unknown sample');
  }
}

export default App;
