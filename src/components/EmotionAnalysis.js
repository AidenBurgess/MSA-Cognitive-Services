import React from 'react'
import { useState } from 'react'
import MyWebcam from './MyWebcam'
import Draggable from 'react-draggable'


function EmotionAnalysis() {
    const [result, updateResult] = useState(0);
    return (
        <div>
            <Draggable>
                <div>
                    <MyWebcam onReceivedResult = {updateResult}/>
                    <Result result = {result}/>
                </div>
            </Draggable>
        </div>
    )
}

function Result(props) {
    return (
        <div>
            <h1>{props.result < 100 ? props.result + "%" : "Game Over!"}</h1>
        </div>
    )
}

export default EmotionAnalysis