
// AI GENERATED
export const TYPING_SENTENCES = [
  "The quick brown fox jumps over the lazy dog.",
  "Programming is the process of creating a set of instructions that tell a computer how to perform a task.",
  "Next.js gives you the best developer experience with all the features you need for production.",
  "Move fast and break things. Unless it is the production database, then please be careful!",
  "In 2026, building web applications has become faster than ever. Are you ready to type 100 words per minute?",
  "A successful typing game requires low latency, accurate keystroke tracking, and a beautiful user interface.",
  "It is not a bug; it is an undocumented feature.",
  "TypeScript adds optional static typing to JavaScript, which can help you catch errors early in your editor.",
  "To be or not to be, that is the question that every software engineer asks before a major refactor.",
  "Focus on the core mechanics first. The fancy animations and multiplayer features can wait until the MVP is done."
];


export const getRandomSentence = () => {
  const randomIndex = Math.floor(Math.random() * TYPING_SENTENCES.length);
  return TYPING_SENTENCES[randomIndex];
};