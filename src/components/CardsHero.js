import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Loading from './Loading'

const CardsHero = ({data, loading}) => {
    const renderData = () => {
        if (data) {
            let content = ''
            data.length === 0 ?
                content =  <p>List is empty</p>
            :
                content =
                    data.length > 0 && data.map(item => {
                        let icon = '';
                        if(item.gender === 'female'){
                            icon = 'female'
                        }else if(item.gender === 'male'){
                            icon = 'male'
                        }else{
                            icon = 'user secret'
                        }
                        
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
                
            return content
        }
        console.log(data)
    }

    return(
        <div className="ui cards">
            {
                loading ?
                    <Loading loading={loading} />
                    :
                    renderData()
            }
        </div>
    )
};

CardsHero.propTypes = {
    data: PropTypes.array,
    loading: PropTypes.bool,
  };


export default CardsHero