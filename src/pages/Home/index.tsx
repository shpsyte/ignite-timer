import { useContext } from 'react';
import { HandPalm, Play } from 'phosphor-react';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { StartCountDownButton, StopCountDownButton, HomeContainer } from './styles';
import { CountDown } from './visual/CountDown';
import { CycleForm } from './visual/CycleForm';
import { CyclesContext } from '../../Context/CyclesContext';

interface FormData {
  task: string;
  minutes: number;
}

const schema = yup.object().shape({
  task: yup.string().min(1, 'This field is required'),
  minutes: yup
    .number()
    .min(5, 'It should be at least 5 minutes')
    .max(60, 'It shoud be less then 60')
    .required('This field is required'),
});

export function Home() {
  const { handleCreateNewCycle, handleInterrupCycle, activeCycle } = useContext(CyclesContext);

  const newCycleForm = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      task: '',
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

  const onCreateNewCycle = (data: FormData) => {
    handleCreateNewCycle(data);
    reset();
  };

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(onCreateNewCycle)} action=''>
        <FormProvider {...newCycleForm}>
          <CycleForm />
        </FormProvider>
        <CountDown />

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
