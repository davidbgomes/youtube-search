import React from 'react'
import {BrowserRouter as Router, Switch , Route , withRouter} from "react-router-dom"
import {Button , Container, Form ,Row,Col,InputGroup, Spinner} from 'react-bootstrap'
import axios from 'axios'
import "./styles/App.css"
import VideoComponent from "./components/VideoComponent"
import { motion } from "framer-motion"

class App extends React.Component{
    constructor(){
        super()
        this.state={
            searchText:"",
            isSearching:false,
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
            isSearching:true,
        })
        axios.get('https://rocky-dawn-62908.herokuapp.com/search', {params:{searchText:this.state.searchText}})
        .then(response => {
            this.setState({
                videos:response.data,
                isSearching:false,
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
                            <InputGroup className="inputGroup mb-4">
                                <Form.Control className="textField mr-2" ref={this.textInput} size="lg" type="text" onChange={this.onChangeSearch} value={this.state.searchText} onKeyDown={this.handleKeyDown}/>
                                <Button variant="primary" disabled={this.state.isSearching} onClick={this.search}>
                                    {this.state.isSearching ?
                                        <Spinner animation="border" size="sm"/>
                                    :
                                        <span>Search</span>
                                    }
                                </Button>
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

                        {this.state.isSearching &&
                            <Spinner animation="grow" />
                        }
                    </div>
                </div>
            </Container>
        )
    }
}

export default App
