import { ReactNode } from 'react';
import { Play } from 'phosphor-react'
import { StartCountDownButton, CountDownContainer, FormContainer, HomeContainer, Separator, MinutesInput, TaskInput } from './styles';

interface HomeProps {
  children?: ReactNode;
}

export function Home({ children }: HomeProps) {
  return (
    <HomeContainer>
      <form action=''>
        <FormContainer>
          <label htmlFor='task'>Vou trablahar einh</label>
          <TaskInput id='task' list='task-suggestion' placeholder='Dê um nome para seu projeto' />
          <datalist id="task-suggestion">
            <option>Projeto 1</option>
            <option>Projeto 2</option>
            <option>Projeto 3</option>
          </datalist>

          <label htmlFor="minutes">durante</label>
          <MinutesInput type="number" id='minutes' step={5} min={5} max={60}  placeholder='00'/>

          <span>minutos.</span>
        </FormContainer>
     

        <CountDownContainer>
          <span>0</span>
          <span>0</span>

          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountDownContainer>

        <StartCountDownButton disabled type="submit"><Play size={24} /> Começar</StartCountDownButton>

      </form>
     
    </HomeContainer>
  );
}
