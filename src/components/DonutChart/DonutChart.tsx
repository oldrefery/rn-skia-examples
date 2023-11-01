import React from 'react';
import {StyleSheet, View} from 'react-native';
import {
  Canvas,
  Path,
  SkFont,
  Skia,
  SkiaMutableValue,
  Text,
} from '@shopify/react-native-skia';

interface DonutChartProps {
  strokeWidth: number;
  radius: number;
  percentageComplete: SkiaMutableValue<number>;
  titleFont: SkFont;
  subtitleFont: SkFont;
  targetPercentage: number;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export const DonutChart = ({
  strokeWidth,
  radius,
  percentageComplete,
  titleFont,
  subtitleFont,
  targetPercentage,
}: DonutChartProps) => {
  const innerRadius = radius - strokeWidth / 2;
  const targetText = `${targetPercentage * 100}`;

  const path = Skia.Path.Make();
  path.addCircle(radius, radius, innerRadius);
  const width = titleFont.measureText(targetText).width;

  return (
    <View style={styles.container}>
      <Canvas style={styles.container}>
        <Path
          path={path}
          color={'red'}
          style={'stroke'}
          strokeWidth={strokeWidth}
          strokeCap={'round'}
          start={0}
          end={percentageComplete}
        />
        <Text
          text={targetText}
          x={innerRadius - width / 2 + strokeWidth / 2}
          y={radius + strokeWidth}
          font={titleFont}
          opacity={percentageComplete}
        />
        <Text
          text={'Completed'}
          x={innerRadius - width / 2 - strokeWidth}
          y={radius + 50}
          font={subtitleFont}
          opacity={targetPercentage}
        />
      </Canvas>
    </View>
  );
};
