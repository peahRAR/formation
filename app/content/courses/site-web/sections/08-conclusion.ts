import type { Section } from '../../../../types/course'

export const sectionConclusion: Section = {
  id: 'conclusion',
  title: 'Conclusion',
  accent: 'rose',
  icon: 'Flag',
  slides: [
    {
      id: 'recapitulatif',
      kind: 'demo',
      express: true,
      demo: 'recap',
      eyebrow: 'Section 8 · Conclusion',
      title: 'Le chemin parcouru',
      subtitle: 'Cliquez sur chaque étape pour revoir la fiche à ce moment-là.',
      notes: `Insister : c'est une progression pédagogique, pas un ordre obligatoire. Dans un vrai projet, on écrit le HTML, le CSS et le JavaScript en même temps, et on peut commencer directement avec un framework.

Revoir la fiche à chaque étape pour mesurer le chemin parcouru.`,
    },
    {
      id: 'quiz',
      kind: 'quiz',
      express: true,
      eyebrow: 'Section 8 · Quiz',
      title: 'Avez-vous bien suivi ?',
      subtitle: 'Six questions rapides, avec la correction à chaque fois.',
      notes: `En classe, lire la question à voix haute et faire voter à main levée avant de cliquer.

Chaque correction rappelle la diapositive concernée.`,
      questions: [
        {
          id: 'q-html',
          question: 'À quoi sert HTML ?',
          choices: [
            { text: 'À choisir les couleurs et les polices de la page' },
            { text: 'À structurer le contenu et lui donner du sens', correct: true },
            { text: 'À stocker les données sur un serveur' },
          ],
          explanation: 'HTML décrit la structure : ceci est un titre, ceci est un paragraphe, ceci est un bouton. Les couleurs, c’est le rôle du CSS.',
        },
        {
          id: 'q-css',
          question: 'Quelle technologie gère l’apparence ?',
          choices: [
            { text: 'HTML' },
            { text: 'JSON' },
            { text: 'CSS', correct: true },
          ],
          explanation: 'CSS applique des styles (couleurs, tailles, espacements, mise en page) au HTML, sans le modifier.',
        },
        {
          id: 'q-dom',
          question: 'Qu’est-ce que le DOM ?',
          choices: [
            { text: 'La représentation de la page sous forme d’arbre, construite par le navigateur', correct: true },
            { text: 'Un langage de programmation' },
            { text: 'Le serveur qui héberge le site' },
          ],
          explanation: 'En lisant le HTML, le navigateur construit le DOM : un arbre d’éléments qu’il affiche et que JavaScript peut modifier.',
        },
        {
          id: 'q-js',
          question: 'Pourquoi utilise-t-on JavaScript ?',
          choices: [
            { text: 'Pour écrire le texte des paragraphes' },
            { text: 'Pour réagir aux actions de l’utilisateur et modifier la page', correct: true },
            { text: 'Pour remplacer le navigateur' },
          ],
          explanation: 'JavaScript ajoute des comportements : il écoute des événements (un clic…) et modifie le DOM, donc la page affichée.',
        },
        {
          id: 'q-api',
          question: 'À quoi sert une API ?',
          choices: [
            { text: 'À rendre le site plus joli' },
            { text: 'À créer des balises HTML' },
            { text: 'À permettre à notre application de demander des données à un autre service', correct: true },
          ],
          explanation: 'Notre fiche demande une photo à l’API Dog CEO, qui répond avec des données JSON contenant l’adresse de l’image.',
        },
        {
          id: 'q-framework',
          question: 'Est-il obligatoire d’utiliser un framework ?',
          choices: [
            { text: 'Oui, un site ne peut pas fonctionner sans' },
            { text: 'Non : HTML, CSS et JavaScript suffisent ; un framework aide quand l’interface grandit', correct: true },
            { text: 'Oui, mais seulement pour le CSS' },
          ],
          explanation: 'Les frameworks (Bootstrap, Tailwind, Vue, React…) facilitent le travail, mais reposent tous sur HTML, CSS et JavaScript.',
        },
      ],
    },
    {
      id: 'fin',
      kind: 'title',
      express: true,
      eyebrow: 'Félicitations',
      title: 'Vous savez comment fonctionne un site web !',
      subtitle: 'Prochaines étapes : des cours dédiés au HTML, au CSS, à JavaScript et à Vue.js.',
      icon: 'PartyPopper',
      notes: `Remercier le groupe et ouvrir aux questions.

Rappeler que la plateforme reste accessible librement pour revoir le cours seul, à son rythme.`,
    },
  ],
}
