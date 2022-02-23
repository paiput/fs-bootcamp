import React from 'react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { screen, render } from '@testing-library/react';
import BlogForm from './BlogForm';

test('<BlogForm /> calls event handler it receives as props with the right details when creating a new blog', () => {
  const createBlog = jest.fn();

  render(<BlogForm createBlog={createBlog} />);

  // won't use urlInput
  const [titleInput, authorInput] = screen.getAllByRole('textbox');
  const submitButton = screen.getByText('create');

  userEvent.type(titleInput, 'random testing title');
  userEvent.type(authorInput, 'Random User');
  userEvent.click(submitButton);

  expect(createBlog).toHaveBeenCalled();
  expect(createBlog.mock.calls[0][0].title).toBe('random testing title');
  expect(createBlog.mock.calls[0][0].author).toBe('Random User');
});