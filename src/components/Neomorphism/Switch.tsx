import {
  Box,
  BoxShadow,
  Circle,
  FitBox,
  Group,
  mix,
  rect,
  rrect,
  SkiaValue,
  useComputedValue,
} from '@shopify/react-native-skia';
import React, {ReactNode} from 'react';
import {Theme} from './Theme';

const src = rect(0, 0, 48, 24);
const border = rrect(src, 12, 12);
const container = rrect(rect(1, 1, 46, 22), 12, 12);
const dot = rrect(rect(6, 6, 12, 12), 12, 12);
interface SwitchProps {
  x: number;
  y: number;
  width: number;
  height: number;
  pressed: SkiaValue;
  children?: ReactNode | ReactNode[];
}
export const Switch = ({
  x,
  y,
  width,
  height,
  pressed,
  children,
}: SwitchProps) => {
  const transform = useComputedValue(
    () => [{translateX: mix(pressed.current, 0, 24)}],
    [pressed],
  );
  const radius = useComputedValue(() => mix(pressed.current, 0, 2), [pressed]);
  return (
    <FitBox src={src} dst={rect(x, y, width, height)}>
      <Box box={border} color={Theme.white1}>
        <BoxShadow dx={-1} dy={-1} blur={3} color={'white'} />
        <BoxShadow dx={1.5} dy={1.5} blur={3} color={'rgba(174,174,192,0.4)'} />
      </Box>
      <Box box={container} color={Theme.white2}>
        <BoxShadow dx={-1} dy={-1} blur={3} color={'white'} inner />
        <BoxShadow
          dx={1.5}
          dy={1.5}
          blur={3}
          color={'rgba(174,174,192,0.7)'}
          inner
        />
      </Box>
      <Group transform={transform}>
        <Box box={dot} color={Theme.white1}>
          <BoxShadow dx={-1} dy={-1} blur={3} color={'white'} />
          <BoxShadow
            dx={1.5}
            dy={1.5}
            blur={3}
            color={'rgba(174,174,192,0.4)'}
          />
        </Box>
        <Circle
          r={radius}
          cx={12}
          cy={12}
          color={'#745FF2'}
          opacity={pressed}
        />
      </Group>
    </FitBox>
  );
};
