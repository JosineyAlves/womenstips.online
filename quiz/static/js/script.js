// Adiciona a classe 'selected' à opção clicada

document.addEventListener('DOMContentLoaded', function() {
    const options = document.querySelectorAll('.quiz-option');
    options.forEach(option => {
        option.addEventListener('click', function() {
            options.forEach(opt => opt.classList.remove('selected')); // Remove a classe 'selected' de todas as opções
            this.classList.add('selected'); // Adiciona a classe 'selected' à opção clicada
        });
    });
});
// Adiciona a classe 'selected' à opção clicada

// Remove a seleção de todas as opções e desabilita o botão avançar

document.addEventListener('DOMContentLoaded', function() {
    const options = document.querySelectorAll('.quiz-option');
    const advanceButton = document.getElementById('avançar');

    options.forEach(option => {
        option.addEventListener('click', function() {
            // Remove a seleção de todas as opções e desabilita o botão avançar
            options.forEach(opt => opt.classList.remove('selected'));

            // Adiciona a classe 'selected' à opção clicada e habilita o botão avançar
            this.classList.add('selected');
            advanceButton.disabled = false; // Habilita o botão avançar
        });
    });
});
// Remove a seleção de todas as opções e desabilita o botão avançar



// Se qualquer outra opção foi clicada, desmarcar a primeira opção

document.addEventListener('DOMContentLoaded', function() {
    const options = document.querySelectorAll('.quiz-option2 a');

    options.forEach(option => {
        option.addEventListener('click', function() {
            const isFirstOption = this === options[0]; // Verifica se é a primeira opção ("Não")

            if (isFirstOption) {
                // Se a primeira opção foi clicada, desmarcar todas as outras opções
                options.forEach((otherOption, index) => {
                    if (index !== 0) { // Ignora a primeira opção
                        otherOption.classList.remove('selected');
                        otherOption.querySelector('.selection-circle').style.backgroundColor = 'transparent';
                        otherOption.querySelector('.selection-circle').innerHTML = '';
                    }
                });
            } else {
                // Se qualquer outra opção foi clicada, desmarcar a primeira opção
                options[0].classList.remove('selected');
                options[0].querySelector('.selection-circle').style.backgroundColor = 'transparent';
                options[0].querySelector('.selection-circle').innerHTML = '';
            }

            // Toggle a classe 'selected' para esta opção sem afetar outras
            this.classList.toggle('selected');

            // Atualiza o círculo de seleção com base no estado 'selected'
            const selectionCircle = this.querySelector('.selection-circle');
            if (this.classList.contains('selected')) {
                selectionCircle.style.backgroundColor = '#98A4FF'; // Cor quando selecionado
                selectionCircle.innerHTML = '&#10003;'; // Adiciona o ícone de check
            } else {
                selectionCircle.style.backgroundColor = 'transparent'; // Cor quando não selecionado
                selectionCircle.innerHTML = ''; // Remove o ícone de check
            }
        });
    });
});

// Se qualquer outra opção foi clicada, desmarcar a primeira opção