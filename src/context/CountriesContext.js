import React, { useContext, useState } from 'react'
import {
  getRestCountriesData,
  getCountrySearchCountriesData,
  loadSavedCountriesData,
  removeSavedCountry,
  addSelectedCountry
} from '../api/api'

const CountriesApiContext = React.createContext()

export function useCountriesApiContext() {
  return useContext(CountriesApiContext)
}

export function CountriesProvider({ children }) {
  const [selectedCountries, setSelectedCountries] = useState([])
  const [isAlertActive, setIsAlertActive] = useState(false)

  async function addCountry(country) {
    const countryExists = selectedCountries.find(({ name }) => name === country.name)

    if(countryExists) return

    setSelectedCountries((countries) => [...selectedCountries, country])
    try {
      await addSelectedCountry(country)
    } catch(err) {
      setIsAlertActive(true)
    }
  }

  async function removeCountry(country) {
    setSelectedCountries((countries) => countries.filter(({ name }) => name !== country.name ))
    try {
      await removeSavedCountry(country.name)
    } catch(err) {
      setIsAlertActive(true)
    }
  }

  async function loadSavedCountriesList() {
    try {
      const list = await loadSavedCountriesData()
      setSelectedCountries(list)
    } catch (err) {
      setIsAlertActive(true)
    }
  }

  async function loadCountries(name) {
    try {
      return await getCountrySearchCountriesData(name)
    } catch (err) {
      setIsAlertActive(true)
      return await getRestCountriesData(name)
    }
  }

  const countriesApiContextValue = {
    isAlertActive,
    loadCountries,
    selectedCountries,
    addCountry,
    removeCountry,
    loadSavedCountriesList,
  }

  return (
    <CountriesApiContext.Provider value={countriesApiContextValue}>
      {children}
    </CountriesApiContext.Provider>
  )
}
