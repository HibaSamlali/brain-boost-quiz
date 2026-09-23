# Brain Boost Quiz

An interactive quiz for primary school students, built with HTML, CSS and vanilla JavaScript. No frameworks, no build step.

**[Try the live demo](https://hibasamlali.github.io/brain-boost-quiz/)**

## Why this project

I wanted to build a simple, friendly learning tool that gives instant feedback and explains the right answer, so users learn even when they make a mistake. It is also a hands-on way to practice clean JavaScript, responsive design and accessibility.

## Features

- Start screen, quiz screen and results screen
- Progress bar and live score
- Instant feedback with a short explanation after each answer
- Questions shuffled on every new game
- Replay button and "Back to start" option
- Best score saved in the browser with `localStorage`
- Keyboard support: press **A, B, C or D** to answer
- Responsive layout that works on phones, tablets and desktops
- Accessible: visible keyboard focus, screen reader announcements, reduced-motion support

## Tech stack

| Area | Technology |
| --- | --- |
| Structure | HTML5 |
| Design | CSS3 (custom properties, Flexbox, Grid) |
| Logic | JavaScript (ES6+) |
| Hosting | GitHub Pages |

## Run locally

```bash
git clone https://github.com/HibaSamlali/brain-boost-quiz.git
cd brain-boost-quiz
```

Then open `index.html` in your browser. No installation needed.

## Add your own questions

Questions live in the `QUESTIONS` array in `script.js`. Copy an object and edit it:

```javascript
{
  question: "What is 2 + 2?",
  answers: ["3", "4", "5", "6"],
  correct: 1, // index of the right answer (0 = first)
  explanation: "2 + 2 = 4."
}
```

## Project structure

```
brain-boost-quiz/
├── index.html   # page structure
├── style.css    # design and layout
└── script.js    # quiz logic and state
```

## Roadmap

This is the first step toward a full stack educational platform:

- [ ] Teacher space: log in, create quizzes and add questions
- [ ] Student space: take quizzes and see progress history
- [ ] Back-end API and database
- [ ] Statistics per class

## Author

**Hiba Samlali**, Full Stack Web Developer.

[GitHub](https://github.com/HibaSamlali)
