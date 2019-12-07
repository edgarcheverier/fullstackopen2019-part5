import React from 'react';
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react';
import SimpleBlog from './SimpleBlog';

const blog = {
  title: 'blog title',
  author: 'Edgar',
  likes: 5
}

describe('SimpleBlog', () => {
  let component;
  const onClick = jest.fn();
  beforeEach(() => {
    component = render(
      <SimpleBlog blog={blog} onClick={onClick} />
    )
  })
  test('render title', () => {
    const div = component.container.querySelector('.title-author-container');
    expect(div).toHaveTextContent(blog.title)
  });
  test('render author', () => {
    const div = component.container.querySelector('.title-author-container');
    expect(div).toHaveTextContent(blog.author)
  });

  test('render likes', () => {
    const div = component.container.querySelector('.likes-container')
    expect(div).toHaveTextContent(`${blog.likes}`)
  });

  test('call event handler for the like button', () => {
    const button = component.container.querySelector('.like-button');
    fireEvent.click(button);
    fireEvent.click(button);
    expect(onClick.mock.calls.length).toBe(2)
  });
});
