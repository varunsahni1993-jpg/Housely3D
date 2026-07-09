import { Grid } from '@react-three/drei';
import { memo } from 'react';

export const ViewerGrid = memo(function ViewerGrid() {
  return (
    <Grid
      infiniteGrid
      cellSize={0.5}
      cellThickness={0.75}
      cellColor="#29405c"
      sectionSize={2}
      sectionThickness={1.25}
      sectionColor="#4f7aa6"
      fadeDistance={60}
      fadeStrength={1.5}
      followCamera={false}
      position={[0, 0.01, 0]}
    />
  );
});
