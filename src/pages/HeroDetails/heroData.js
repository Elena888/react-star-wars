import React from 'react'
import PropTypes from 'prop-types'
import Loading from '../../components/Loading'

const HeroData = ({heroData, renderButton, loading}) => {
    return (
        loading ?
            <Loading loading={loading} />
            :
            (
                <>
                    <div className="ui middle aligned selection list">
                    {
                        heroData.map((item, index) => {
                          const {name, value, icon} = item;
                          if(index === 0){
                            return <h1 key={name}>{value}</h1>
                        }else{
                          const itemValue = value ? `${value.charAt(0).toUpperCase()}${value.slice(1)}` : ''
                            return (
                              <div className="item" key={name}>
                                <i className={`${icon} icon large middle aligned`} />
                                <div className="content">
                                    <p>{`${itemValue} ${name}`}</p>
                                </div>
                              </div>
                            )
                        }
                     })
                    }
                    </div>
                    {renderButton()}
                </>
            )

        )

};
HeroData.propTypes = {
    heroData: PropTypes.array,
    loading: PropTypes.bool,
    renderButton: PropTypes.func,
  };


export default HeroData;