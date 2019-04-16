import React from 'react'
import propTypes from 'prop-types'
import Video from './Video'

function Displayer(props) {
    return <div>
        {props.posts.map((post) => <Video post = {post} />)}
    </div>
}

Displayer.propTypes = {
    posts: propTypes.array.isRequired
}

export default Displayer