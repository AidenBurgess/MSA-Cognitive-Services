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
            <h2>{"Happiness: " + props.result['happiness'] + "%"}</h2>
            <h2>{"Sadness: " + props.result['sadness'] + "%"}</h2>
            <h2>{"Fear: " + props.result['fear'] + "%"}</h2>
            <h2>{"Disgust: " + props.result['disgust'] + "%"}</h2>
            <h2>{"Anger: " + props.result['anger'] + "%"}</h2>
            <h2>{"Surprise: " + props.result['surprise'] + "%"}</h2>
            <h2>{"Neutral: " + props.result['neutral'] + "%"}</h2>
        </div>
        
    );
}

export default EmotionAnalysis