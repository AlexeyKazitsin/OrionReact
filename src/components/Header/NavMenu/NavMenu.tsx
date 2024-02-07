import "./NavMenu.sass"
import {Link} from "react-router-dom";
import {useAuth} from "../../../hooks/users/useAuth";
import {useEffect, useState} from "react";
import Hamburger from "../Hamburger/Hamburger";

const NavMenu = () => {

    const {is_authenticated, is_moderator, auth, user_name, user_email} = useAuth()

    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        auth()
    }, [])

    return (
        <div>

            <div className={"menu-wrapper " + (isOpen ? "open" : "")}>

                <Link to="/astronauts-list" className="menu-item" onClick={(e) => {setIsOpen(false)}}>
                    <span>Астронавты</span>
                </Link>

                {is_moderator &&
                    <Link to="/astronauts-table" className="menu-item" onClick={(e) => {setIsOpen(false)}}>
                        <span>Таблица астронавтов</span>
                    </Link>
                }

                {is_authenticated &&
                    <Link to="/flights" className="menu-item" onClick={(e) => {setIsOpen(false)}}>
                        <span>Полеты</span>
                    </Link>
                }

                {is_authenticated &&
                    <Link to="/profile" className="menu-item" onClick={(e) => {setIsOpen(false)}}>
                        <span>{user_email}</span>
                    </Link>
                }

                {!is_authenticated &&
                    <Link to="/login" className="menu-item" onClick={(e) => {setIsOpen(false)}}>
                        <span>Вход</span>
                    </Link>
                }

            </div>

            <Hamburger isOpen={isOpen} setIsOpen={setIsOpen} />

        </div>
    )
}

export default NavMenu;