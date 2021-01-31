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
  const [isSelectedCountriesLoading, setIsSelectedCountriesLoading] = useState([])
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
      setIsSelectedCountriesLoading(true)
      const list = await loadSavedCountriesData()
      setSelectedCountries(list)
      setIsSelectedCountriesLoading(false)
    } catch (err) {
      setIsAlertActive(true)
      setIsSelectedCountriesLoading(false)
    }
  }

  async function loadCountries(name) {
    if (!name) return []

    try {
      setIsSelectedCountriesLoading(true)
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
    isSelectedCountriesLoading
  }

  return (
    <CountriesApiContext.Provider value={countriesApiContextValue}>
      {children}
    </CountriesApiContext.Provider>
  )
}
