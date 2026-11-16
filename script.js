
let hora = 6;                    
let minuto = 0;
let animacaoAtiva = false;       
let velocidadeTempo = 1;         
let intervaloPrincipal = null;   
let intervaloSemaforo = null;

// Elementos do DOM
const cidade = document.getElementById('cidade');
const astro = document.getElementById('astro');
const horaDisplay = document.getElementById('hora');
const periodoDisplay = document.getElementById('periodo');
const consumoDisplay = document.getElementById('consumo');
const solarDisplay = document.getElementById('solar');
const postesStatus = document.getElementById('postes-status');

const lampadas = document.querySelectorAll('.lampada');
const carros = [
  document.getElementById('carro1'),
  document.getElementById('carro2'),
  document.getElementById('carro3')
];

// Estado dos carros
const estadoCarros = [
  { posicao: -80, velocidade: 2.2, parado: false },
  { posicao: -200, velocidade: 1.8, parado: false },
  { posicao: -350, velocidade: 2.5, parado: false }
];

// Estado dos semáforos (0 = vermelho, 1 = amarelo, 2 = verde)
let estadoSemaforo = 2; // Começa no verde
let contadorSemaforo = 0;

// Consumo de energia
let consumoTotal = 0;
let energiaSolar = 0;

// ---------- FUNÇÕES PRINCIPAIS ----------

/**
 * Atualiza o horário e o período (dia/noite)
 */
function atualizarHorario() {
  minuto += velocidadeTempo;
  
  if (minuto >= 60) {
    minuto = 0;
    hora++;
    if (hora >= 24) {
      hora = 0;
    }
  }

  // Formata a hora
  const horaFormatada = String(hora).padStart(2, '0') + ':' + String(Math.floor(minuto)).padStart(2, '0');
  horaDisplay.textContent = horaFormatada;

  // Define se é dia ou noite (dia = 6h às 18h)
  const ehNoite = (hora < 6 || hora >= 18);
  
  if (ehNoite) {
    cidade.classList.add('noite');
    periodoDisplay.textContent = 'Noite';
    periodoDisplay.style.color = '#a29bfe';
  } else {
    cidade.classList.remove('noite');
    periodoDisplay.textContent = 'Dia';
    periodoDisplay.style.color = '#00d9ff';
  }

  // Controla os postes de luz automaticamente
  controlarPostes(ehNoite);

  // Calcula energia solar e consumo
  calcularEnergia(ehNoite);
}

/**
 * Liga/desliga os postes de luz (desafio adicional)
 * Economia de energia: postes desligados de dia
 */
function controlarPostes(ehNoite) {
  lampadas.forEach(lampada => {
    if (ehNoite) {
      lampada.classList.add('ligada');
    } else {
      lampada.classList.remove('ligada');
    }
  });

  postesStatus.textContent = ehNoite ? 'Ligados' : 'Desligados (economia)';
  postesStatus.style.color = ehNoite ? '#ffd700' : '#2ecc71';
}

/**
 * Calcula consumo de energia e produção solar
 */
function calcularEnergia(ehNoite) {
  // Consumo dos postes (só à noite)
  if (ehNoite) {
    consumoTotal += 0.05 * velocidadeTempo;
  }

  // Energia solar (só de dia)
  if (!ehNoite) {
    energiaSolar += 0.08 * velocidadeTempo;
  }

  consumoDisplay.textContent = consumoTotal.toFixed(1) + ' kWh';
  solarDisplay.textContent = energiaSolar.toFixed(1) + ' kWh';
}

/**
 * Controla o ciclo dos semáforos
 * Verde -> Amarelo -> Vermelho -> Verde...
 */
function atualizarSemaforos() {
  contadorSemaforo++;

  // Tempos aproximados (em ciclos)
  // Verde: 40 ciclos | Amarelo: 10 | Vermelho: 40
  if (estadoSemaforo === 2 && contadorSemaforo >= 40) {
    estadoSemaforo = 1; // Vai para amarelo
    contadorSemaforo = 0;
  } else if (estadoSemaforo === 1 && contadorSemaforo >= 10) {
    estadoSemaforo = 0; // Vai para vermelho
    contadorSemaforo = 0;
  } else if (estadoSemaforo === 0 && contadorSemaforo >= 40) {
    estadoSemaforo = 2; // Volta para verde
    contadorSemaforo = 0;
  }

  // Aplica o estado visual nos dois semáforos
  const semaforos = document.querySelectorAll('.semaforo');
  semaforos.forEach(semaforo => {
    const luzes = semaforo.querySelectorAll('.luz');
    luzes.forEach(luz => luz.classList.remove('ativo'));

    if (estadoSemaforo === 0) {
      luzes[0].classList.add('ativo'); // Vermelho
    } else if (estadoSemaforo === 1) {
      luzes[1].classList.add('ativo'); // Amarelo
    } else {
      luzes[2].classList.add('ativo'); // Verde
    }
  });
}

/**
 * Move os carros pela rua
 * Os carros param no semáforo vermelho
 */
function moverCarros() {
  // Posições aproximadas dos semáforos na tela
  const posSemaforo1 = 28; // % da largura
  const posSemaforo2 = 72;

  carros.forEach((carro, index) => {
    const estado = estadoCarros[index];

    // Verifica se deve parar no semáforo vermelho
    const larguraCidade = cidade.offsetWidth;
    const posicaoAtualPx = estado.posicao;
    const posicaoPercent = (posicaoAtualPx / larguraCidade) * 100;

    // Lógica de parada nos semáforos
    let deveParar = false;

    if (estadoSemaforo === 0) { // Vermelho
      // Para perto do primeiro semáforo
      if (posicaoPercent > posSemaforo1 - 8 && posicaoPercent < posSemaforo1 - 2) {
        deveParar = true;
      }
      // Para perto do segundo semáforo
      if (posicaoPercent > posSemaforo2 - 8 && posicaoPercent < posSemaforo2 - 2) {
        deveParar = true;
      }
    }

    estado.parado = deveParar;

    // Move o carro se não estiver parado
    if (!estado.parado) {
      estado.posicao += estado.velocidade * velocidadeTempo;
    }

    // Reinicia o carro quando sai da tela
    if (estado.posicao > larguraCidade + 60) {
      estado.posicao = -80 - (index * 120);
    }

    // Aplica a posição
    carro.style.left = estado.posicao + 'px';
  });
}

/**
 * Função principal do loop de animação
 */
function loopPrincipal() {
  if (!animacaoAtiva) return;

  atualizarHorario();
  atualizarSemaforos();
  moverCarros();
}

/**
 * Inicia a animação
 */
function iniciar() {
  if (animacaoAtiva) return;
  
  animacaoAtiva = true;
  intervaloPrincipal = setInterval(loopPrincipal, 50); // ~20 FPS
  console.log('Animação iniciada');
}

/**
 * Pausa a animação
 */
function pausar() {
  animacaoAtiva = false;
  if (intervaloPrincipal) {
    clearInterval(intervaloPrincipal);
    intervaloPrincipal = null;
  }
  console.log('Animação pausada');
}

/**
 * Reinicia tudo
 */
function reiniciar() {
  pausar();

  // Reseta variáveis
  hora = 6;
  minuto = 0;
  velocidadeTempo = 1;
  consumoTotal = 0;
  energiaSolar = 0;
  estadoSemaforo = 2;
  contadorSemaforo = 0;

  // Reseta posição dos carros
  estadoCarros[0].posicao = -80;
  estadoCarros[1].posicao = -200;
  estadoCarros[2].posicao = -350;

  estadoCarros.forEach((estado, i) => {
    carros[i].style.left = estado.posicao + 'px';
  });

  // Atualiza displays
  atualizarHorario();
  atualizarSemaforos();

  console.log('Animação reiniciada');
}

/**
 * Acelera o tempo
 */
function acelerarTempo() {
  velocidadeTempo = velocidadeTempo === 1 ? 3 : velocidadeTempo === 3 ? 6 : 1;
  console.log('Velocidade do tempo:', velocidadeTempo + 'x');
}

/**
 * Alterna manualmente entre dia e noite
 */
function alternarDiaNoite() {
  if (hora >= 6 && hora < 18) {
    hora = 20; // Força noite
  } else {
    hora = 10; // Força dia
  }
  minuto = 0;
  atualizarHorario();
}

// ---------- EVENTOS (addEventListener) ----------
document.getElementById('btnIniciar').addEventListener('click', iniciar);
document.getElementById('btnPausar').addEventListener('click', pausar);
document.getElementById('btnReiniciar').addEventListener('click', reiniciar);
document.getElementById('btnAcelerar').addEventListener('click', acelerarTempo);
document.getElementById('btnDiaNoite').addEventListener('click', alternarDiaNoite);

// ---------- INICIALIZAÇÃO ----------
// Configura estado inicial ao carregar a página
window.addEventListener('load', () => {
  atualizarHorario();
  atualizarSemaforos();
  
  // Posiciona os carros inicialmente
  carros.forEach((carro, i) => {
    carro.style.left = estadoCarros[i].posicao + 'px';
  });

  console.log('Cidade Inteligente carregada. Clique em Iniciar!');
});