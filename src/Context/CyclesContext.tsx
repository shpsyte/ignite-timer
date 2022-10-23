import { createContext, useState } from 'react';

export interface Cycle {
  id: string;
  task: string;
  minutes: number;
  startDate: Date;
  interruptDate?: Date;
  endDate?: Date;
}

interface CreateCycleData {
  task: string;
  minutes: number;
}

interface CycleContextType {
  cycles: Cycle[];
  activeCycle: Cycle | null;
  secondsPassed: number;
  markCurrentCycleAsDone: () => void;
  removeCurrentCycle: () => void;
  setSecondsPassed: (seconds: number) => void;
  handleCreateNewCycle: (data: CreateCycleData) => void;
  handleInterrupCycle: () => void;
}

export const CyclesContext = createContext({} as CycleContextType);

export function CycleContextProvider({ children }: { children: React.ReactNode }) {
  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [activeCycle, setActiveCycle] = useState<Cycle | null>(null);
  const [secondsPassed, setSecondsPassed] = useState(0);

  function markCurrentCycleAsDone() {
    setCycles((prev) => {
      return prev.map((c) => {
        if (c.id === activeCycle?.id) {
          return {
            ...c,
            endDate: new Date(),
          };
        }
        return c;
      });
    });
  }

  function removeCurrentCycle() {
    setActiveCycle(null);
  }

  const handleInterrupCycle = () => {
    setCycles((prev) => {
      return prev.map((c) => {
        if (c.id === activeCycle?.id) {
          return {
            ...c,
            interruptDate: new Date(),
          };
        }
        return c;
      });
    });
    setSecondsPassed(0);
    setActiveCycle(null);
  };

  const handleCreateNewCycle = (data: CreateCycleData) => {
    const id = String(new Date().getTime());
    const newCycle: Cycle = {
      id,
      task: data.task,
      minutes: data.minutes,
      startDate: new Date(),
    };
    setCycles((prev) => [...prev, newCycle]);
    setActiveCycle(newCycle);
    setSecondsPassed(0);

    // reset the form
    // reset();
  };

  return (
    <CyclesContext.Provider
      value={{
        cycles,
        activeCycle,
        markCurrentCycleAsDone,
        removeCurrentCycle,
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
