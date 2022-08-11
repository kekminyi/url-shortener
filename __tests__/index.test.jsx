import { render, screen } from '@testing-library/react'
import Home from '../pages/index'
import '@testing-library/jest-dom'

describe('Home', () => {
  it('renders a heading', () => {
    render(<Home />)

    const heading = screen.getByRole('heading', {
      name: "URL Shortener",
    })

    expect(heading).toBeInTheDocument()
  })
})

describe('Home', () => {
    it('renders the form', () => {
      render(<Home />)
  
      const formControl = screen.getByRole('group', {
        name: "",
      })
  
      expect(formControl).toBeInTheDocument()
    })
  })

describe('Home', () => {
    it('renders the textbox', () => {
        render(<Home />)

        const textbox = screen.getByRole('textbox', {
            name: "",
        })

        expect(textbox).toBeInTheDocument()
    })
})

describe('Home', () => {
    it('renders the button', () => {
        render(<Home />)

        const button = screen.getByRole('button', {
            name: "Shorten!",
        })

        expect(button).toBeInTheDocument()
    })
})