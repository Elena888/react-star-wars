import React from 'react'
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
                          if(index === 0){
                            return <h1 key={item.name}>{item.value}</h1>
                        }else{
                            return (
                              <div className="item" key={item.name}>
                                <i className={`${item.icon} icon large middle aligned`} />
                                <div className="content">
                                    <p>{`${item.value} ${item.name}`}</p>
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

export default HeroData;