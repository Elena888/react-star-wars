import React from 'react'
import PropTypes from 'prop-types'
import { connect  } from 'react-redux'
import {fetchFavorites} from '../../actions'
import ReactPaginate from 'react-paginate';

import CardsHero from '../../components/CardsHero'
import Search from '../../components/Search'
import '../../styles/pages/listData.scss'

const chunkData = (data, perChunk) => {
    return data.reduce((all,one,i) => {
        const ch = Math.floor(i/perChunk); 
        all[ch] = [].concat((all[ch]||[]),one); 
        return all
     }, [])
}

class FavoritesList extends React.Component {
    state = {
        data: [],
        currentPage: 0,
        pageCount: 1
      };
    componentDidMount() {
        this.props.fetchFavorites()
    }

    componentDidUpdate(prevProps){
       const {favorites} = this.props;
        if (favorites !== prevProps.favorites) {
            this.setState({
                data: chunkData(favorites.data, 10),
                pageCount:  Math.ceil(favorites.data.length / 10)
            })
        }
    }

    handlePageClick = ({ selected }) => {
        this.setState({ currentPage: selected })
    };

    searchData = (data) => {
        const {favorites} = this.props;
        const dataFind = favorites.data.filter(item => {
            return item['name'].toLowerCase().includes(data)
        }); 
        
        this.setState({
            data: chunkData(dataFind, 10),
            currentPage: 0,
            pageCount: Math.ceil(dataFind.length / 10)
        })
    }
    
    render() {
        const {favorites: {loading}} = this.props;
        const {data, currentPage, pageCount} = this.state;
        const displayData = data.length === 0 ? [] : data[currentPage];
   
        return (
            <section className="people-list">
                <div className="ui container">
                    <div className="ui grid">
                        <div className="sixteen wide column">
                            <h1>Favorites List</h1>
                        </div>
                        <div className="twelve wide column">
                            <div className="cards-people">
                                <CardsHero data={displayData} loading={loading} />
                                {displayData.length > 10 &&
                                    <ReactPaginate
                                        previousLabel={<i className='chevron left icon'/>}
                                        nextLabel={<i className='chevron right icon'/>}
                                        breakLabel={'...'}
                                        breakClassName={'break-me'}
                                        pageCount={pageCount}
                                        marginPagesDisplayed={2}
                                        pageRangeDisplayed={5}
                                        onPageChange={this.handlePageClick}
                                        containerClassName={'pagination'}
                                        activeClassName={'active'}
                                    />
                                }
                            </div>
                        </div>
                        <div className="four wide column">
                            <Search searchData={this.searchData} />
                        </div>
                    </div>
                </div>
            </section>
        )
}

};

FavoritesList.propTypes = {
    auth: PropTypes.object,
    favorites: PropTypes.object
  };

const mapStateToProps = (state) => {
    return {
        favorites: state.favorites,
        auth: state.firebase.auth,
    }
};
export default connect(mapStateToProps, {fetchFavorites})(FavoritesList)


