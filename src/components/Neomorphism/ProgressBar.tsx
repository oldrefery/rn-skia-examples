import React from 'react';
import {
  Box,
  BoxShadow,
  Circle,
  Group,
  LinearGradient,
  Path,
  rect,
  rrect,
  Skia,
  SkiaValue,
  SweepGradient,
  Text,
  translate,
  useComputedValue,
  useFont,
  vec,
} from '@shopify/react-native-skia';

const OFFSET_Y = 200;

const r1 = 85;
const r2 = 60;
const path = Skia.Path.Make();
path.addCircle(12 + r1, 12 + r1 + OFFSET_Y, r1);
const c = vec(12 + r1, 12 + r1);

const fromCircle = (cx: number, cy: number, r: number) =>
  rrect(rect(cx - r, cy - r, 2 * r, 2 * r), r, r);

const colors = ['#2A10FF', '#9EFFFF'];
interface ProgressBarProps {
  progress: SkiaValue<number>;
}
export const ProgressBar = ({progress}: ProgressBarProps) => {
  const font = useFont(require('../../assets/fonts/SF-Mono-Semibold.otf'), 32);
  const text = useComputedValue(
    () => `${Math.round(progress.current * 100)}ºC`,
    [progress],
  );

  if (!font) {
    return null;
  }

  const pos = font.measureText('00ºC');

  return (
    <Group transform={translate({x: 100, y: 223})}>
      <Group>
        <LinearGradient
          start={vec(12, 12 + OFFSET_Y)}
          end={vec(12 + r1, 12 + r1 + OFFSET_Y)}
          colors={['#101113', '#1E2023', '#2B2F33']}
        />
        <Box box={fromCircle(12 + r1, OFFSET_Y + 12 + r1, r1)}>
          <BoxShadow dx={20} dy={20} blur={80} color={'#141415'} />
          <BoxShadow dx={-20} dy={-20} blur={60} color={'#486057'} />
        </Box>
      </Group>
      <Box box={fromCircle(37 + r2, OFFSET_Y + 37 + r2, r2)} color={'#141415'}>
        <BoxShadow
          dx={20}
          dy={20}
          blur={10}
          color={'rgba(59, 68, 81, 0.5)'}
          inner
        />
        <BoxShadow
          dx={-20}
          dy={-20}
          blur={10}
          color={'rgba(0, 0, 0, 0.55)'}
          inner
        />
      </Box>
      <Text
        x={c.x - pos.width / 2}
        y={OFFSET_Y + c.y + pos.height / 2}
        font={font}
        text={text}
        color={'green'}
      />
      <Group>
        <SweepGradient c={vec(12 + r1, 12 + r1 + OFFSET_Y)} colors={colors} />
        <Path
          path={path}
          style={'stroke'}
          strokeWidth={15}
          strokeCap={'round'}
          end={progress}
        />
        <Circle
          color={colors[0]}
          r={7.5}
          cx={12 + 2 * r1}
          cy={12 + r1 + OFFSET_Y}
        />
      </Group>
    </Group>
  );
};
