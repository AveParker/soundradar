import { useState, useEffect } from 'react'
import React from "react"
import useAuth from "./useAuth"
import { Container, Form } from 'react-bootstrap'
import SpotifyWebApi from 'spotify-web-api-node'

const spotifyApi = new SpotifyWebApi({
    clientId: '6bf879ed4da54d7f8ba7511074c72f00', 
})

export default function Dashboard ({code}) {
    const accessToken = useAuth(code)
    const [search, setSearch] = useState("")
    const [searchResults, setSearchResults] = useState([])

    useEffect(() => {
        if (!accessToken) return
     spotifyApi.setAccessToken(accessToken)   
    }, [accessToken])

    useEffect(() => {
        if (!search) return setSearchResults([])
        if (!accessToken) return 

        spotifyApi.searchTracks(search).then(res => {
           res.body.tracks.items.map(track => {
            const smallestAlbumImage = track.album.images.reduce(
                (smallest, image) => {
                    if (image.height < smallest.height) return image
                    return smallest
                }, track.album.images[0])

                return {
                    artist: track.artists[0].name, 
                    title: track.name, 
                    uri: track.uri, 
                    albumUrl: track.albumUrl.images
                } 
            }) 
        })

    }, [search, accessToken])

    return <Container className="d-flex flex-column py-2" style={{height: "100vh"}}>
        <Form.Control type="search" placeholder="Search Songs/Artists" value={search} onChange={e => setSearch(e.target.value)} />
        <div className="flex-grow-1 my-2" style={{ overflowY: 'auto' }}>
            Songs
        </div>
        <div>Bottom</div>
        </Container>
}