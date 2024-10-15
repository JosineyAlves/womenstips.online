document.addEventListener("DOMContentLoaded", function () {
    const elementoContador = document.getElementById('contador');
    let vagas = 487; // Início com 487 vagas
    const maxVagas = 500; // Número máximo de vagas
    let reducoesFeitas = 0; // Controla a quantidade de vezes que a contagem foi reduzida
    const maxReducoes = Math.floor(Math.random() * 3) + 1; // Número máximo de reduções entre 1 e 3
 
    function atualizarContador() {
       if (vagas < maxVagas) {
          // Define quando diminuir uma vaga de forma aleatória
          if (reducoesFeitas < maxReducoes && (Math.random() < 0.1)) { // 10% de chance de reduzir a cada atualização
             vagas--; // Decrementa vagas
             reducoesFeitas++; // Incrementa o número de reduções feitas
          } else if (vagas < maxVagas) {
             vagas++; // Incrementa vagas
          }
          elementoContador.textContent = vagas;
       }
 
       if (vagas < maxVagas) {
          setTimeout(atualizarContador, Math.random() * 1500 + 2000); // Aumenta o intervalo para dar aspecto de incremento gradual e lento
       }
    }
    atualizarContador(); // Iniciar o processo
 });
 
 
// Função para capturar a cidade a partir do IP usando fetch
function getCity() {
    fetch('https://ipapi.co/json/')
        .then(response => response.json())
        .then(data => {
            const cityName = data.city;
            const cityElements = document.querySelectorAll('.city-name');
            cityElements.forEach(element => {
                element.textContent = cityName;
            });
        })
        .catch(error => {
            console.error('Erro ao obter a cidade:', error);
        });
}

// Executa a função para pegar a cidade quando a página carrega
getCity();

// Contagem regressiva de estoque
let stockCount = 139;
const stockCountElement = document.getElementById('stock-count');

// Array de valores de redução
const reductionValues = [6, 3, 2];
let reductionIndex = 0;

function updateStockCount() {
    if (stockCount > 6) {
        const nextReduction = reductionValues[reductionIndex];
        // Verifica se a próxima redução levará o estoque abaixo de 6
        if (stockCount - nextReduction <= 6) {
            stockCount = 6;
        } else {
            stockCount -= nextReduction;
        }

        stockCountElement.textContent = stockCount;

        // Atualiza o índice para a próxima redução
        reductionIndex = (reductionIndex + 1) % reductionValues.length;
    }
}

function startStockCountdown() {
    setInterval(updateStockCount, 5000); // Diminui o estoque a cada 5 segundos
}
