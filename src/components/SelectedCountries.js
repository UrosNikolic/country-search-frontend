import React, { useEffect } from 'react'
import CountryListItem from './CountryListItem'
import { useCountriesApiContext } from "../context/CountriesContext";

export default function SelectedCountries() {
  const {
    selectedCountries,
    loadSavedCountriesList,
    removeCountry
  } = useCountriesApiContext()

  useEffect(() => {
    loadSavedCountriesList()
  }, [])

  return (
    <div className="w-50 flex-grow-1 pl-2">
      <ul className="list-group">
        {
          selectedCountries.map(({ name, flag }, key) => {
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
      </ul>
    </div>
  )
}
