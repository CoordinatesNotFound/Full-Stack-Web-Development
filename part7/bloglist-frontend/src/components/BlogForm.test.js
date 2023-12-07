import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('<BlogForm /> updates parent state and calls onSubmit', async () => {
    const createBlog = jest.fn()
    const user = userEvent.setup()
  
    render(<BlogForm createBlog={createBlog} />)
  
    const inputs = screen.getAllByRole('textbox')

    const sendButton = screen.getByText('create')
  
    await user.type(inputs[0], 'test-input-title')
    await user.type(inputs[1], 'test-input-author')
    await user.type(inputs[2], 'test-input-url')
    await user.click(sendButton)
  
    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe('test-input-title')
    expect(createBlog.mock.calls[0][0].author).toBe('test-input-author')
    expect(createBlog.mock.calls[0][0].url).toBe('test-input-url')
  })