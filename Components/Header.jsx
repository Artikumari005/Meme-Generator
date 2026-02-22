import '/src/index.css'
import memeLogo from './meme.jpg'

export default function Header(){
    return (
        <div className="app-container">
            <div className="navbar">
                <img src={memeLogo} className='logo' alt='logo'></img>
                <h1>Meme Generator</h1>
            </div>
        </div>
    )
}
