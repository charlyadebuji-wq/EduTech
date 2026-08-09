/ Attendre que le DOM soit chargé
document.addEventListener('DOMContentLoaded', function() {
    // Récupérer les éléments du DOM
    const courseText = document.getElementById('course-text');
    const profileSelect = document.getElementById('profile');
    const generateSummaryBtn = document.getElementById('generate-summary');
    const readAloudBtn = document.getElementById('read-aloud');
    const generateFlashcardsBtn = document.getElementById('generate-flashcards');
    const generateQuizBtn = document.getElementById('generate-quiz');
    const startChecklistBtn = document.getElementById('start-checklist');

    const summaryOutput = document.getElementById('summary-output');
    const audioOutput = document.getElementById('audio-output');
    const flashcardsOutput = document.getElementById('flashcards-output');
    const quizOutput = document.getElementById('quiz-output');
    const checklistOutput = document.getElementById('checklist-output');

    // Variables globales
    let currentUtterance = null;
    let currentHighlightIndex = 0;
    let sentences = [];

    // Écouteurs d'événements pour les boutons
    generateSummaryBtn.addEventListener('click', generateSummary);
    readAloudBtn.addEventListener('click', readAloud);
    generateFlashcardsBtn.addEventListener('click', generateFlashcards);
    generateQuizBtn.addEventListener('click', generateQuiz);
    startChecklistBtn.addEventListener('click', startChecklist);

    // Fonction pour générer un résumé (à remplacer par un appel à l'API Mistral plus tard)
    function generateSummary() {
        const text = courseText.value.trim();
        if (!text) {
            alert("Veuillez coller un texte de cours.");
            return;
        }

        const profile = profileSelect.value;
        // Logique temporaire : afficher le texte tel quel (à remplacer par un vrai résumé généré par IA)
        summaryOutput.innerHTML = `
            <h3>Résumé adapté (${profile === 'jaden' ? 'Jaden' : 'Jibs'})</h3>
            <p><strong>📖 Étape 1 :</strong> ${text.substring(0, 100)}...</p>
            <p><em>Note : Ce résumé sera généré par IA dans la version finale.</em></p>
        `;
    }

    // Fonction pour lire à voix haute avec surlignage
    function readAloud() {
        const text = courseText.value.trim();
        if (!text) {
            alert("Veuillez coller un texte de cours.");
            return;
        }

        // Diviser le texte en phrases (simplifié)
        sentences = text.split(/(?<=[.!?])\s+/).filter(s => s.trim().length > 0);

        // Arrêter toute lecture en cours
        if (currentUtterance) {
            window.speechSynthesis.cancel();
        }

        // Afficher le texte avec surlignage
        audioOutput.innerHTML = `
            <h3>Lecture audio</h3>
            <div id="audio-text">${sentences.map(s => `<span class="sentence">${s}</span>`).join(' ')}</div>
            <div>
                <label for="speed">Vitesse :</label>
                <input type="range" id="speed" min="0.5" max="2" step="0.1" value="1">
                <span id="speed-value">1x</span>
            </div>
            <button id="stop-reading">Arrêter</button>
        `;

        // Gérer la vitesse
        const speedControl = document.getElementById('speed');
        const speedValue = document.getElementById('speed-value');
        speedControl.addEventListener('input', function() {
            speedValue.textContent = `${this.value}x`;
        });

        // Bouton Arrêter
        document.getElementById('stop-reading').addEventListener('click', function() {
            window.speechSynthesis.cancel();
        });

        // Lire chaque phrase avec surlignage
        currentHighlightIndex = 0;
        readSentence();
    }

    // Lire une phrase et surligner
    function readSentence() {
        if (currentHighlightIndex >= sentences.length) {
            return;
        }

        // Surligner la phrase actuelle
        const sentenceElements = document.querySelectorAll('#audio-text .sentence');
        sentenceElements.forEach(el => el.classList.remove('highlight'));
        if (sentenceElements[currentHighlightIndex]) {
            sentenceElements[currentHighlightIndex].classList.add('highlight');
            sentenceElements[currentHighlightIndex].scrollIntoView({ behavior: 'smooth', block: 'center' });
        }

        // Lire la phrase
        const utterance = new SpeechSynthesisUtterance(sentences[currentHighlightIndex]);
        utterance.rate = parseFloat(document.getElementById('speed').value);
        utterance.onend = function() {
            currentHighlightIndex++;
            readSentence();
        };

        currentUtterance = utterance;
        window.speechSynthesis.speak(utterance);
    }

    // Fonction pour générer des flashcards (à remplacer par un appel à l'API Mistral)
    function generateFlashcards() {
        const text = courseText.value.trim();
        if (!text) {
            alert("Veuillez coller un texte de cours.");
            return;
        }

        // Logique temporaire : afficher des flashcards statiques
        flashcardsOutput.innerHTML = `
            <h3>Flashcards</h3>
            <div class="flashcard">
                <div class="flashcard-question">Qu'est-ce qu'un volcan ? ❓</div>
                <div class="flashcard-answer">Un volcan est une montagne qui crache de la lave. 🌋</div>
                <button class="show-answer">Montrer la réponse</button>
            </div>
            <div class="flashcard">
                <div class="flashcard-question">Cite un exemple de volcan effusif. ❓</div>
                <div class="flashcard-answer">Hawaï (lave fluide).</div>
                <button class="show-answer">Montrer la réponse</button>
            </div>
            <p><em>Note : Les flashcards seront générées par IA dans la version finale.</em></p>
        `;

        // Ajouter des écouteurs pour les boutons "Montrer la réponse"
        document.querySelectorAll('.show-answer').forEach(button => {
            button.addEventListener('click', function() {
                const answer = this.previousElementSibling;
                answer.style.display = answer.style.display === 'none' ? 'block' : 'none';
                this.textContent = answer.style.display === 'none' ? 'Montrer la réponse' : 'Cacher la réponse';
            });
        });
    }

    // Fonction pour générer un QCM (à remplacer par un appel à l'API Mistral)
    function generateQuiz() {
        const text = courseText.value.trim();
        if (!text) {
            alert("Veuillez coller un texte de cours.");
            return;
        }

        // Logique temporaire : afficher un QCM statique
        quizOutput.innerHTML = `
            <h3>QCM</h3>
            <div class="quiz-question">
                <p>Quel type de volcan crache des cendres ?</p>
                <div class="quiz-options">
                    <label><input type="radio" name="q1" value="a"> A) Volcan effusif</label>
                    <label><input type="radio" name="q1" value="b"> B) Volcan explosif ⚠️</label>
                    <label><input type="radio" name="q1" value="c"> C) Montagne normale</label>
                </div>
                <button class="check-answer">Vérifier</button>
                <div class="quiz-feedback" style="display: none;"></div>
            </div>
            <p><em>Note : Le QCM sera généré par IA dans la version finale.</em></p>
        `;

        // Ajouter un écouteur pour le bouton "Vérifier"
        document.querySelector('.check-answer').addEventListener('click', function() {
            const selectedOption = document.querySelector('input[name="q1"]:checked');
            const feedback = document.querySelector('.quiz-feedback');

            if (selectedOption) {
                if (selectedOption.value === 'b') {
                    feedback.textContent = "✅ Bravo ! Les volcans explosifs projettent des cendres et des gaz.";
                    feedback.style.color = "#00AA44";
                } else {
                    feedback.textContent = "❌ Faux. La bonne réponse est B) Volcan explosif, car il projette des cendres et des gaz.";
                    feedback.style.color = "#CC0000";
                }
                feedback.style.display = 'block';
            } else {
                alert("Veuillez sélectionner une réponse.");
            }
        });
    }

    // Fonction pour démarrer une checklist
    function startChecklist() {
        const profile = profileSelect.value;
        const tasks = profile === 'jaden'
            ? ["Lire le résumé (10 min)", "Écouter l'audio (5 min)", "Faire les flashcards (10 min)"]
            : ["Lire le résumé (15 min)", "Faire les flashcards (10 min)", "Répondre au QCM (10 min)"];

        checklistOutput.innerHTML = `
            <h3>Checklist de révision</h3>
            <div class="timer">Temps restant : <span id="time-left">10:00</span></div>
            <ul id="task-list">
                ${tasks.map(task => `<li><input type="checkbox"> ${task}</li>`).join('')}
            </ul>
            <button id="start-timer">Démarrer le minuteur</button>
        `;

        // Logique du minuteur
        let timeLeft = 600; // 10 minutes en secondes
        let timerInterval = null;
        const timeLeftElement = document.getElementById('time-left');
        const startTimerBtn = document.getElementById('start-timer');

        startTimerBtn.addEventListener('click', function() {
            if (timerInterval) {
                clearInterval(timerInterval);
                timerInterval = null;
                startTimerBtn.textContent = 'Démarrer le minuteur';
                return;
            }

            startTimerBtn.textContent = 'Arrêter le minuteur';
            timerInterval = setInterval(function() {
                timeLeft--;
                const minutes = Math.floor(timeLeft / 60);
                const seconds = timeLeft % 60;
                timeLeftElement.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

                if (timeLeft <= 0) {
                    clearInterval(timerInterval);
                    timeLeftElement.textContent = "Temps écoulé !";
                    startTimerBtn.textContent = 'Démarrer le minuteur';
                    timeLeft = 600;
                }
            }, 1000);
        });
    }
});
