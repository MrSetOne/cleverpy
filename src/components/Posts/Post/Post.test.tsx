import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Post from './Post'
import { prettyDOM } from '@testing-library/react'
import { Provider } from 'react-redux'
import { store } from '../../../app/store'
import { BrowserRouter } from 'react-router-dom'

const mockedNavigate = jest.fn()

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigate,
}))

describe('<Post/>', () => {
  let component: any

  beforeEach(() => {
    component = render(
      <Provider store={store}>
        <BrowserRouter>
          <Post
            i={1}
            post={{
              username: 'paco',
              id: 1,
              userId: 1,
              gender: 'male',
              title: 'The title',
              body: 'The body',
            }}
          />
        </BrowserRouter>
      </Provider>,
    )
  })

  test('Renders post', () => {
    const post = component.container.querySelector('.post')
    expect(post).toHaveClass('post')
  })

  test('Post contains correct title & body', () => {
    const title = component.container.querySelector('.post .post_content h3')
    expect(title).toHaveTextContent('The title')
    const body = component.container.querySelector('.post .post_content p')
    expect(body).toHaveTextContent('The body')
  })

  test('Navigate in header', () => {
    const link = component.container.querySelector('.post__header--link')
    if (link !== null) {
      fireEvent.click(link)
    }
    expect(mockedNavigate.mock.calls).toHaveLength(1)
  })
})
