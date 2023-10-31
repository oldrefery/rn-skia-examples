import React, {useState} from 'react';
import {Matrix} from './src/components/Matrix/Matrix';
import {GradientClock} from './src/components/GradientClock/GradientClock';

export const enum Samples {
  MATRIX,
  GRADIENT_CLOCK,
}
function App(): Element {
  const [sample, _setSample] = useState<Samples>(Samples.GRADIENT_CLOCK);

  switch (sample) {
    case Samples.GRADIENT_CLOCK:
      return <GradientClock />;
    case Samples.MATRIX:
      return <Matrix />;
    default:
      throw new Error('unknown sample');
  }
}

export default App;
