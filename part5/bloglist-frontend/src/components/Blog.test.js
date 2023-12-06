import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('renders blog title and author', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'test-author',
    url: 'test-url',
    likes: 0,
    user: {
        id: 'test-id',
        username: 'test-username',
        name: 'test-name'
    }
  }

  

  const { container } = render(<Blog blog={blog} />)

  const div = container.querySelector('.blog')
  expect(div).toHaveTextContent(
    'Component testing is done with react-testing-library'
  )
  expect(div).toHaveTextContent(
    'test-author'
  )
})

test('clicking the view button shows the details', async () => {
    const blog = {
        title: 'Component testing is done with react-testing-library',
        author: 'test-author',
        url: 'test-url',
        likes: 0,
        user: {
            id: 'test-id',
            username: 'test-username',
            name: 'test-name'
        }
      }
  
  
    const { container } = render(
      <Blog blog={blog}  />
    )
  
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const div = container.querySelector('.blog')
    expect(div).toHaveTextContent(
      'test-url'
    )
    expect(div).toHaveTextContent(
      '0'
    )
  
    //expect(mockHandler.mock.calls).toHaveLength(1)
  })

  test('clicking the like button twice calls the event handler twice', async () => {
    const blog = {
        title: 'Component testing is done with react-testing-library',
        author: 'test-author',
        url: 'test-url',
        likes: 0,
        user: {
            id: 'test-id',
            username: 'test-username',
            name: 'test-name'
        }
      }

    const mockHandler = jest.fn()

    render(
        <Blog blog={blog} onLike={mockHandler} />
    )

    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)
    const like = screen.getByText('like')
    await user.click(like)
    await user.click(like)

    expect(mockHandler.mock.calls).toHaveLength(2)
})