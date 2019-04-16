import React from 'react'
import Webcam from 'react-webcam'

class MyWebcam extends React.Component {
    constructor(props) {
        super(props)
        this.timerId = null;
        this.isCapturing = false;
        this.emotions  = {'happiness': 0, 'sadness':0, 'contempt': 0, 'disgust': 0, 'fear': 0,
        'neutral': 0, 'surprise': 0, 'anger': 0 };
    }

    updateEmotions = (data) => {
        var temp = this.emotions
        this.emotions = (data[0] != null ? data[0].faceAttributes.emotion : 0);
        for (var index in this.emotions) {
            this.emotions[index] = Math.round(this.emotions[index] * 100);
        };
        if (typeof this.emotions['happiness'] == 'undefined') {
            this.emotions = temp;
        }
    }

    setRef = webcam => {
        this.webcam = webcam;
    }

    startCapturing = () => {
        this.isCapturing = true;
        this.timerId = setInterval(() => {
            const image = this.webcam.getScreenshot();
            const byteArrayImage = this.convertToByteArray(image);
            this.fetchData(byteArrayImage);
        }, 300);
    }

    stopCapturing = () => {
        this.isCapturing = false;
        clearInterval(this.timerId);
    }

    convertToByteArray = (image) => {
        const base64 = require('base64-js')
        const base64string = image.split(',')[1];
        return base64.toByteArray(base64string);
    }

    fetchData = (byteArray) => {
        const apiKey = 'ca24472c2be24c7f9cf4701a27ae3cc5';
        const apiEndpoint = 'https://australiaeast.api.cognitive.microsoft.com/face/v1.0/detect?returnFaceAttributes=emotion';
        fetch(apiEndpoint, {
            body: byteArray,
            headers: {'cache-control': 'no-cache', 'Ocp-Apim-Subscription-Key': apiKey, 'Content-Type': 'application/octet-stream'},
            method: 'POST'

        }).then(response => {
            if (response.ok) {
                response.json().then(data => {
                    this.updateEmotions(data);
                    if (this.isCapturing) {
                        this.props.onReceivedResult(this.emotions)
                    } else {
                        this.props.onReceivedResult(this.emotions);
                    }
                })
            }
        });
    }

    render() {


        const videoConstraints = {
            width: 750,
            height: 500,
            facingMode: 'user'
        }

        return(
            <div>
            <div>
                <Webcam  style = {{boxShadow: "5px 5px 5px #9E9E9E"}}
                    ref = {this.setRef}
                    audio = {false}
                    height = {250}
                    width = {375}
                    screenshotFormat = "image/jpeg"
                    videoConstraints = {videoConstraints}
                />
            </div>
                <button className = "button primary" onClick = {this.startCapturing}>Start Recording</button>
                <button className = "button secondary" onClick = {this.stopCapturing}>Stop Recording</button>
            </div>
        )
    }
}

export default MyWebcam