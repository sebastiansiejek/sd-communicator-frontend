import { render } from '@testing-library/react'
import React from 'react'
import JoinToRoom, { JoinToRoomProps } from './JoinToRoom'

describe('JoinToRoom', () => {
  const defaultProps: JoinToRoomProps = {}

  it('should render', () => {
    const props = { ...defaultProps }
    const { asFragment, queryByText } = render(<JoinToRoom {...props} />)

    expect(asFragment()).toMatchSnapshot()
    expect(queryByText('JoinToRoom')).toBeTruthy()
  })
})
