<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Cidade Inteligente - Tema 6</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="container">
    <header>
      <h1> Cidade Inteligente</h1>
      <p>Sistemas inteligentes de iluminação e trânsito</p>
    </header>

    <!-- Painel de informações -->
    <div class="info-panel">
      <div class="info-item">
        <span>Horário:</span>
        <strong id="hora">06:00</strong>
      </div>
      <div class="info-item">
        <span>Período:</span>
        <strong id="periodo">Dia</strong>
      </div>
      <div class="info-item">
        <span>Consumo de Energia:</span>
        <strong id="consumo">0 kWh</strong>
      </div>
      <div class="info-item">
        <span>Energia Solar:</span>
        <strong id="solar">0 kWh</strong>
      </div>
      <div class="info-item">
        <span>Postes Ligados:</span>
        <strong id="postes-status">Desligados</strong>
      </div>
    </div>

    <!-- Cenário da cidade -->
    <div class="cidade" id="cidade">
      <!-- Céu -->
      <div class="ceu" id="ceu"></div>

      <!-- Sol / Lua -->
      <div class="astro" id="astro"></div>

      <!-- Prédios -->
      <div class="predios">
        <div class="predio predio-1">
          <div class="janela"></div>
          <div class="janela"></div>
          <div class="janela"></div>
          <div class="painel-solar"></div>
        </div>
        <div class="predio predio-2">
          <div class="janela"></div>
          <div class="janela"></div>
          <div class="janela"></div>
          <div class="janela"></div>
          <div class="painel-solar"></div>
        </div>
        <div class="predio predio-3">
          <div class="janela"></div>
          <div class="janela"></div>
          <div class="painel-solar"></div>
        </div>
        <div class="predio predio-4">
          <div class="janela"></div>
          <div class="janela"></div>
          <div class="janela"></div>
          <div class="janela"></div>
          <div class="janela"></div>
          <div class="painel-solar"></div>
        </div>
        <div class="predio predio-5">
          <div class="janela"></div>
          <div class="janela"></div>
          <div class="janela"></div>
          <div class="painel-solar"></div>
        </div>
      </div>

      <!-- Postes de luz -->
      <div class="poste poste-1">
        <div class="lampada"></div>
      </div>
      <div class="poste poste-2">
        <div class="lampada"></div>
      </div>
      <div class="poste poste-3">
        <div class="lampada"></div>
      </div>
      <div class="poste poste-4">
        <div class="lampada"></div>
      </div>

      <!-- Rua -->
      <div class="rua">
        <div class="faixa"></div>
        <div class="faixa"></div>
        <div class="faixa"></div>
        <div class="faixa"></div>
      </div>

      <!-- Semáforos -->
      <div class="semaforo semaforo-1">
        <div class="luz vermelho"></div>
        <div class="luz amarelo"></div>
        <div class="luz verde"></div>
      </div>
      <div class="semaforo semaforo-2">
        <div class="luz vermelho"></div>
        <div class="luz amarelo"></div>
        <div class="luz verde"></div>
      </div>

      <!-- Veículos -->
      <div class="carro carro-1" id="carro1">
        <div class="corpo"></div>
        <div class="roda roda-esq"></div>
        <div class="roda roda-dir"></div>
      </div>
      <div class="carro carro-2" id="carro2">
        <div class="corpo"></div>
        <div class="roda roda-esq"></div>
        <div class="roda roda-dir"></div>
      </div>
      <div class="carro carro-3" id="carro3">
        <div class="corpo"></div>
        <div class="roda roda-esq"></div>
        <div class="roda roda-dir"></div>
      </div>
    </div>

    <!-- Controles -->
    <div class="controles">
      <button id="btnIniciar">▶ Iniciar</button>
      <button id="btnPausar">⏸ Pausar</button>
      <button id="btnReiniciar">↺ Reiniciar</button>
      <button id="btnAcelerar">⏩ Acelerar Tempo</button>
      <button id="btnDiaNoite">🌓 Alternar Dia/Noite</button>
    </div>

    <footer>
      <p>Atividade Prática – Animações com JavaScript | Ensino Médio Técnico</p>
    </footer>
  </div>

  <script src="script.js"></script>
</body>
</html>