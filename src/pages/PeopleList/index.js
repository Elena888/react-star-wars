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
        const {searchData, currentPage} = this.state;
        this.setState({ currentPage: selected }, () => {
            let url = ''
            if(searchData){
                url = `https://swapi.co/api/people/?page=${selected + 1}&search=${searchData}`;
            }else{
                url = `https://swapi.co/api/people/?page=${selected + 1}`;
            }
            this.fetchData(url)
        })
     };

    searchData = data => {
        const url = `https://swapi.co/api/people/?page=1&search=${data}`;
        this.fetchData(url)
        this.setState({
            searchData: data, 
            currentPage: 0,
        })
    };
    
    render(){
        const {people, error, searchData} = this.state;
        const {loading} = this.props;
        console.log('searchData', searchData)
        console.log('people', this.props.people)

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
                                <Search searchData={this.searchData} />
                            </div>
                            <div className="eleven wide tablet twelve wide computer column">
                                <div className="cards-people">
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
