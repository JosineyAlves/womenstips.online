document.addEventListener('DOMContentLoaded', function() {
    const dateDisplay = document.getElementById('dateDisplay');
    const date = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    dateDisplay.innerText = date.toLocaleDateString('en-US', options);
});

document.getElementById('menu-toggle').addEventListener('click', function() {
    var nav = document.getElementById('nyt-nav');
    nav.classList.toggle('active'); // Alternar a classe 'active'
});

// Função para iniciar o contador regressivo
function startCountdown() {
    var timerElement = document.getElementById('timer');
    var timeLeft = 119; // 1:59 em segundos

    // Atualiza o contador a cada segundo
    var countdownInterval = setInterval(function() {
        var minutes = Math.floor(timeLeft / 60);
        var seconds = timeLeft % 60;

        // Formata o tempo restante como mm:ss
        var formattedTime = minutes.toString().padStart(2, '0') + ':' + seconds.toString().padStart(2, '0');
        timerElement.textContent = formattedTime;

        // Verifica se o tempo acabou
        if (timeLeft === 0) {
            clearInterval(countdownInterval);
            timerElement.textContent = 'Time\'s up!';
        } else {
            timeLeft--; // Decrementa o tempo restante
        }
    }, 1000); // Atualiza a cada segundo
}

// Chama a função de iniciar o contador assim que a página for carregada
window.addEventListener('load', startCountdown);