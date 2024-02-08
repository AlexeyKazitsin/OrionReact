import {useEffect, useState} from "react";
import {useFlight} from "../../hooks/flights/useFlight";
import {useNavigate, useParams} from "react-router-dom"
import AstronautCard from "../../components/AstronautCard/AstronautCard";
import "./FlightPage.sass"
import {useAuth} from "../../hooks/users/useAuth";
import {STATUSES, variables} from "../../utils/consts";
import {ru} from "../../utils/momentLocalization";
import moment from "moment";
import CustomButton from "../../components/CustomButton/CustomButton";
import CustomInput from "../../components/CustomInput/CustomInput";
import CustomTextarea from "../../components/CustomTextarea/CustomTextarea";
import {pluralCrewHealth} from "../../utils/utils";
import {api} from "../../utils/api";
import {useToken} from "../../hooks/users/useToken";

const FlightPage = () => {

    const {is_moderator} = useAuth()

    const navigate = useNavigate()

    const { id } = useParams<{id: string}>();

    const {flight, mission_name, objective, setMissionName, setObjective, fetchFlight, saveFlight, sendFlight, deleteFlight, setFlight, setAstronautValue} = useFlight()

    useEffect(() => {
        id && fetchFlight(id)
        
        return () => {
            setFlight(undefined)
            setMissionName(undefined)
            setObjective(undefined)
        };
    }, [])

    if (id == undefined || flight == undefined)
    {
        return (
            <div className="flight-page-wrapper">
                <h1>Пусто</h1>
            </div>
        )
    }

    const onSendFlight = async() => {
        await saveFlight()
        await sendFlight()
        navigate("/flights")
    }

    const onDeleteFlight = async () => {
        await deleteFlight()
        navigate("/")
    }

    /*const onSaveFlight = async () => {
        /*flight.astronauts.forEach(astronaut => {
            updateValue(astronaut.id, astronaut.percent_in)
        })

        await saveFlight()
    }*/

    //const {access_token} = useToken()


    const cards = flight.astronauts.map(astronaut  => (
        //<AstronautCard astronaut={astronaut} key={astronaut.id} setValue={setAstronautValue}/>
        <AstronautCard astronaut={astronaut} key={astronaut.id}/>
    ))

    const ButtonsContainer = () => {
        return (
            <div className="buttons-wrapper">

                <CustomButton onClick={saveFlight} bg={variables.green}>Сохранить</CustomButton>

                <CustomButton onClick={onSendFlight} bg={variables.primary}>Отправить</CustomButton>

                <CustomButton onClick={onDeleteFlight} bg={variables.red}>Удалить</CustomButton>

            </div>
        )
    }

    const is_draft = flight.status == 1

    const completed = [3, 4].includes(flight.status)

    return (
        <div className="flight-page-wrapper">

            <div className="flight-astronauts-wrapper">
                <div className="top">
                    <h3>{is_draft ? "Новый полет" : flight.mission_name}</h3>
                </div>

                <div className="flight-info-container">
                    <span>Статус: {STATUSES.find(status => status.id == flight.status).name}</span>
                    <span>Дата создания: {moment(flight.date_created).locale(ru()).format("D MMMM HH:mm")}</span>
                    {[2, 3, 4].includes(flight.status) && <span>Дата формирования: {moment(flight.date_formation).locale(ru()).format("D MMMM HH:mm")}</span>}
                    {completed && <span>Дата завершения: {moment(flight.date_complete).locale(ru()).format("D MMMM HH:mm")}</span> }
                    {is_moderator && <span>Оператор: {flight.owner.name}</span> }
                    {[2, 3, 4].includes(flight.status) && <span>Результат медосмотра: {pluralCrewHealth(flight.is_crew_healthy)}</span>}
                </div>

                <div className="inputs-container">

                    <CustomInput placeholder="Название миссии" flag='flight' defaultValue={flight.mission_name} setValue={setMissionName} disabled={!is_draft}  />
                    <CustomTextarea placeholder="Цель" flag='flight' defaultValue={flight.objective} setValue={setObjective} disabled={!is_draft}  />

                </div>

                <div className="title">
                    <h3>Астронавты</h3>
                </div>

                <div className="bottom">

                    {cards}

                </div>
            </div>

            {!is_moderator && is_draft && <ButtonsContainer />}

        </div>
    )
}

export default FlightPage