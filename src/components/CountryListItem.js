import React from 'react'

export default function CountryListItem({ name, flag, isAdded = false, onClick }) {
  return (
    <li className='list-group-item w-100 d-flex justify-content-between align-items-center'>
      <div className='d-flex align-items-center'>
        <img src={flag} alt='flag'/>
        <span className='ml-2'>{name}</span>
      </div>
      <button
        type='button'
        role='button'
        className='border'
        onClick={onClick}
      >
        { isAdded ? '-' : '+' }
      </button>
    </li>
  )
}
