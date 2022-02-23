import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Blog from './Blog';

test('component displaying a blog only renders blog\'s title by default', () => {
  const blog = {
    title: 'Some random title',
    author: 'John Doe',
    likes: 25,
    user: 'someuser'
  };

  render(<Blog blog={blog} loggedUser={{ username: 'someuser' }} />);

  const blogInfo = screen.getByTestId('blog-info');
  expect(blogInfo).not.toBeVisible();

  const blogTitle = screen.getByText('Some random title');
  expect(blogTitle).toBeDefined();

  screen.debug();
});