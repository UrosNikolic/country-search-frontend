import React from 'react'
import { useCountriesApiContext } from '../context/CountriesContext'

export default function Alert() {
  const {
    isAlertActive
  } = useCountriesApiContext()

  return (
    <>
      {
        isAlertActive && (
          <div className='w-100 alert alert-danger' role='alert'>
            We are having some issues, please try again later.
          </div>
        )
      }
    </>
  )
}
