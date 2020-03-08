import React from 'react'

const Loading = ({loading}) => {
    return(
        loading && <div className="ui active centered  loader"/>
    )
};

export default Loading;
