import React from 'react'
import {BrowserRouter as Router, Switch , Route , withRouter} from "react-router-dom"
import {Button , Container, Form ,Row,Col,InputGroup} from 'react-bootstrap'
import axios from 'axios'
import "./styles/App.css"
import VideoComponent from "./components/VideoComponent"
import { motion } from "framer-motion"

class App extends React.Component{
    constructor(){
        super()
        this.state={
            searchText:"",
            hasSearched: false,
            videos:[]
        }
        this.textInput = React.createRef()
    }

    componentDidMount(){
        this.textInput.current.focus()
    }

    onChangeSearch = (e) =>{
        this.setState({
            searchText: e.target.value,
        })
    }

    handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            this.search()
        }
     }

    search = () =>{
        this.setState({
            hasSearched:true,
        })
        axios.get('http://localhost:5000/search', {params:{searchText:this.state.searchText}})
        .then(response => {
            this.setState({
                videos:response.data,
                hasSearched:true,
            })
            console.log(response)
        })
        .catch(error => {
            // handle error
            console.log("Err0r:", error)
        })
    }

    render(){

        console.log("searchText", this.state.searchText)
        console.log("videos", this.state.videos)

        return(
            <Container>
                <div className="d-flex align-items-center justify-content-center mainDiv">

                    <div>
                        <div className={`searchDiv${this.state.hasSearched ? ' searchDone' : ''}`}>
                            <h1 className="text-center mb-4">Youtube Search</h1>
                            <InputGroup className="mb-4">
                                <Form.Control ref={this.textInput} size="lg mr-2" type="text" onChange={this.onChangeSearch} value={this.state.searchText} onKeyDown={this.handleKeyDown} style={{width:"500px"}}/>
                                <Button variant="primary" onClick={this.search}>Search</Button>
                            </InputGroup>
                        </div>

                        {this.state.hasSearched &&
                            <Row className="mb-3" style={{marginTop: "200px"}}>
                                { this.state.videos.map((item,i) => (
                                    <Col className="mb-3" lg="6" xl="4" >
                                        <motion.div
                                            animate={{ scale: [0.2, 1] }}
                                            transition={{ ease: "easeOut", duration: 1.3 }}
                                        >
                                            <a href={`https://youtube.com/watch?v=${item.id.videoId}`}>
                                                <VideoComponent
                                                    thumbnail={item.snippet.thumbnails.medium.url}
                                                    videoTitle={item.snippet.title}
                                                    channelTitle={item.snippet.channelTitle}
                                                    videoDescription={item.snippet.description}
                                                />
                                            </a>
                                        </motion.div>
                                    </Col>
                                ))}
                            </Row>
                        }
                    </div>
                </div>
            </Container>
        )
    }
}

export default App
