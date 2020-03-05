import React from 'react'
import ReactPaginate from 'react-paginate';
import { connect } from 'react-redux'
import { Link } from "react-router-dom";

import { fetchData } from "../../actions";

import Loading from '../../components/Loading'
import Search from '../../components/Search'

class PeopleList extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            error: false,
            loading: false,
            people: [],
            pageCount: 1
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
    }
    loadData = page => {
        const url = `https://swapi.co/api/people/?page=${page.selected + 1}`
        this.fetchData(url)
     };

    searchData = data => {
        
        const url = `https://swapi.co/api/people/?search=${data}`
        console.log(url)
        this.fetchData(url)
     }
    
    render(){
        const {people, error} = this.state;
        const {loading} = this.props;
      
        console.log('people', people);
        if (error) {
            return <p>Sorry! There was an error loading people</p>;
        }
        return(
            <section className="people-list">
                <div className="ui container">
                    <h1>People List</h1>
                    <div className="ui grid">
                        <div className="ten wide column">
                            {
                                loading ?
                                <Loading loading={loading} />
                                :
                                <div className="ui cards people">
                                    {
                                        people.length > 0 && people.map(item => {
                                            
                                            const icon = item.gender === 'female' ? 'female' : item.gender === 'male' ? 'male' : 'user secret'
                                            return (
                                                <div className="card" key={item.name}>
                                                    <div className="content">
                                                        <div className="header">
                                                            <Link to={`people-list/${item.id}`}>
                                                                <i className={`${icon} icon `}/> {item.name}
                                                            </Link>
                                                            
                                                        </div>
                                                        <div className="meta">{item.gender}</div>
                                                    </div>
                                                    <div className="extra content">
                                                        Add to Favorites 
                                                    </div>
                                                    <div className="ui heart rating" data-rating="1" data-max-rating="3"/>
                                                </div>
                                            )
                                        })   
                                    }
                                </div>
                            }
                            <ReactPaginate
                                previousLabel={<i className='chevron left icon'></i>}
                                nextLabel={<i className='chevron right icon'></i>}
                                breakLabel={'...'}
                                breakClassName={'break-me'}
                                pageCount={this.state.pageCount}
                                onPageChange={this.loadData}
                                containerClassName={'pagination'}
                                activeClassName={'active'}
                            /> 
                        </div>
                        <div className="six wide column">
                            <Search searchData={this.searchData} />
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        people: state.data.data,
        error: state.data.error,
        loading: state.data.loading,
    }
};

export default connect(mapStateToProps, { fetchData })(PeopleList)
