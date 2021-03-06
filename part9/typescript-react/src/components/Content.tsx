import React from 'react';

interface CourseProps {
  name: string;
  exerciseCount: number;
}

interface CourseArr {
  courseParts: CourseProps[];
}

const Content = ({ courseParts }: CourseArr) => {
  return (
    <>
      <p>
        {courseParts[0].name} {courseParts[0].exerciseCount}
      </p>
      <p>
        {courseParts[1].name} {courseParts[1].exerciseCount}
      </p>
      <p>
        {courseParts[2].name} {courseParts[2].exerciseCount}
      </p>
    </>
  );
};

export default Content;
