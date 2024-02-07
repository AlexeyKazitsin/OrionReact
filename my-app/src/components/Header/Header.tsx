import "./Header.sass"
import NavMenu from "./NavMenu/NavMenu";
import logoImage from "/src/assets/logo.png"


const Header = () => {
    return (
        <div className="header-wrapper">
            <div className="left-container">
                
                <h3>Полеты "Орион"</h3>
            </div>

            <div className="right-container">
                <NavMenu/>
            </div>

        </div>
    )
}

export default Header;