import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import '../style/sass/3-modules/_searchBox.sass';

class SearchBox extends Component {
    constructor(props) {
        super(props);

        this.state = {
            query: '',
            isDropdownExpanded: false,
            selectedItem: ""
        }
    }
    
    componentDidMount = () => document.addEventListener('click', this.handleClickOutside);

    componentWillUnmount = () => document.removeEventListener('click', this.handleClickOutside);

    setWrapperRef = (node) => this.wrapperRef = node;

    handleClickOutside = (event) => {
        if (this.wrapperRef && !this.wrapperRef.contains(event.target) && this.state.isDropdownExpanded) {
            this.manageDropDownOptions(false);
        }
    }


    onInputChange = (e) => {
        e.stopPropagation();
        this.setState({ query: this.search.value });
    }

    itemOnSelection = (evt) => {
        evt.stopPropagation();
        (this.props.multiple) ? this.handleMultiSelection(evt) : this.handleSelection(evt);
    }


    handleMultiSelection = (evt) => {
        let list = this.props.source;
        let element = evt.target.querySelector("input");

        (!element) ? element = evt.target : element.checked = !element.checked;
        list.filter(x => x.name.indexOf(element.value) >= 0).map(y => y.isSelected = element.checked);

        this.sendSelectedValueToParent(list);
        this.updateSelectedItem(element.value);
    }


    handleSelection = (evt) => {
        this.sendSelectedValueToParent(evt.target.textContent);
        this.updateSelectedItem(evt.target.textContent);
        this.setIsDropDownOptions(!this.state.isDropdownExpanded);
    }


    handleRemoveItemOnClick = (evt, item) => {
        evt.stopPropagation();

        let list = this.props.source;
        list.filter(x => x.name.indexOf(item) >= 0).map(y => y.isSelected = false);

        this.sendSelectedValueToParent(list, true);
        this.updateSelectedItem();

        if (this.getIsSelectedItemsFromAList(list).length === 0) {
            this.setIsDropDownOptions(false);
        }
    }

    sendSelectedValueToParent = (data, isUnSelected = false) => (this.props.multiple)
        ? this.props.selectedCheckedList(data)
        : this.props.selectedTextOnClick(data, isUnSelected);


    clearFilteredSearch = () => this.setState({ query: "" }, () => this.search.value = "");

    updateSelectedItem = (item) => this.setState({ selectedItem: item });

    setIsDropDownOptions = (value) => this.setState({ isDropdownExpanded: value }, () => this.clearFilteredSearch());

    getIsSelectedItemsFromAList = (list) => (list && list.filter(data => data.isSelected)) || [];

    filterSearch = (data) => (data && (data.isSelected || data.name.toLowerCase().indexOf(this.state.query.toLowerCase()) >= 0));


    render() {
        const selectedItems = this.getIsSelectedItemsFromAList(this.props.source);
        const isAnyItemSelected = (selectedItems && selectedItems.length > 0);

        const selectBox = (isAnyItemSelected) ?
            (selectedItems && selectedItems.map((data, index) => (
                <div className="dropdown-label" key={index}>
                    {data.name}
                    <i className="icon fa fa-close"
                        onClick={(evt) => this.handleRemoveItemOnClick(evt, data.name)}></i>
                </div>
            ))) : (<div className="dropdown-label">{"Select"}</div>);

        const searchBox = (
            <input
                type="search"
                placeholder={this.props.placeholder}
                className="dropdown-search"
                ref={input => this.search = input}
                onChange={(evt) => this.onInputChange(evt)}
                onClick={(evt) => this.onInputChange(evt)} />
        );

        const autoCompleteItems = (
            this.props.source && this.props.source.filter(this.filterSearch).map((data, index) => (
                <li name="dropdown-items"
                    key={index}
                    value={data.name}
                    onClick={(evt) => this.itemOnSelection(evt)}>
                    {
                        (this.props.multiple)
                            ? (
                                <span>
                                    <input checked={data.isSelected}
                                        type="checkbox"
                                        value={data.name} /> {data.name}
                                </span>
                            )
                            : (
                                <span>{data.name}</span>
                            )
                    }
                </li>
            ))
        );

        return (
            <div className="search-box" ref={this.setWrapperRef}>
                <div className="dropdown-container" onClick={() => this.setIsDropDownOptions(!this.state.isDropdownExpanded)}>
                    <div className="dropdown-button">
                        <div className={`dropdown-autocomplete-item ${(isAnyItemSelected) ? "selected-item" : ""}`}>
                            {selectBox}
                        </div>
                        <i className="icon fa fa-chevron-circle-down"></i>
                    </div>
                    <div className={`dropdown-list ${(!this.state.isDropdownExpanded) ? "toggle" : ""} `}>
                        {searchBox}
                        <ul className="dropdown-list-items">
                            {autoCompleteItems}
                        </ul>
                    </div>
                </div>
                <br/>
            <br/>
            <br/>
                { selectedItems && selectedItems.length > 0 ? 
                <div className="search-box"><h5>you are selected:</h5>
                <h6>{selectBox}</h6>
                </div>: ''}
            </div>
        )
    }
}

SearchBox.defaultProps = {
    multiple: false,
    name: "searchbox",
    disabled: false,
    placeholder: "Search",
    source: []
}

SearchBox.propTypes = {
    multiple: PropTypes.bool,
    name: PropTypes.string,
    disabled: PropTypes.bool,
    placeholder: PropTypes.string,
    source: PropTypes.array
}

export default connect(null, {})(SearchBox);