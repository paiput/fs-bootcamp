import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Blog from './Blog';

const blog = {
  title: 'Some random title',
  author: 'John Doe',
  likes: 25,
  user: {
    username: 'someuser'
  }
};

test('component displaying a blog only renders blog\'s title by default', () => {
  render(<Blog blog={blog} loggedUser={{ username: 'someuser' }} />);

  const blogInfo = screen.getByTestId('blog-info');
  expect(blogInfo).not.toBeVisible();

  const blogTitle = screen.getByText('Some random title');
  expect(blogTitle).toBeDefined();
});

test('the rest of blog info is shown when the button controlling the shown details has been clicked', () => {
  render(<Blog blog={blog} loggedUser={{ username: 'someuser' }} />);

  const button = screen.getByText('view');
  userEvent.click(button);

  const blogInfo = screen.getByTestId('blog-info');
  expect(blogInfo).toBeVisible();
});

test('if like button is clicked twice, the event handler is called twice', () => {
  render(<Blog blog={blog} loggedUser={{ username: 'someuser' }} />);

  const viewButton = screen.getByText('view');
  userEvent.click(viewButton);

  const likeButton = screen.getByText('like');
  userEvent.click(likeButton);
  userEvent.click(likeButton);

  expect(blog.likes).toBe(27);
});