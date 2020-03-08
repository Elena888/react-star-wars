import React from 'react'
import { Link } from 'react-router-dom'
import Loading from './Loading'

const CardsHero = ({data, loading}) => {

    return(
        <div className="ui cards">
            {
                loading ?
                    <Loading loading={loading} />
                    :

                    data.length > 0 && data.map(item => {
                        const icon = item.gender === 'female' ? 'female' : item.gender === 'male' ? 'male' : 'user secret'
                        return (
                            <div className="card" key={item.id}>
                                <Link to={`hero/${item.id}`}>
                                    <i className={`${icon} icon `}/>
                                    <div className="content">
                                        <div className="header">{item.name}</div>
                                        <div className="meta">{item.gender}</div>
                                    </div>
                                </Link>
                            </div>
                        )
                })
            }
        </div>
    )
};

export default CardsHero