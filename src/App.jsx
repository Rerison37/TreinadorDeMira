import React, { useState, useEffect } from 'react';

export default function App() {
  const [posicao, setPosicao] = useState({
    top: 0,
    left: 0
  });

  const [contador, setContador] = useState(0);
  const [jogar, setJogando] = useState(false);
  const [acuracia, setAcuracia] = useState(0);
  const [totalCliques, setTotalCliques] = useState(0);
  const [jogoTerminado, setJogoTerminado] = useState(false);

  useEffect(() => {
    if (contador >= 5) {
      setJogando(false);
      setJogoTerminado(true); 
    }
  }, [contador]);

  useEffect(() => {
    if (totalCliques > 0) {
      setAcuracia((contador / totalCliques) * 100);
    } else {
      setAcuracia(0);
    }
  }, [contador, totalCliques]);

  const localizacaoAleatoria = () => {
    const buttonWidth = 80;
    const buttonHeight = 80;

    let top = Math.floor(Math.random() * (window.innerHeight - buttonHeight - 100)) + 100;
    let left = Math.floor(Math.random() * (window.innerWidth - buttonWidth));

    setPosicao({ top, left });
  };

  const Cliques = (e) => {
    e.stopPropagation();
    setContador(contador + 1);
    setTotalCliques(totalCliques + 1);
    localizacaoAleatoria();
  };

  const jogarClick = () => {
    setJogando(true);
    setJogoTerminado(false);
    setContador(0);
    setTotalCliques(0);
  };

  const CliqueErrado = () => {
    if (jogar) {
      setTotalCliques(totalCliques + 1);
    }
  };

  return (
    <div className='main-content' onClick={CliqueErrado}>
      <div className="header">
        {!jogar && !jogoTerminado && (
          <div className="play">
            <button onClick={jogarClick}>
              Jogar
            </button>
          </div>
        )}
      </div>

      {!jogar && jogoTerminado && (
        <div className='info-container'>
          <p>Total de Cliques: {totalCliques}</p>
          <p>Sua Acurácia: {Math.round(acuracia)}%</p>
          <button onClick={jogarClick}>Jogar novamente</button>
        </div>
      )}

      {jogar && (
        <button
          className="click-button"
          onClick={Cliques}
          style={{
            top: `${posicao.top}px`,
            left: `${posicao.left}px`,
          }}
        >
        </button>
      )}
    </div>
  );
}
