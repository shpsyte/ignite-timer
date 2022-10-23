import { createContext, useReducer, useState } from 'react';
import {
  addNewCycleAction,
  CyclesActionTypes,
  interruptActiveCycleAction,
  markCurrentCycleAsDoneAction,
} from '../reducers/cycles/actions';
import { Cycle, cyclesReducers } from '../reducers/cycles/reducer';

interface CreateCycleData {
  task: string;
  minutes: number;
}

interface CycleContextType {
  cycles: Cycle[];
  activeCycle: Cycle | null;
  secondsPassed: number;
  markCurrentCycleAsDone: () => void;

  setSecondsPassed: (seconds: number) => void;
  handleCreateNewCycle: (data: CreateCycleData) => void;
  handleInterrupCycle: () => void;
}

export const CyclesContext = createContext({} as CycleContextType);

interface CyclesState {
  cycles: Cycle[];
  activeCycle: Cycle | null;
}

export function CycleContextProvider({ children }: { children: React.ReactNode }) {
  const [cyclesState, dispatch] = useReducer(cyclesReducers, { cycles: [], activeCycle: null });
  const [secondsPassed, setSecondsPassed] = useState(0);

  const { cycles, activeCycle } = cyclesState;

  function markCurrentCycleAsDone() {
    dispatch(markCurrentCycleAsDoneAction);
  }

  const handleCreateNewCycle = (data: CreateCycleData) => {
    const id = String(new Date().getTime());
    const newCycle: Cycle = {
      id,
      task: data.task,
      minutes: data.minutes,
      startDate: new Date(),
    };
    dispatch(addNewCycleAction(newCycle));
    setSecondsPassed(0);
  };

  const handleInterrupCycle = () => {
    dispatch(interruptActiveCycleAction());
    setSecondsPassed(0);
  };

  return (
    <CyclesContext.Provider
      value={{
        cycles: cyclesState.cycles,
        activeCycle,
        markCurrentCycleAsDone,

        secondsPassed,
        setSecondsPassed,
        handleCreateNewCycle,
        handleInterrupCycle,
      }}
    >
      {children}
    </CyclesContext.Provider>
  );
}
