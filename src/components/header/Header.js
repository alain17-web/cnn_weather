import '../header/Header.css'

const Header = () => {
    return (
        <div className="headerContainer">
            <div className="title">
                <img src="/img/CNN.png" alt="cnn logo" />
                <h1>World Weather</h1>
                <span className='border'></span>
                <h2>Forecast Highs/Lows</h2>
            </div>
        </div>
    )
}

export default Header
