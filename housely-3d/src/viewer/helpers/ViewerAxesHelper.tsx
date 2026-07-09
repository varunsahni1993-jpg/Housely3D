/* eslint-disable react/no-unknown-property */
import { memo } from 'react';

export const ViewerAxesHelper = memo(function ViewerAxesHelper() {
  if (!import.meta.env.DEV) {
    return null;
  }

  return <axesHelper args={[3]} position={[0, 0.02, 0]} />;
});
