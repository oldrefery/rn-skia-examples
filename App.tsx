import React, {useState} from 'react';
import {Matrix} from './src/components/Matrix/Matrix';
import {GradientClock} from './src/components/GradientClock/GradientClock';

export const enum Samples {
  MATRIX,
  GRADIENT_CLOCK,
}
function App(): Element {
  const [sample, setSample] = useState<Samples>(Samples.GRADIENT_CLOCK);

  const changeSample = () => {
    switch (sample) {
      case Samples.MATRIX:
        setSample(Samples.GRADIENT_CLOCK);
        return;
      case Samples.GRADIENT_CLOCK:
      default:
        setSample(Samples.MATRIX);
    }
  };

  switch (sample) {
    case Samples.GRADIENT_CLOCK:
      return <GradientClock onPress={changeSample} />;
    case Samples.MATRIX:
      return <Matrix />;
    default:
      throw new Error('unknown sample');
  }
}

export default App;
