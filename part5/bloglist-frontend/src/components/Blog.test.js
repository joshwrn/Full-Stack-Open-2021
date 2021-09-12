import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import { prettyDOM } from '@testing-library/dom';
import Blog from './Blog';

test('renders content', () => {
  const blog = {
    title: 'jest',
    author: 'josh',
    url: 'url',
    likes: 2,
  };

  const component = render(<Blog blog={blog} />);
  const li = component.container.querySelector('.url');

  component.debug();
  console.log(prettyDOM(li));

  expect(component.container).toHaveTextContent('jest');
});

test('clicking the button calls event handler once', () => {
  const blog = {
    title: 'jest',
    author: 'josh',
    url: 'url',
    likes: 2,
  };
  const mockHandler = jest.fn();

  const component = render(<Blog blog={blog} toggleImportance={mockHandler} />);

  const button = component.getByText('Like');
  fireEvent.click(button);

  expect(mockHandler.mock.calls).toHaveLength(1);
});
