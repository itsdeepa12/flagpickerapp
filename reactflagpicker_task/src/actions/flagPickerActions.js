import SourceData from '../asset/continents.json';

const createContinentsList = (source) =>
    source.map(c => ({ "name": c.continent, "isSelected": false }));


const createCountriesList = (source, sContinent) => {
    return (
        source.filter(x => x.continent === sContinent)
            .map(data => data.countries
                .map((c) => { c.isSelected = false; return c; })
            )[0]
    )
}

export const fetchContinents = () => dispatch => dispatch({
    type: 'FETCH_CONTINENTS_DATA',
    payload: createContinentsList(SourceData)
});

export const fetchCountries = (selectedContinent) => dispatch => dispatch({
    type: 'FETCH_COUNTRIES_DATA',
    payload: createCountriesList(SourceData, selectedContinent)
});

export const UpdateSelectedContinent = (continent, isUnSelected = false) => dispatch => dispatch({
    type: (isUnSelected)
        ? 'UPDATE_CONTINENT_UNSELECTED'
        : 'UPDATE_CONTINENT_SELECTED',
    payload: continent || ""
});

export const UpdateCountriesToDisplayFlags = (countriesData) => dispatch => dispatch({
    type: 'UPDATE_COUNTRIES_TO_DISPLAY_FLAGS',
    payload: countriesData
});