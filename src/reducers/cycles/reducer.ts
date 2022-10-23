import { CyclesActionTypes } from './actions';
import { produce } from 'immer';
interface CyclesState {
  cycles: Cycle[];
  activeCycle: Cycle | null;
}

export interface Cycle {
  id: string;
  task: string;
  minutes: number;
  startDate: Date;
  interruptDate?: Date;
  endDate?: Date;
}

export function cyclesReducers(state: CyclesState, action: any) {
  switch (action.type) {
    case CyclesActionTypes.CREATE_NEW_CYCLE:
      return produce(state, (draft) => {
        draft.cycles.push(action.payload.newCycle);
        draft.activeCycle = action.payload.newCycle;
      });
    case CyclesActionTypes.INTERRUPT_CURRENT_CYCLE: {
      const currentIndex = state.cycles.findIndex((cycle) => cycle.id === state.activeCycle?.id);

      if (currentIndex < 0) {
        return state;
      }

      return produce(state, (draft) => {
        draft.activeCycle = null;
        draft.cycles[currentIndex].interruptDate = new Date();
      });
    }
    case CyclesActionTypes.MARK_CURRENT_CYCLE_AS_DONE: {
      const currentIndex = state.cycles.findIndex((cycle) => cycle.id === state.activeCycle?.id);

      if (currentIndex < 0) {
        return state;
      }
      return produce(state, (draft) => {
        draft.activeCycle = null;
        draft.cycles[currentIndex].endDate = new Date();
      });
    }
    default:
      return state;
  }
}
