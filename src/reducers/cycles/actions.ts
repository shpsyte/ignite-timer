import { Cycle } from './reducer';

export enum CyclesActionTypes {
  CREATE_NEW_CYCLE = 'CREATE_NEW_CYCLE',
  MARK_CURRENT_CYCLE_AS_DONE = 'MARK_CURRENT_CYCLE_AS_DONE',
  INTERRUPT_CURRENT_CYCLE = 'INTERRUPT_CURRENT_CYCLE',
}

export function addNewCycleAction(newCycle: Cycle) {
  return {
    type: CyclesActionTypes.CREATE_NEW_CYCLE,
    payload: {
      newCycle,
    },
  };
}

export function markCurrentCycleAsDoneAction() {
  return {
    type: CyclesActionTypes.MARK_CURRENT_CYCLE_AS_DONE,
  };
}

export function interruptActiveCycleAction() {
  return {
    type: CyclesActionTypes.INTERRUPT_CURRENT_CYCLE,
  };
}
