const reduce = (array: Array<number>) =>
  array.length > 0 ? array.reduce((a, b) => a + b) / array.length : NaN;

interface obj {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export const exerCalc = (goal: number, arr: Array<number>): obj => {
  console.log('goal:', goal, 'arr:', arr);
  const average = reduce(arr);
  const trainDays = arr.filter((day) => day !== 0);
  const success = average >= goal ? true : false;

  const rate = () => {
    const divide = goal / average;
    if (divide > 2) {
      return 1;
    } else if (divide > 1 && divide < 2) {
      return 2;
    } else if (divide <= 1) {
      return 3;
    } else {
      throw new Error('invalid');
    }
  };

  const rating = rate();

  const desc = () => {
    switch (rating) {
      case 1:
        return 'You Failed';
      case 2:
        return 'So Close';
      case 3:
        return 'Good Job';
      default:
        throw new Error('invalid');
    }
  };

  return {
    periodLength: arr.length,
    trainingDays: trainDays.length,
    success: success,
    rating: rating,
    ratingDescription: desc(),
    target: goal,
    average: average,
  };
};

// const convert = (arr: Array<string>): Array<number> => {
//   console.log('args:', arr);
//   const numbers: Array<number> = [];
//   const sliced = arr.splice(2);
//   console.log('spliced:', sliced);
//   sliced.forEach((n) => {
//     numbers.push(Number(n));
//   });
//   console.log('numbers', numbers);

//   return numbers;
// };

// const a: number = Number(process.argv[2]);
// const b: Array<number> = convert(process.argv);

// console.log(exerCalc(a, b));
