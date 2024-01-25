// Página de preguntas frecuentes

const questions = document.querySelectorAll('.question');

questions.forEach(question => {
    question.addEventListener('click', () => {
        const answer = question.nextElementSibling;
        const icon = question.querySelector('.toggle-icon');
        
        // Obtener todas las respuestas
        const allAnswers = document.querySelectorAll('.answer');

        // Cerrar todas las respuestas y restablecer los iconos
        allAnswers.forEach(a => {
            if (a !== answer && a.style.display === 'block') {
                a.style.display = 'none';
                const closeIcon = a.previousElementSibling.querySelector('.toggle-icon');
                closeIcon.classList.remove('fa-circle-minus');
                closeIcon.classList.add('fa-circle-plus');
            }
        });

        if (answer.style.display === 'block') {
            answer.style.display = 'none';
            icon.classList.remove('fa-circle-minus');
            icon.classList.add('fa-circle-plus');
        } else {
            answer.style.display = 'block';
            icon.classList.remove('fa-circle-plus');
            icon.classList.add('fa-circle-minus');
        }
    });
});