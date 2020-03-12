import React from 'react'
import PropTypes from 'prop-types'
import ReactPaginate from 'react-paginate';
import { connect } from 'react-redux'

import { fetchData } from "../../actions";

import Search from '../../components/Search'
import CardsHero from '../../components/CardsHero'
import '../../styles/pages/listData.scss'

class PeopleList extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            error: false,
            people: [],
            pageCount: 1,
            searchData: null,
            currentPage: 0,
            sortType: 'desc'
        } 
    }

    componentDidMount(){
        const url = 'https://swapi.co/api/people/';
        this.fetchData(url)
    }

    fetchData = url => {
        this.props.fetchData(url)
        .then(res => {
            const data = []
            res.results.map(item => {
                let id = item.url.split('/')
                id = id[id.length - 2]
                const {name, gender} = item;
                const personData = {name, gender, id}
                data.push(personData)
                return item
            })
            this.setState({
                people: data,
                pageCount: Math.ceil(res.count / 10)
            }) 
        })
        .catch(error => {
            this.setState({error})
        })
    };

    loadData = ({selected}) => {
        const {searchData} = this.state;
        this.setState({ currentPage: selected })
        let url = ''
        if(searchData){
            url = `https://swapi.co/api/people/?page=${selected + 1}&search=${searchData}`;
        }else{
            url = `https://swapi.co/api/people/?page=${selected + 1}`;
        }
        this.fetchData(url)
     };

    searchData = data => {
        const url = `https://swapi.co/api/people/?page=1&search=${data}`;
        this.fetchData(url)
        this.setState({
            searchData: data, 
            currentPage: 0,
        })
    };

    sortData = sortType => {
        const obj = [...this.state.people];
        if(sortType === 'asc'){
            obj.sort((a, b) => a.name.localeCompare(b.name))
        }else{
            obj.sort((a, b) => b.name.localeCompare(a.name))
        }
        
        this.setState({ people: obj, sortType })
    }
    
    render(){
        const {people, error, searchData, currentPage, sortType} = this.state;
        const {loading} = this.props;
        const type = sortType === 'asc' ? 'desc' : 'asc'
        const typeIcon = sortType === 'asc' ? <i className="caret up big icon"/> : <i className="caret down big icon"/>

        return(
            <section className="people-list">
                <div className="ui aligned stackable grid container">
                    <div className="sixteen wide column">
                        <h1>People List</h1>
                    </div>
                    {
                        error ?
                            <p>Sorry! There was an error loading people</p>
                        :
                        <div className="row row-reverse">
                             <div className="five wide tablet four wide computer column">
                                 <aside className="sidebar">
                                    <Search searchData={this.searchData} />
                                    <div className="ui small message">
                                        Sort by name 
                                        <button 
                                            className="sort-button"
                                            onClick={() => this.sortData(type)}
                                        >
                                            {typeIcon}
                                        </button>
                                    </div>
                                 </aside>
                                
                            </div>
                            <div className="eleven wide tablet twelve wide computer column">
                                <div className="cards-people">
                                    {searchData && <h2>Search results of '{searchData}'</h2>}
                                    <CardsHero data={people} loading={loading} />
                                
                                    <ReactPaginate
                                        previousLabel={<i className='chevron left icon'/>}
                                        nextLabel={<i className='chevron right icon'/>}
                                        marginPagesDisplayed={1}
                                        pageRangeDisplayed={2}
                                        breakLabel={'...'}
                                        breakClassName={'break-me'}
                                        pageCount={this.state.pageCount}
                                        onPageChange={this.loadData}
                                        forcePage={currentPage}
                                        containerClassName={'pagination'}
                                        activeClassName={'active'}
                                    />
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </section>
        )
    }
}

PeopleList.propTypes = {
    people: PropTypes.object,
    error: PropTypes.string,
    loading: PropTypes.bool,
  };


const mapStateToProps = (state) => {
    return {
        people: state.data.data,
        error: state.data.error,
        loading: state.data.loading,
    }
};

export default connect(mapStateToProps, { fetchData })(PeopleList)
