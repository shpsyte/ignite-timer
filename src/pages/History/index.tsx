import { ReactNode } from 'react';

import { HistoryContainer, HistoryList, Status  } from './styles';

interface HistoryProps {
  children?: ReactNode;
}

export function History({ children }: HistoryProps) {
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
            <tr>
              <td>Tarefa</td>
              <td>20 minutos</td>
              <td>Há 2 meses atrás</td>
              <td><Status statusColor='green' >Concluído</Status ></td>
            </tr>
            <tr>
              <td>Tarefa</td>
              <td>20 minutos</td>
              <td>Há 2 meses atrás</td>
              <td><Status statusColor='green' >Concluído</Status ></td>
            </tr>
            <tr>
              <td>Tarefa</td>
              <td>20 minutos</td>
              <td>Há 2 meses atrás</td>
              <td><Status statusColor='green' >Concluído</Status ></td>
            </tr>
            <tr>
              <td>Tarefa</td>
              <td>20 minutos</td>
              <td>Há 2 meses atrás</td>
              <td><Status statusColor='green'>Concluído</Status ></td>
            </tr>
            <tr>
              <td>Tarefa</td>
              <td>20 minutos</td>
              <td>Há 2 meses atrás</td>
              <td><Status statusColor='green' >Concluído</Status ></td>
            </tr>
            <tr>
              <td>Tarefa</td>
              <td>20 minutos</td>
              <td>Há 2 meses atrás</td>
              <td><Status statusColor='green' >Concluído</Status ></td>
            </tr>
            <tr>
              <td>Tarefa</td>
              <td>20 minutos</td>
              <td>Há 2 meses atrás</td>
              <td><Status  statusColor='red'>Interrompido</Status ></td>
            </tr>
            <tr>
              <td>Tarefa</td>
              <td>20 minutos</td>
              <td>Há 2 meses atrás</td>
              <td><Status statusColor='green' >Concluído</Status ></td>
            </tr>
          </tbody>
        </table>
      </HistoryList>
      
    </HistoryContainer>
  );
}
