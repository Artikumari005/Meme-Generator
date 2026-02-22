import { useState, useEffect } from "react"
import html2canvas from "html2canvas"

export default function Main() {
    const [meme, setMeme] = useState({
        topText: "One does not simply",
        middleText: "",
        bottomText: "Walk into Mordor",
        imageUrl: "http://i.imgflip.com/1bij.jpg",
        boxCount: 2
    })
    const [allMemes, setAllMemes] = useState([])
    
    useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
            .then(res => res.json())
            .then(data => setAllMemes(data.data.memes))
    }, [])
    
    function getRandomImage() {
        if (allMemes.length === 0) return 
        
        const randomNumber = Math.floor(Math.random() * allMemes.length)
        const selectedMeme = allMemes[randomNumber]
        let boxCount = selectedMeme.box_count || 2
        
        // Handle edge cases where boxCount might be 0 or > 3
        if (boxCount < 1) boxCount = 2
        if (boxCount > 3) boxCount = 3
        
        setMeme(preMeme => ({
            ...preMeme,
            topText: "",
            middleText: "",
            bottomText: "",
            imageUrl: selectedMeme.url,
            boxCount: boxCount
        }))
    }

    function handleChange(event) {
        const {value, name} = event.target
        setMeme(prevMeme => ({
            ...prevMeme,
            [name]: value
        }))
    }

    function downloadMeme() {
        const memeDiv = document.getElementById("meme")
        html2canvas(memeDiv, { useCORS: true, scale: 2 }).then(canvas => {
            const link = document.createElement("a")
            link.download = "my-meme.png"
            link.href = canvas.toDataURL("image/png")
            link.click()
        })
    }
    
    return (
        <main className="app-container">
            <div className="container">
                <div className="form">
                    {meme.boxCount >= 2 && (
                        <label>Top Text
                            <input
                                type="text"
                                placeholder="Enter top text"
                                name="topText"
                                onChange={handleChange}
                                value={meme.topText}
                            />
                        </label>
                    )}
                    
                    {meme.boxCount === 3 && (
                        <label>Middle Text
                            <input
                                type="text"
                                placeholder="Enter middle text"
                                name="middleText"
                                onChange={handleChange}
                                value={meme.middleText}
                            />
                        </label>
                    )}
                    
                    {meme.boxCount >= 2 && (
                        <label>Bottom Text
                            <input
                                type="text"
                                placeholder="Enter bottom text"
                                name="bottomText"
                                onChange={handleChange}
                                value={meme.bottomText}
                            />
                        </label>
                    )}
                    
                    {meme.boxCount === 1 && (
                        <label>Text
                            <input
                                type="text"
                                placeholder="Enter text"
                                name="middleText"
                                onChange={handleChange}
                                value={meme.middleText}
                            />
                        </label>
                    )}
                    
                    <button onClick={getRandomImage}>Get a new meme image 🖼</button>
                </div>
                <div className="meme" id="meme">
                    <img src={meme.imageUrl} crossOrigin="anonymous"/>
                    {meme.boxCount >= 2 && <span className="top">{meme.topText}</span>}
                    {meme.boxCount === 3 && <span className="middle">{meme.middleText}</span>}
                    {meme.boxCount >= 2 && <span className="bottom">{meme.bottomText}</span>}
                    {meme.boxCount === 1 && <span className="middle">{meme.middleText}</span>}
                </div>
                <button className="download-btn" onClick={downloadMeme}>Download Meme ⬇</button>
            </div>
        </main>
    )
}
