import express from 'express';
import { bmiCalc } from './bmiCalculator';
import { exerCalc } from './exerciseCalculator';
const app = express();

app.use(express.json());

app.get('/bmi/:height/:weight', (req, res) => {
  const { height, weight } = req.params;
  console.log(req.route);
  const bmi = bmiCalc(Number(height), Number(weight));
  console.log(bmi);
  res.send(bmi);
});

app.post('/ex', (request, response) => {
  const { daily, target } = request.body;
  try {
    const result = exerCalc(target, daily);
    console.log(result);
    response.json(result);
  } catch (e) {
    console.log('Something went wrong');
    response.send('Something went wrong');
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
