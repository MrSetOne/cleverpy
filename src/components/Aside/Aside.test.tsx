import React from 'react'
import { fireEvent, screen, prettyDOM, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Aside from './Aside'
import { renderWithProviders } from '../../app/test-utils'
import { BrowserRouter } from 'react-router-dom'

describe('<Aside/>', () => {
  /* 
    const mockedNavigate = jest.fn()

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigate,
}))
*/

  const doARender = (logged: boolean = false) => {
    return renderWithProviders(
      <BrowserRouter>
        <Aside />
      </BrowserRouter>,
      {
        preloadedState: logged
          ? {
              user: { user: { username: 'MrSetOne', gender: 'male', id: 1 } },
              posts: undefined,
            }
          : undefined,
      },
    )
  }

  test('Renders Aside (unlogged)', () => {
    const component = doARender()
    const aside = component.getByTestId('logPage')
    expect(aside)
  })

  test('Renders Aside (logged)', () => {
    const component = doARender(true)
    const aside = component.getByTestId('asideUser')
    expect(aside)
  })

  test('Logpage appears', () => {
    const component = doARender()
    const logpage = component.getByTestId('logPage')
    expect(logpage)
  })

  test(`Login's submit dont work without loguin info`, () => {
    const component = doARender()
    const form = {
      username: component.getByPlaceholderText('Tu usuario'),
      password: component.getByPlaceholderText('Tu contraseña'),
      submit: component.getByText('Login'),
    }
    expect(form.submit).toBeDisabled()
    fireEvent.input(form.username, { target: { value: 'MrSetOne' } })
    expect(form.submit).toBeDisabled()
    fireEvent.input(form.password, { target: { value: 'JestRulez' } })
    expect(form.submit).toBeEnabled()
  })

  test(`Do a login`, () => {
    const component = doARender()
    const form = {
      username: component.getByPlaceholderText('Tu usuario'),
      password: component.getByPlaceholderText('Tu contraseña'),
      submit: component.getByText('Login'),
    }
    fireEvent.input(form.username, { target: { value: 'MrSetOne' } })
    fireEvent.input(form.password, { target: { value: 'JestRulez' } })
    fireEvent.click(form.submit)
    const userPage = component.getByTestId('asideUser')
    expect(userPage)
  })

  test('Do a unlog', () => {
    const component = doARender(true)
    const logOutBtn = component.getByTestId('aside-logout')
    fireEvent.click(logOutBtn)
    expect(component.getByTestId('logPage'))
  })

  test(`Burger menu don't appear in big screens`, () => {
    global.innerWidth = 1080
    const component = doARender()
    expect(component.queryByTestId('BurgerIcon')).toBeNull()
  })

  test('Burger menu appear in small screens', () => {
    global.innerWidth = 500
    const component = doARender()
    expect(component.getByTestId('BurgerIcon'))
  })

  test('Burger menu open/close', async () => {
    global.innerWidth = 500
    const component = doARender()
    const aside = component.getByTestId('asideMenu')
    expect(aside).toHaveStyle('left: -100vw')
    const burgerIcon = component.getByTestId('BurgerIcon')
    fireEvent.click(burgerIcon)
    await waitFor(() => expect(aside).toHaveStyle('left: -10vw'))
    fireEvent.click(burgerIcon)
    await waitFor(() => expect(aside).toHaveStyle('left: -100vw'))
  })
})
