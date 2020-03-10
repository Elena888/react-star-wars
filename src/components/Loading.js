import React from 'react'
import PropTypes from 'prop-types'

const Loading = ({loading}) => {
    return(
        loading && <div className="ui active centered  loader"/>
    )
};

Loading.propTypes = {
    loading: PropTypes.bool
};

export default Loading;
