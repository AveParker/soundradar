import React from 'react' 
import { container } from "react-bootstrap"

const AUTH_URL = "https://accounts.spotify.com//authorize?client_id=&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state"

export default function Login() {
    return (
        <Container>
            
        <a className="btn btn-success btn-lg" href={AUTH_URL}>
            Login with Spotify
        </a>
        </Container>
    )
}

