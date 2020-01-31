import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import DisplayFlag from './DisplayFlag';
import SearchBox from './SearchBox';
import '../style/sass/3-modules/_flagPicker.sass';

import {
    fetchContinents,
    fetchCountries,
    UpdateSelectedContinent,
    UpdateCountriesToDisplayFlags
} from '../actions/flagPickerActions';

class FlagPicker extends Component {
    constructor(props) {
        super(props);

        this.state = {
            countries: [],
            countriesData: [],
            selectedContinent: "",
            selectedCountries: [],
            showCountrySection: false
        }
    }

    componentWillMount() {
        this.props.fetchContinents();
    }

    selectedContinentData = (text, ...args) =>  {
        this.props.fetchCountries(text);
        this.props.UpdateSelectedContinent(text, args[0] || false);
    }

    selectedCountriesList = (data) => {
        this.props.UpdateCountriesToDisplayFlags(data);
    }

    render() {
        const continentSection = (
            <SearchBox
                name="continent"
                placeholder="Search Continent"
                source={this.props.continents}
                selectedTextOnClick={this.selectedContinentData} />
        );

        const countrySection = (
            <div>
                <h5>Step-2</h5>
                <h5>Now select the country</h5>
            <SearchBox
                name="country"
                placeholder="Search Country"
                source={this.props.countries}
                selectedCheckedList={this.selectedCountriesList}
                multiple={true} />
            </div>
        );

        const displayFlagSection = (
            this.props.selectedCountriesToDisplayFlag.map(data => {
                return (
                    <DisplayFlag
                    flagName={data.flag}
                    countryName={data.name}
                    id={data.code}
                    key={data.code} />)
            })
        );

        return (
            <Provider store={this.props.store}>
                <div className="App">
                    <div className="Wrapper">
                        <div className="header-title">
                            <h2 style={{color: "steelblue"}}>Flag Picker</h2>
                            <h4>This app will help you to learn flags around the world in 3 steps:</h4>
                        </div>
                        <br/>
                        <br></br>
                        <div className="flagpicker-container">
                            <div className="section-1">
                            <h5><b>Step-1</b></h5>
                            <h5>Select the continent</h5>
                                {continentSection}
                            </div>
                            <div className="section-2">
                                {this.props.isContinentSelected && countrySection}
                            </div>
                            <div className="section-3">
                            { this.props.isCountriesSelected? <h5>Selected Countries</h5> : '' }
                                {displayFlagSection}
                            </div>
                        </div>
                    </div>
                </div>
            </Provider>
        )
    }
}

FlagPicker.propTypes = {
    fetchContinents: PropTypes.func.isRequired,
    fetchCountries: PropTypes.func,
    UpdateSelectedContinent: PropTypes.func,
    continents: PropTypes.array.isRequired,
    countries: PropTypes.array,
    isContinentSelected: PropTypes.bool,
    isCountriesSelected: PropTypes.bool
}

const mapStateToProps = (state) => ({
    continents: state.flagPicker.continents,
    countries: state.flagPicker.countries,
    isContinentSelected: (state.flagPicker.continents.filter(c => c.isSelected).length > 0),
    isCountriesSelected: (state.flagPicker.countries.filter(c => c.isSelected).length > 0),
    selectedCountriesToDisplayFlag: state.flagPicker.countries.filter(c => c.isSelected)
});

export default connect(mapStateToProps, { fetchContinents, fetchCountries, UpdateSelectedContinent, UpdateCountriesToDisplayFlags })(FlagPicker);