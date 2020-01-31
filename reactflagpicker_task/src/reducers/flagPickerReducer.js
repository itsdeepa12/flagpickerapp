const initialState = {
    continents: [],
    countries: []
}

const getUpdatedContinents = (state, action, __isSelected) => {
    let _continents = state.continents;
    
    _continents.map((c2) => (
        c2.isSelected = (c2.name === action.payload) ? __isSelected : c2.isSelected
    ));

    return _continents;
}

export default function (state = initialState, action) {
    switch (action.type) {
        case 'FETCH_CONTINENTS_DATA':
            return {...state,
                continents: action.payload || state.continents
            }
        case 'FETCH_COUNTRIES_DATA':
            return {
                ...state,
                countries: action.payload || state.countries
            }
        case 'UPDATE_CONTINENT_SELECTED': {
            return {
                ...state,
                continents: getUpdatedContinents(state, action, true) || state.continents
            }
        }
        case 'UPDATE_CONTINENT_UNSELECTED': {
            return {
                ...state,
                continents: getUpdatedContinents(state, action, false) || state.continents,
                countries: []
            }
        }
        case 'UPDATE_COUNTRIES_TO_DISPLAY_FLAGS':
            return {
                ...state,
                countries: action.payload || state.countries
            }
        default:
            return state;
    }
}