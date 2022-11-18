import React from 'react'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Post from './Post'
import { prettyDOM } from '@testing-library/react'
import { renderWithProviders } from '../../../app/test-utils'
import { post } from '../../../types'
import { act } from 'react-dom/test-utils'

interface stateExample {
  user: {
    user: {
      id: number
      username: string
      gender: 'male' | 'female' | null
    }
  }
}

const mockedNavigate = jest.fn()

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigate,
}))

const postExample: post = {
  username: 'paco',
  id: 1,
  userId: 1,
  gender: 'male',
  title: 'The title',
  body: 'The body',
}

const stateExample: stateExample = {
  user: { user: { username: 'paco', gender: 'female', id: 55 } },
}

describe('<Post/>', () => {
  let component: any

  const doARender = (author: boolean = false) => {
    component = null
    component = renderWithProviders(
      <Post i={1} post={{ ...postExample, userId: author ? 55 : 1 }} />,
      {
        preloadedState: stateExample,
      },
    )
  }

  test('Renders post', () => {
    doARender()
    const post = component.container.querySelector('.post')
    expect(post).toHaveClass('post')
  })

  test('Post contains correct title & body', () => {
    doARender()
    const title = component.container.querySelector('.post .post_content h3')
    expect(title).toHaveTextContent('The title')
    const body = component.container.querySelector('.post .post_content p')
    expect(body).toHaveTextContent('The body')
  })

  test('Navigate in header', () => {
    doARender()
    const link = component.container.querySelector('.post__header--link')
    if (link !== null) {
      fireEvent.click(link)
    }
    expect(mockedNavigate.mock.calls).toHaveLength(1)
  })

  test(`Open & close menu works(Alien)`, async () => {
    doARender()
    const menu = component.container.querySelector('.PostMenu')
    const switchBtn = component.getByTestId('PostMenu--switch')
    expect(menu).toHaveStyle('width: 40px;')
    fireEvent.click(switchBtn)
    await waitFor(() => expect(menu).toHaveStyle('width: 77px'))
  })

  test('Edit button does not exist in alien post', () => {
    doARender()
    const editBtn = screen.queryByTestId('PostMenu--edit')
    expect(editBtn).toBeNull()
  })

  test('Open & close menu works(Author)', async () => {
    doARender(true)
    const menu = component.container.querySelector('.PostMenu')
    const switchBtn = component.getByTestId('PostMenu--switch')
    expect(menu).toHaveStyle('width: 40px;')
    fireEvent.click(switchBtn)
    await waitFor(() => expect(menu).toHaveStyle('width: 112px'))
  })




  // TODO
  // ! MENU
  // Edit button exist in your post
  // ! POST TOOLS
  // Mock delete post
  // Mock edit post
})
