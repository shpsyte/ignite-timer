import React, { ReactNode, useState, useEffect, createContext } from 'react';
import { HandPalm, Play } from 'phosphor-react';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { StartCountDownButton, StopCountDownButton, HomeContainer } from './styles';
import { CountDown } from './visual/CountDown';
import { Cycle, CycleForm } from './visual/CycleForm';

interface FormData {
  task: string;
  minutes: number;
}

interface CycleContextType {
  activeCycle: Cycle | null;
  secondsPassed: number;
  markCurrentCycleAsDone: () => void;
  removeCurrentCycle: () => void;
  setSecondsPassed: (seconds: number) => void;
}

export const CyclesContext = createContext({} as CycleContextType);

const schema = yup.object().shape({
  task: yup.string().min(1, 'This field is required'),
  minutes: yup
    .number()
    .min(5, 'It should be at least 5 minutes')
    .max(60, 'It shoud be less then 60')
    .required('This field is required'),
});

export function Home() {
  const [cycle, setCycle] = useState<Cycle[]>([]);
  const [activeCycle, setActiveCycle] = useState<Cycle | null>(null);
  const [secondsPassed, setSecondsPassed] = useState(0);
  const newCycleForm = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      task: 'Projeto 1',
      minutes: 25,
    },
  });

  const {
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = newCycleForm;

  const task = watch('task');
  const isSubmitDisabled = !task;

  function markCurrentCycleAsDone() {
    setCycle((prev) => {
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
    setCycle((prev) => {
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

  const handleCreateNewCycle = (data: FormData) => {
    const id = String(new Date().getTime());
    const newCycle: Cycle = {
      id,
      task: data.task,
      minutes: data.minutes,
      startDate: new Date(),
    };
    setCycle((prev) => [...prev, newCycle]);
    setActiveCycle(newCycle);
    setSecondsPassed(0);

    // reset the form
    reset();
  };

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action=''>
        <CyclesContext.Provider
          value={{
            activeCycle,
            markCurrentCycleAsDone,
            removeCurrentCycle,
            secondsPassed,
            setSecondsPassed,
          }}
        >
          <FormProvider {...newCycleForm}>
            <CycleForm />
          </FormProvider>
          <CountDown />
        </CyclesContext.Provider>

        {activeCycle ? (
          <StopCountDownButton type='button' onClick={handleInterrupCycle}>
            <HandPalm size={24} /> Interromper
          </StopCountDownButton>
        ) : (
          <StartCountDownButton disabled={isSubmitDisabled} type='submit'>
            <Play size={24} /> Começar
          </StartCountDownButton>
        )}
      </form>
    </HomeContainer>
  );
}
