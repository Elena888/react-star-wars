import React, {useState, useEffect} from 'react'
import { connect  } from 'react-redux'
import { compose } from 'redux'
import { isLoaded } from 'react-redux-firebase'
import {firestoreConnect} from "react-redux-firebase";
import ReactPaginate from 'react-paginate';

import CardsHero from '../../components/CardsHero'

const FavoritesList = ({ favorites }) => {
    const [pageCount, setPageCount] = useState(1);
    useEffect(() => {
        const pageCount = favorites && Math.ceil(favorites.length / 10);
        setPageCount(pageCount)
    })

    const loadData = (data) => {
        let selected = data.selected;
        let offset = Math.ceil(selected * 10);
    }
    console.log(pageCount)
    return (
        <section className="people-list">
            <div className="ui container">
                <div className="ui grid">
                    <div className="sixteen wide column">
                        <h1>Favorites List</h1>
                    </div>
                    <div className="twelve wide column">
                        <div className="cards-people">
                            {
                                favorites && favorites.length === 0 ?
                                    <p>List is empty</p>
                                    :
                                    <>
                                        <CardsHero data={favorites} loading={!isLoaded(favorites)}/>
                                        <ReactPaginate
                                            previousLabel={<i className='chevron left icon'/>}
                                            nextLabel={<i className='chevron right icon'/>}
                                            breakLabel={'...'}
                                            breakClassName={'break-me'}
                                            pageCount={pageCount}
                                            onPageChange={loadData}
                                            containerClassName={'pagination'}
                                            activeClassName={'active'}
                                        />
                                    </>
                            }

                        </div>
                    </div>
                    <div className="four wide column">

                    </div>
                </div>
            </div>
        </section>
    )

};

const mapStateToProps = (state) => {
    return {
        favorites: state.firestore.ordered.favorites,
        auth: state.firebase.auth,
    }
};

export default compose(
    connect(mapStateToProps),
    firestoreConnect(props => {
            if (!props.auth.uid) return []

            return(
                [
                    {
                        collection: 'favorites',
                        where: [
                            ['userId', '==', props.auth.uid]
                        ],

                    }
                ]
            )
        }
    ),

)(FavoritesList)
