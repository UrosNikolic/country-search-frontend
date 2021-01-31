import React from 'react'
import Alert from './components/Alert'
import Search from './components/Search'
import SelectedCountries from './components/SelectedCountries'
import { CountriesProvider } from './context/CountriesContext'

const ListSearchApp = () => {
  return (
    <CountriesProvider>
      <div className='container px-0'>
        <div className='row w-100 d-flex pt-2'>
          <Alert />
        </div>
        <div className='row w-100 d-flex pt-2'>
          <Search />
          <SelectedCountries />
        </div>
      </div>
    </CountriesProvider>
  )
}

export default ListSearchApp;
