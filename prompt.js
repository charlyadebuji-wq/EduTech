// Prompts pour générer du contenu adapté
const prompts = {
    // Résumé adapté
    summary: (text, profile) => {
        const profileRules = profile === 'jaden'
            ? "Phrases de 5 à 10 mots max, paragraphes de 3 lignes max, icônes (📖, ❓), couleurs (bleu/vert)."
            : "Phrases courtes, étapes numérotées, pas de blabla.";
        return `
            Résume le texte suivant pour un enfant ${profile === 'jaden' ? 'de 9 ans avec TDAH' : 'de 17 ans avec TDA'}, en respectant ces règles :
            - ${profileRules}
            - Utilise des titres clairs et des listes à puces.
            - Ajoute des emojis pour illustrer les idées principales.
            Texte : ${text}
        `;
    },

    // Flashcards
    flashcards: (text, profile) => {
        return `
            Génère 5 flashcards à partir du texte suivant pour un ${profile === 'jaden' ? 'enfant de 9 ans avec TDAH' : 'ado de 17 ans avec TDA'} :
            - 1 idée par carte (question + réponse).
            - Réponses en 1 phrase max.
            - Ajoute des emojis pour illustrer.
            - Prépare un calendrier de répétition espacée (J+1, J+3, J+7).
            Texte : ${text}
        `;
    },

    // QCM
    quiz: (text, profile) => {
        return `
            Génère un QCM de 3 questions à partir du texte suivant pour un ${profile === 'jaden' ? 'enfant de 9 ans avec TDAH' : 'ado de 17 ans avec TDA'} :
            - 3 questions max.
            - 2 à 4 options par question.
            - Feedback correctif avec indice (ex: "Faux. La bonne réponse est X car...").
            Texte : ${text}
        `;
    }
};

// Exemple d'appel à l'API Mistral (à intégrer dans script.js)
async function callMistralAPI(prompt) {
    // Remplacer par un vrai appel à l'API Mistral
    // Exemple avec fetch (à adapter selon votre implémentation)
    const response = await fetch('https://api.mistral.ai/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer VOTRE_CLE_API'
        },
        body: JSON.stringify({
            model: 'mistral-medium',
            messages: [{ role: 'user', content: prompt }]
        })
    });

    const data = await response.json();
    return data.choices[0].message.content;
}
