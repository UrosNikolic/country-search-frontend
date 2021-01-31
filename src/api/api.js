export async function getRestCountriesData(countryName) {
  return fetch(`${process.env.REACT_APP_REST_COUNTRIES_API_URL}/rest/v2/name/${countryName}?fields=name;flag`)
    .then(response => response.json())
    .then(data => {
      return data.length ? data.slice(0, 5) : []
    })
}

export async function getCountrySearchCountriesData(countryName) {
  return fetch(`${process.env.REACT_APP_COUNTRY_SEARCH_API_URL}/countries/${countryName}`)
    .then(response => response.json())
}

export async function loadSavedCountriesData() {
  return fetch(`${process.env.REACT_APP_COUNTRY_SEARCH_API_URL}/countries-list`)
    .then(response => response.json())
}

export async function removeSavedCountry(name) {
  return fetch(`${process.env.REACT_APP_COUNTRY_SEARCH_API_URL}/countries-list/${name}`,{
    method: 'DELETE',
  })
    .then(response => response.json())
}

export async function addSelectedCountry(data) {
  return fetch(`${process.env.REACT_APP_COUNTRY_SEARCH_API_URL}/countries-list`,{
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(response => response.json())
}
