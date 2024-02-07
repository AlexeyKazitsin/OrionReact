import "./AstronautCard.sass"
import {Astronaut} from "../../../utils/types";
import {Link} from "react-router-dom";
import mockImage from "/src/assets/mock.png"


const AstronautCard = ({ astronaut, isMock }: {astronaut:Astronaut, isMock:boolean }) => {


    return (
        <div className="card-wrapper">

            <div className="preview">
                <img src={isMock ? mockImage : astronaut.image}  alt=""/>
            </div>

            <div className="card-content">

                <div className="content-top">

                    <h3 className="title">Имя: {astronaut.name}</h3>
                    <h3 className="title">Пол: {astronaut.sex}</h3>
                    <h3 className="title">Возраст: {astronaut.age}</h3>

                </div>

                <div className="content-bottom">

                    <Link to={`/astronauts/${astronaut.id}`}>
                        Подробнее
                    </Link>

                </div>

            </div>

        </div>
    )
}

export default AstronautCard;