import { ReactNode, useContext } from 'react';
import { FormContainer, TaskInput, MinutesInput } from './styles';
import { useFormContext } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { CyclesContext } from '../../../../Context/CyclesContext';

interface CycleFormProps {
  children?: ReactNode;
}

interface Cycle {
  id: string;
  task: string;
  minutes: number;
  startDate: Date;
  interruptDate?: Date;
  endDate?: Date;
}

export function CycleForm({ children }: CycleFormProps) {
  const { activeCycle } = useContext(CyclesContext);
  const { register } = useFormContext();

  return (
    <FormContainer>
      <label htmlFor='task'>Vou trablahar einh</label>
      <TaskInput
        id='task'
        list='task-suggestion'
        placeholder='Dê um nome para seu projeto'
        disabled={!!activeCycle}
        {...register('task')}
      />
      <datalist id='task-suggestion'>
        <option>Projeto 1</option>
        <option>Projeto 2</option>
        <option>Projeto 3</option>
      </datalist>

      <label htmlFor='minutes'>durante</label>
      <MinutesInput
        type='number'
        id='minutes'
        step={5}
        min={5}
        max={60}
        disabled={!!activeCycle}
        placeholder='00'
        {...register('minutes', {
          valueAsNumber: true,
        })}
      />

      <span>minutos.</span>
    </FormContainer>
  );
}
