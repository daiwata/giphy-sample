import axios from 'axios';
import { render } from '@testing-library/react';
import { Search } from './components/Search'
import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {

    constructor() {
        super();
        this.state = { gifUrlList: [] }
    }

    renderImageList(list) {
        const imageList = list.map(url => <img src={url} width="200px" />)
        return imageList
    }

    render() {
        return (
            <div>
                <Search search={this.giphyApi} />
                {this.renderImageList(this.state.gifUrlList)}
            </div>
        )
    }

    giphyApi = (target) => {
        const search = target
        const key = 'fjkFSdzcC0ZSKJ26mGAn5uuDgSQhxthQ'
        const limit = 100

        const url = `https://api.giphy.com/v1/gifs/search?q=${search}&api_key=${key}&limit=${limit}`

        axios.get(url).then(res => {
            const data = res.data.data
            const imageUrlList = data.map(item => item.images.downsized.url)
            this.setState({ gifUrlList: imageUrlList })
        })
    }
}

render(
    <App />, document.getElementById('root')
)
