//variáveis da Bola
let xBola = 300;
let yBola = 200;
let diametro = 14;
let raio = diametro / 2 ;

//velocidade da Bola
let velocidadeXBola = 6;
let velocidadeYBola = 6;
let raqueteComprimento = 10;
let raqueteAltura = 90;

//variáveis da raquete
let xRaquete = 5;
let yRaquete = 150;

//variáveis do oponente
let xRaqueteOponente = 585;
let yRaqueteOponente = 150;
let velocidadeYOponente;

let colidiu = false;

//placar do jogo
let meusPontos = 0;
let pontosDoOponente = 0;

//sons do jogo
let ponto;
let raquetada;
let trilha;

//Oponente errar
let chanceDeErrar = 0;

function preload(){
  trilha = loadSound("./audios/trilha.mp3");
  raquetada = loadSound("./audios/raquetada.mp3");
  ponto = loadSound("./audios/ponto.mp3");
}

function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  background(0,0,255);
  mostraBola();
  movimentaBola();
  verificaColisaoBorda();
  mostraRaquete(xRaquete, yRaquete);
  movimentaMinhaRaquete();
  verificaColisaoRaquete(xRaquete, yRaquete);
  mostraRaquete(xRaqueteOponente, yRaqueteOponente);
  movimentaRaqueteOponente();
  verificaColisaoRaquete(xRaqueteOponente, yRaqueteOponente);
  incluiPlacar();
  marcaPonto();
  movimentaRaqueteOponente();
  BolaNaoFicaPresa()
}

function mostraBola(){
  stroke(255,69,0);
  fill(color(255,69,0));
  circle(xBola, yBola, diametro);
}

function movimentaBola(){
  xBola += velocidadeXBola;
  yBola += velocidadeYBola;
}

function verificaColisaoBorda(){
  if (xBola + raio> width ||
     xBola - raio< 0){
    velocidadeXBola *= -1;
  }
  if (yBola + raio> height ||
     yBola - raio < 0){
    velocidadeYBola *= -1;
  }
}

function mostraRaquete(x,y){
  stroke(0);
  fill(color(0));
  rect(x, y, raqueteComprimento, 
      raqueteAltura);
}

function movimentaMinhaRaquete(){
  if (keyIsDown(UP_ARROW)){
    yRaquete -= 10;
  }
  if (keyIsDown(DOWN_ARROW)){
    yRaquete += 10;
  }
}

function verificaColisaoRaquete(){
  if (xBola - raio < xRaquete + raqueteComprimento && yBola - raio < yRaquete + raqueteAltura && yBola + raio > yRaquete){
    velocidadeXBola *= -1;
  }
}

function verificaColisaoRaquete(x, y){
  colidiu = collideRectCircle(x, y, raqueteComprimento,raqueteAltura, xBola, yBola, raio);
  if (colidiu){
    velocidadexBola *= -1;
    raquetada.play();
  }
}

function movimentaRaqueteOponente(){
  velocidadeYOponente = yBola - yRaqueteOponente - raqueteComprimento / 2 - 30;
  yRaqueteOponente += velocidadeYOponente;
}

function incluiPlacar(){
  stroke(300);
  textAlign(CENTER);
  textSize(16);
  fill(color(255,165,0)); //retangulo
  rect(150, 10, 40, 20);
  fill(255); // pontos
  text(meusPontos, 170, 26);
  fill(color(255,165,0)); // retangulo
  rect(450, 10, 40, 20);
  fill(255); // pontos
  text(pontosDoOponente, 470, 26);
}

function marcaPonto(){
  if (xBola > 590){
    meusPontos += 1;
    ponto.play();
  }
  if (xBola < 10){
    pontosDoOponente += 1;
    ponto.play();
  }
}

function movimentaRaqueteOponente(){
  velocidadeYOponente = yBola - yRaqueteOponente - raqueteComprimento / 2 - 30;
  yRaqueteOponente += velocidadeYOponente + chanceDeErrar;
  calculaChanceDeErrar()
}

function calculaChanceDeErrar() {
  if (pontosDoOponente >= meusPontos) {
    chanceDeErrar += 1;
    if (chanceDeErrar >= 39){
    chanceDeErrar = 40;
    }
  } else {
    chanceDeErrar -= 1;
    if (chanceDeErrar <= 35) {
    chanceDeErrar = 35;
    }
  }
}

function BolaNaoFicaPresa(){
    if (xBola + raio < 0){
    console.log('A bola ficou presa.');
    xBola = 300;
    }
}
