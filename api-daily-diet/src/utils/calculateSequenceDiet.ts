type Meals = {
  id: string;
  user_id: string;
  name: string;
  description: string;
  inside_diet: boolean;
  date: number;
  created_at: string;
  updated_at: string;
};

export function calculateBestSequence(meals: Meals[]) {
  let bestSequence = 0;
  let currentSequence = 0;

  meals.reduce((lastDate: Date | null, meal: Meals) => {
    if (!meal.inside_diet) {
      currentSequence = 0;
      return null;
    }

    const currentDate = new Date(meal.date);

    if (!lastDate) {
      currentSequence = 1;
    } else {
      const diffTime = currentDate.getTime() - lastDate.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      currentSequence = diffDays === 1 ? currentSequence + 1 : 1;
    }

    bestSequence = Math.max(bestSequence, currentSequence);

    return currentDate;
  }, null);

  return bestSequence;
}

export function calculateCurrentSequence(meals: Meals[]) {
  let currentSequence = 0;

  meals.reduceRight((lastDate: Date | null, meal: Meals) => {
    if (!meal.inside_diet) {
      return lastDate;
    }

    const currentDate = new Date(meal.date);

    if (!lastDate) {
      currentSequence = 1;
    } else {
      const diffTime = currentDate.getTime() - lastDate.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      currentSequence = diffDays === 1 ? currentSequence + 1 : 1;
    }

    return currentDate;
  }, null);

  return currentSequence;
}
