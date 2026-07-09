import { createContext } from 'react';
import type { ViewerContextValue } from '@/viewer/types';

export const ViewerContext = createContext<ViewerContextValue | null>(null);
