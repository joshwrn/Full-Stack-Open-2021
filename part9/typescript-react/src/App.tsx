import React from 'react';
import Header from './components/Header';
import Content from './components/Content';
import Total from './components/Total';

const App = () => {
  const courseName = 'Half Stack application development';

  // new types
  interface CoursePartBase {
    name: string;
    exerciseCount: number;
    type: string;
  }

  interface CourseDesc extends CoursePartBase {
    description?: string;
  }

  interface CourseNormalPart extends CourseDesc {
    type: 'normal';
  }

  interface CourseProjectPart extends CoursePartBase {
    type: 'groupProject';
    groupProjectCount: number;
  }

  interface CourseSubmissionPart extends CourseDesc {
    type: 'submission';
    exerciseSubmissionLink: string;
  }

  type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart;

  const courseParts: CoursePart[] = [
    {
      name: 'Fundamentals',
      exerciseCount: 10,
      description: 'This is the leisured course part',
      type: 'normal',
    },
    {
      name: 'Advanced',
      exerciseCount: 7,
      description: 'This is the harded course part',
      type: 'normal',
    },
    {
      name: 'Using props to pass data',
      exerciseCount: 7,
      groupProjectCount: 3,
      type: 'groupProject',
    },
    {
      name: 'Deeper type usage',
      exerciseCount: 14,
      description: 'Confusing description',
      exerciseSubmissionLink: 'https://fake-exercise-submit.made-up-url.dev',
      type: 'submission',
    },
  ];

  return (
    <div>
      <Header name={courseName}></Header>
      <Content courseParts={courseParts}></Content>
      <Total courseParts={courseParts}></Total>
    </div>
  );
};

export default App;
