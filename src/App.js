import React, { useState, useEffect } from 'react';
import './styles/app.css';

let timeCronometro = null;

const App = () => {
  let [milliseconds, setMilliseconds] = useState(0);
  let [seconds, setSeconds] = useState(0);
  let [minutes, setMinutes] = useState(0);

  const cronometroInitial = [minutes,seconds,milliseconds];

  let [cronometro, setCronometro] = useState(cronometroInitial);
  let [hasPlayCronometro, setHasPlayCronometro] = useState(false);

  const startCronometro = () => {
    const interval = 10; //10ms
    timeCronometro = setInterval(() => {      
      setMilliseconds(milliseconds++);

      if(milliseconds === 100){
        setSeconds(seconds++);
        milliseconds = 0;
      }

      if(seconds === 60){
        setMinutes(minutes++);
        seconds = 0;
      }
      setCronometro([minutes, seconds, milliseconds]);
    }, interval);
  };

  const pauseCronometro = () => {
    clearInterval(timeCronometro);
    setMinutes(cronometro[0]);
    setSeconds(cronometro[1]);
    setMilliseconds(cronometro[2]);
  };

  const toggleCronomentro = () => {
      if(hasPlayCronometro) {
        pauseCronometro();
      } else {
        startCronometro();
      }
      setHasPlayCronometro(!hasPlayCronometro);
  };

  const zerarCronometro = () => {
    clearInterval(timeCronometro);
    setMinutes(0);
    setSeconds(0);
    setMilliseconds(0);
    setCronometro([0,0,0]);
    setHasPlayCronometro(false);
  };

  const painelCronometro = time => {
    const minutes = time[0] > 9 ? time[0] : `0${time[0]}`;
    const seconds = time[1] > 9 ? time[1] : `0${time[1]}`;
    const milliseconds = time[2] > 9 ? time[2] : `0${time[2]}`;
    return `${minutes}:${seconds}:${milliseconds}`;
  };

  const controlPressKyeboard = event => {
    if(event.keyCode === 32) {
      toggleCronomentro();
    } else if(event.keyCode === 27) {
      zerarCronometro();
    }
  }

  return (
    <div className="App" onKeyDown={controlPressKyeboard}>
      <div className="wrapper">
  <div id="difference">{painelCronometro(cronometro)}</div>
      </div>
      <div className="wrapper">
        <div id="acoes">
          <a href="#" 
             onClick={toggleCronomentro}
             className={hasPlayCronometro ? 'pause' : ''}
             id="start_button"
             title="Utilize a barra de espaço para iniciar a contagem">
            {!hasPlayCronometro ? 'Iniciar' : 'Pausar'}
            <span className="subtitle">barra de espaço</span></a>
          <a href="#"
             onClick={zerarCronometro}
             id="esc_button"
             title="Utilize a tecla ESC para zerar a contagem">Zerar<span className="subtitle">esc</span></a>
        </div>
      </div>
    </div>
  );
}

export default App;
