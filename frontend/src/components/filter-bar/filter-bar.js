import React, { Component } from 'react'
import { Search, Dropdown, Button } from 'semantic-ui-react'
import _ from 'lodash';

import { getMovies } from '../../services/movie-service'

import './filter-bar.css'

const orderOptions = [
    { key: 'title', value: 'title', text: 'Title' },
    { key: 'vote_average', value: 'vote_average', text: 'Rating' }
];

let movies = [];

export default class FilterBar extends Component {

    constructor(props) {
        super(props)

        this.handleResultSelect = this.handleResultSelect.bind(this);
        this.handleSearchChange = this.handleSearchChange.bind(this);
        this.getData = this.getData.bind(this);

        this.state = {
            isLoading: false,
            results: [],
            valueInputSearch: '',
            orderSelected: ''
        }
    }

    componentDidMount() {
        this.getData();
    }

    async getData(filter, order) {
        let _filter = filter || this.state.valueInputSearch;
        let _order = order || this.state.orderSelected;
        movies = await getMovies(_filter, _order);

        this.props.props.onChange(movies);
        return movies;
    }

    handleResultSelect = (e, { result }) => {
        this.setState({ valueInputSearch: result.title })
        this.getData(result.title);
    };

    truncateString = (str) => {
        if (str.length < 30) {
            return str;
        }
        return str.slice(0, 30) + '...';
    };

    handleSearchChange = async (e, { value }) => {
        this.setState({ isLoading: true, valueInputSearch: value });
        let movieList = await this.getData(value);
       
        const re = new RegExp(_.escapeRegExp(this.state.valueInputSearch), 'i')
        const isMatch = (result) => re.test(result.title)
        let results = movieList.filter(movie => isMatch(movie))
            .map(movie => {
                return {
                    title: movie.title,
                    description: this.truncateString(movie.overview, 12),
                    image: movie.poster_path,
                }
            });

        this.setState({
            isLoading: false,
            results: results
        });
    }

    onClick = () => {
        this.props.props.onClick(null);
    }

    onDropdownChange = (event, data) => {
        this.setState({
            orderSelected: data.value
        });
        this.getData(null, data.value);
    }

    render() {
        return <div className="filter-bar">
            <Search
                loading={this.state.isLoading}
                onResultSelect={this.handleResultSelect}
                onSearchChange={_.debounce(this.handleSearchChange, 500, {
                    leading: true,
                })}
                results={this.state.results}
                value={this.state.valueInputSearch}
                className="search-bar"
            />
            <Dropdown placeholder='Order by...' className="select-input" selection options={orderOptions} onChange={this.onDropdownChange}/>
            <Button onClick={this.onClick} className="add-button" circular color='google plus' icon='plus' />
        </div>;
    }
}
