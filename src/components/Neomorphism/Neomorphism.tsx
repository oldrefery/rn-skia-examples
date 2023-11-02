import React from 'react';
import {
  Canvas,
  Fill,
  Group,
  mix,
  Path,
  runTiming,
  useTouchHandler,
  useValue,
} from '@shopify/react-native-skia';
import {Dimensions, StyleSheet} from 'react-native';
import {useDerivedValue} from 'react-native-reanimated';
import {Switch} from './Switch';
import {Button} from './Button';

const {width} = Dimensions.get('window');
const PADDING = 32;
const size = width - PADDING * 2;
const x = PADDING;
const y = 75;
export const Neomorphism = () => {
  const pressedButton = useValue(0);
  const pressedSwitch = useValue(0);

  const onTouchButton = useTouchHandler({
    onStart: () => {
      runTiming(pressedButton, 1, {duration: 150});
    },
    onEnd: () => {
      runTiming(pressedButton, 0, {duration: 150});
    },
  });
  const onTouchSwitch = useTouchHandler({
    onEnd: () => {
      runTiming(pressedSwitch, pressedSwitch.current === 1 ? 0 : 1, {
        duration: 150,
      });
    },
  });
  const transform = useDerivedValue(
    () => [
      {scale: mix(pressedButton.current, 0.3, 0.1)},
      {translateX: 20},
      {translateY: 16},
    ],
    [pressedButton],
  );

  return (
    <Canvas style={styles.flex} onTouch={onTouchSwitch}>
      {/*<Fill color={'red'} />*/}
      <Fill color={'#F0F0F3'} />
      <Button
        x={x}
        y={y}
        width={size / 2}
        height={size / 2}
        pressed={pressedButton}>
        <Group transform={transform}>
          <Path
            path="M22.0001 3.66675C32.1256 3.66675 40.3334 11.8746 40.3334 22.0001C40.3334 32.1256 32.1256 40.3334 22.0001 40.3334C19.0342 40.3373 16.1119 39.6187 13.4861 38.2397L5.6211 40.2876C5.3583 40.356 5.08218 40.3546 4.8201 40.2835C4.55802 40.2123 4.31908 40.0739 4.12696 39.882C3.93484 39.6901 3.79622 39.4513 3.72482 39.1892C3.65343 38.9272 3.65174 38.6511 3.71993 38.3882L5.76593 30.5251C4.38323 27.8965 3.66268 24.9702 3.66677 22.0001C3.66677 11.8746 11.8746 3.66675 22.0001 3.66675ZM22.0001 28.4167C21.5139 28.4167 21.0476 28.6099 20.7037 28.9537C20.3599 29.2975 20.1668 29.7639 20.1668 30.2501C20.1668 30.7363 20.3599 31.2026 20.7037 31.5464C21.0476 31.8903 21.5139 32.0834 22.0001 32.0834C22.4863 32.0834 22.9526 31.8903 23.2965 31.5464C23.6403 31.2026 23.8334 30.7363 23.8334 30.2501C23.8334 29.7639 23.6403 29.2975 23.2965 28.9537C22.9526 28.6099 22.4863 28.4167 22.0001 28.4167ZM22.0001 12.3751C20.663 12.3751 19.3806 12.9063 18.4351 13.8518C17.4896 14.7972 16.9584 16.0796 16.9584 17.4167C16.9585 17.7651 17.0909 18.1005 17.3287 18.355C17.5666 18.6096 17.8921 18.7644 18.2397 18.7881C18.5873 18.8119 18.9309 18.7028 19.2011 18.483C19.4714 18.2631 19.6481 17.9489 19.6956 17.6037L19.7213 17.1821C19.7832 16.5992 20.0661 16.0622 20.5118 15.6815C20.9576 15.3009 21.5322 15.1054 22.1176 15.1355C22.703 15.1656 23.2546 15.4188 23.659 15.8431C24.0634 16.2674 24.2899 16.8306 24.2918 17.4167C24.2918 18.4049 24.0443 18.8926 23.1093 19.8587L22.5519 20.4271C21.1696 21.8644 20.6251 22.8966 20.6251 24.7501C20.6251 25.1148 20.77 25.4645 21.0278 25.7224C21.2857 25.9802 21.6354 26.1251 22.0001 26.1251C22.3648 26.1251 22.7145 25.9802 22.9724 25.7224C23.2302 25.4645 23.3751 25.1148 23.3751 24.7501C23.3751 23.7619 23.6226 23.2742 24.5576 22.3081L25.1149 21.7397C26.4973 20.3024 27.0418 19.2702 27.0418 17.4167C27.0418 16.0796 26.5106 14.7972 25.5651 13.8518C24.6196 12.9063 23.3372 12.3751 22.0001 12.3751Z"
            color={'#922A8D'}
          />
        </Group>
      </Button>
      <Switch
        x={x}
        y={y + size / 2}
        width={size}
        height={size}
        pressed={pressedSwitch}
      />
    </Canvas>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
});
