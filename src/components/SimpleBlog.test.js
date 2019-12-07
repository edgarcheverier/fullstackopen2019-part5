import React from 'react';
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react';
import SimpleBlog from './SimpleBlog';

const blog = {
  title: 'blog title',
  author: 'Edgar',
  likes: 5
}

describe('SimpleBlog', () => {
  let component;
  beforeEach(() => {
    component = render(
      <SimpleBlog blog={blog} />
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
});
