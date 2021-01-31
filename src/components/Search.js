import React, { useState } from 'react'
import { debounce } from 'lodash'
import CountryListItem from './CountryListItem'
import Loader from './Loader'
import { useCountriesApiContext } from '../context/CountriesContext'

export default function Search() {
  const [countryList, setCountryList] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const {
    loadCountries,
    addCountry
  } = useCountriesApiContext()

  async function onChange(e) {
    e.preventDefault()
    const countryName = e.target.value

    if (!countryName) return setCountryList([])

    try {
      setIsLoading(true)
      const countries = await loadCountries(countryName.trim())
      setCountryList(countries)
      setIsLoading(false)
    } catch (err) {
      setIsLoading(false)
    }
  }

  const onChangeDebounced = debounce(onChange, 250)

  return (
    <div className='w-50 flex-grow-1 pr-2'>
      <h4>Country Search</h4>
      <input
        type='text'
        className='form-control w-100'
        placeholder='Start typing a country name here'
        onChange={onChangeDebounced}
      />
      <ul className='list-group mt-1'>
        {
          isLoading ?
            (
              <Loader />
            )
            :
            countryList.map(({ name, flag }, key) => {
              return (
                <CountryListItem
                key={key}
                name={name}
                flag={flag}
                onClick={() => addCountry({ name, flag })}
                />
              )
            })
        }
      </ul>
    </div>
  )
}
