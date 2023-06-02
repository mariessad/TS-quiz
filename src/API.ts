import { shuffleArray } from "./utils";

// specify the type for each question - based on returned data from API
export type Question = {
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: string[];
  question: string;
  type: string;
};

// going to map through all the answers to show in the UI,
// so creating a new property called answers that will be an array of strings
// this will use the types from the question, add this answers property to it and create this QuestionState type instead
export type QuestionState = Question & { answers: string[] };

export enum Difficulty {
  EASY = "easy",
  MEDIUM = "medium",
  HARD = "hard",
}

export const fetchQuizQuestions = async (
  amount: number,
  difficulty: Difficulty
) => {
  const endpoint = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`;
  // two awaits - one for the fetch, then for convert to JSON
  const data = await (await fetch(endpoint)).json();
  //   map
  return data.results.map((question: Question) => ({
    ...question,
    // providing the shuffleArray function and passing it both the incorrect answers and the correct answer to shuffle them randomly
    answers: shuffleArray([
      ...question.incorrect_answers,
      question.correct_answer,
    ]),
  }));
};
