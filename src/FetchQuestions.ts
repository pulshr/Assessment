type Question = {
    category: string;
    correct_answer: string;
    difficulty: string;
    incorrect_answers: string[];
    question: string;
    type: string;
  };
  
  export type QuestionsState = Question
  
  export const fetchQuizQuestions = async (amount: number): Promise<QuestionsState[]> => {
    const endpoint = `https://opentdb.com/api.php?amount=${amount}&type=boolean`;
    const data = await (await fetch(endpoint)).json();
    return data.results.map((question: Question) => ({...question}))
  };