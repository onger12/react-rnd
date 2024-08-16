import React from 'react'
import { PaperAreaWork } from './paper-area-work'
import { PaperNavBar } from './paper-nav-bar'

export const PaperAreaMain = () => {
  return (
    <div className='flex flex-column flex-grow-1'>
      <PaperNavBar />
      <PaperAreaWork />
    </div>
  )
}
