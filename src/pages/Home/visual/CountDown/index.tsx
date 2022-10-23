import { useContext, useEffect, useState } from 'react';
import { CountDownContainer, Separator } from './styles';
import { differenceInSeconds } from 'date-fns';
import { CyclesContext } from '../../../../Context/CyclesContext';

export function CountDown() {
  const { secondsPassed, setSecondsPassed, activeCycle, markCurrentCycleAsDone } =
    useContext(CyclesContext);

  const totalSeconds = activeCycle ? activeCycle.minutes * 60 : 0;
  const currentSeconds = totalSeconds - secondsPassed;
  const minutes = String(Math.floor(currentSeconds / 60)).padStart(2, '0');
  const seconds = String(currentSeconds % 60).padStart(2, '0');

  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutes}:${seconds}`;
    }
  }, [minutes, seconds, activeCycle]);

  useEffect(() => {
    let interval: number;
    if (activeCycle) {
      interval = setInterval(() => {
        const secondDifference = differenceInSeconds(new Date(), new Date(activeCycle.startDate));

        if (secondDifference >= totalSeconds) {
          markCurrentCycleAsDone();
          clearInterval(interval);

          setSecondsPassed(0);
        } else {
          setSecondsPassed(differenceInSeconds(new Date(), new Date(activeCycle.startDate)));
        }
      }, 1000);
    }

    // cleanup
    return () => {
      clearInterval(interval);
    };
  }, [activeCycle, totalSeconds, activeCycle?.id, markCurrentCycleAsDone, setSecondsPassed]);

  return (
    <CountDownContainer>
      <span>{minutes[0]}</span>
      <span>{minutes[1]}</span>

      <Separator>:</Separator>
      <span>{seconds[0]}</span>
      <span>{seconds[1]}</span>
    </CountDownContainer>
  );
}
