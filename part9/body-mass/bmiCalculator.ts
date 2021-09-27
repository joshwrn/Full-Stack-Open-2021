interface bmiResult {
  weight: number;
  height: number;
  bmi: string;
}

export const bmiCalc = (a: number, b: number): bmiResult => {
  const square = Math.pow(b, 2);
  const divide = a / square;
  const multiply = divide * 10000;
  const result = Number(multiply.toFixed(1));
  if (result < 18.5) {
    return { weight: a, height: b, bmi: `Underweight ${result}` };
  } else if (result > 18.5 && 24.9 > result) {
    return { weight: a, height: b, bmi: `Normal ${result}` };
  } else if (result > 25 && result < 29.9) {
    return { weight: a, height: b, bmi: `Overweight ${result}` };
  } else {
    return { weight: a, height: b, bmi: `Obesity ${result}` };
  }
};

const weight: number = Number(process.argv[2]);
const height: number = Number(process.argv[3]);

console.log(process.argv);

console.log(bmiCalc(weight, height));
