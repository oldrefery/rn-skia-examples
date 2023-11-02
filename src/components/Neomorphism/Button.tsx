import React, {ReactNode} from 'react';
import {
  Box,
  BoxShadow,
  FitBox,
  mix,
  rect,
  rrect,
  SkiaValue,
  useComputedValue,
} from '@shopify/react-native-skia';
import {Theme} from './Theme';

const src = rect(0, 0, 24, 24);
const border = rrect(src, 5, 5);
const container = rrect(rect(1, 1, 22, 22), 5, 5);
interface ButtonProps {
  x: number;
  y: number;
  width: number;
  height: number;
  pressed: SkiaValue;
  children?: ReactNode | ReactNode[];
}
export const Button = ({
  x,
  y,
  width,
  height,
  pressed,
  children,
}: ButtonProps) => {
  const c1 = useComputedValue(
    () => `rgba(255, 255, 255, ${mix(pressed.current, 0, 0.7)})`,
    [pressed],
  );
  const c2 = useComputedValue(
    () => `rgba(174, 174, 192, ${mix(pressed.current, 0, 0.5)})`,
    [pressed],
  );
  return (
    <FitBox src={src} dst={rect(x, y, width, height)}>
      <Box box={border} color={Theme.white1}>
        <BoxShadow dx={-1} dy={-1} blur={3} color={'white'} />
        <BoxShadow dx={1.5} dy={1.5} blur={3} color={'rgba(174,174,192,0.6)'} />
      </Box>
      <Box box={container} color={Theme.white2}>
        <BoxShadow dx={-1} dy={-1} blur={3} color={c1} inner />
        <BoxShadow dx={1.5} dy={1.5} blur={3} color={c2} inner />
      </Box>
      {children}
    </FitBox>
  );
};
