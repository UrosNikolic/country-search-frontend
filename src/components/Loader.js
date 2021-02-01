import React from 'react'

export default function Loader() {
  return (
    <div className='d-flex justify-content-center mt-4'>
      <div className='spinner-border' role='status'>
        <span className='sr-only'>Loading...</span>
      </div>
    </div>
  )
}
