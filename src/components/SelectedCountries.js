import React, { useEffect } from 'react'
import CountryListItem from './CountryListItem'
import { useCountriesApiContext } from '../context/CountriesContext'
import Loader from './Loader'

export default function SelectedCountries() {
  const {
    selectedCountries,
    loadSavedCountriesList,
    removeCountry,
    isSelectedCountriesLoading
  } = useCountriesApiContext()

  useEffect(() => {
    loadSavedCountriesList()
  }, [])

  function getSelectedCountries() {
    return selectedCountries.map(({ name, flag }, key) => {
      return (
        <CountryListItem
          key={key}
          isAdded={true}
          name={name}
          flag={flag}
          onClick={() => removeCountry({ name, flag })}
        />
      )
    })
  }

  return (
    <div className='w-50 flex-grow-1 pl-2'>
      <h4>Selected Countries</h4>
      {
        !!selectedCountries.length &&
        (
          <ul className='list-group'>
            {getSelectedCountries()}
          </ul>
        )
      }
      {
        !isSelectedCountriesLoading &&
        !selectedCountries.length &&
        (
          <p className='lead'>
            There are no saved countries
          </p>
        )
      }
      {
        isSelectedCountriesLoading &&
          <Loader />
      }
    </div>
  )
}
