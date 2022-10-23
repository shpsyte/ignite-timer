import { ReactNode, useContext } from 'react';
import { CyclesContext } from '../../Context/CyclesContext';
import { formatDistanceToNow } from 'date-fns';
import { HistoryContainer, HistoryList, Status } from './styles';

interface HistoryProps {
  children?: ReactNode;
}

export function History({ children }: HistoryProps) {
  const { cycles } = useContext(CyclesContext);

  return (
    <HistoryContainer>
      <h1>Meu Histórico</h1>
      <HistoryList>
        <table>
          <thead>
            <tr>
              <th>Tarefa</th>
              <th>Duração</th>
              <th>Inicio</th>
              <th>Status </th>
            </tr>
          </thead>
          <tbody>
            {cycles.map((cycle) => (
              <tr key={cycle.id}>
                <td>{cycle.task}</td>
                <td>{cycle.minutes} minutos</td>
                <td>
                  {formatDistanceToNow(cycle.startDate, {
                    addSuffix: true,
                  })}
                </td>
                <td>
                  {cycle.endDate && <Status statusColor='green'>Concluído</Status>}
                  {cycle.interruptDate && <Status statusColor='red'>Interrompido</Status>}
                  {!cycle.interruptDate && !cycle.endDate && (
                    <Status statusColor='yellow'>Em Andamento</Status>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  );
}
