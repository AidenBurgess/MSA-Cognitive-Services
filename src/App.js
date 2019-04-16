import React, { Component } from 'react'
import Title from './components/Title'
import Displayer from './components/Displayer'
import AddVideo from './components/AddVideo'
import './components/stylesheet.css'
import EmotionAnalysis from './components/EmotionAnalysis'


export default class App extends Component {
  constructor() {
    super()
    this.state = {
      posts:[{
        videoLink: ""
      }]
    }
  }
  addVideo(postSubmitted) {
    this.setState(state => ({
      posts: [postSubmitted]
    }))
  }

  render() {
    return (
    <div>
      <div className= "header">
      <Title title = {'Record your Emotions'}/>
      </div>
      <div className = "video">
      <AddVideo onAddVideo = {(addedPost) => {
        this.addVideo(addedPost)
      }} />
      </div>
      <div className = "video-wrapper">
        <Displayer posts = {this.state.posts}/>
      </div>
      <h1 style = {{
        position: 'fixed',
        bottom: '0',
        right: '0',}}>
        <EmotionAnalysis/>
        </h1>
    </div>
    );
  }
}

// export default App;
