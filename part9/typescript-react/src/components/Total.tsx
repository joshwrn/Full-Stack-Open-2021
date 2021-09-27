import React from 'react';

interface CourseProps {
  name: string;
  exerciseCount: number;
}

interface CourseArr {
  courseParts: CourseProps[];
}

const Total = ({ courseParts }: CourseArr) => {
  return (
    <p>
      Number of exercises{' '}
      {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
    </p>
  );
};

export default Total;
