import "./AstronautEditPage.sass"
import {useParams, useNavigate} from "react-router-dom";
import {useAstronaut} from "../../hooks/astronauts/useAstronaut";
import React, {useEffect, useState} from "react";
import CustomInput from "../../components/CustomInput/CustomInput";
import CustomTextarea from "../../components/CustomTextarea/CustomTextarea";
import CustomButton from "../../components/CustomButton/CustomButton";
import {api} from "../../utils/api";
import {useToken} from "../../hooks/users/useToken";
import UploadButton from "../../components/UploadButton/UploadButton";
import {variables} from "../../utils/consts";
import {useAstronauts} from "../../hooks/astronauts/useAstronauts";

const AstronautEditPage = () => {

    const navigate = useNavigate()

    const {access_token} = useToken()

    const {deleteAstronaut} = useAstronauts()

    const { id } = useParams<{id: string}>();

    const {
        astronaut,
        fetchAstronaut,
        setName,
        setExperience,
        setAge,
        setCountry,
        setSex,
        setImage
    } = useAstronaut()

    useEffect(() => {
        id && fetchAstronaut(id)
    }, [])

    const [img, setImg] = useState<File | undefined>(undefined)

    const handleFileChange = (e) => {
        if (e.target.files) {
            const img = e.target?.files[0]
            setImg(img)
            setImage(URL.createObjectURL(img))
        }
    }

    const saveAstronaut = async() => {
        let form_data = new FormData()

        form_data.append('name', astronaut.name)
        form_data.append('experience', astronaut.experience)
        form_data.append('age', astronaut.age)
        form_data.append('country', astronaut.country)
        form_data.append('sex', astronaut.sex)

        if (img != undefined) {
            form_data.append('image', img, img.name)
        }

        const response = await api.put(`astronauts/${astronaut.id}/update/`, form_data, {
            headers: {
                'content-type': 'multipart/form-data',
                'authorization': access_token
            }
        })

        if (response.status == 200) {
            setImg(undefined)
            navigate(-1)
        }
    }

    const handleDeleteAstronaut = async () => {
        await deleteAstronaut(astronaut)
        setImg(undefined)
        navigate(-1)
    }

    if (id == undefined) {
        return (
            <div>

            </div>
        )
    }

    if (astronaut == undefined) {
        return (
            <div>

            </div>
        )
    }

    return (
        <div className="edit-page-wrapper">

            <div className="left">

                <img src={astronaut.image} alt=""/>

                <UploadButton handleFileChange={handleFileChange} />

            </div>

            <div className="right">

                <div className="info-container">

                    <CustomInput placeholder="Имя" flag='astronaut' defaultValue={astronaut.name} setValue={setName} />

                    <CustomInput placeholder="Возраст" flag='astronaut' defaultValue={astronaut.age} setValue={setAge} />

                    <CustomInput placeholder="Пол"  flag='astronaut' defaultValue={astronaut.sex} setValue={setSex} />

                    <CustomInput placeholder="Страна" flag='astronaut' defaultValue={astronaut.country} setValue={setCountry} />

                    <CustomTextarea placeholder="Опыт" flag='astronaut 'defaultValue={astronaut.experience} setValue={setExperience} />

                    {/*
                    <CustomTextarea placeholder="Возраст" value={astronaut.age} setValue={setAge} />

                    <CustomTextarea placeholder="Пол" value={astronaut.sex} setValue={setSex} />

                    <CustomTextarea placeholder="Страна" value={astronaut.country} setValue={setCountry} />

                    <CustomTextarea placeholder="Опыт" value={astronaut.experience} setValue={setExperience} />
                    */}

                    <div className="buttons-container">

                        <CustomButton bg={variables.green} onClick={saveAstronaut}>
                            Сохранить
                        </CustomButton>

                        <CustomButton bg={variables.red} onClick={handleDeleteAstronaut}>
                            Удалить
                        </CustomButton>

                    </div>

                </div>

            </div>
        </div>
    )
}

export default AstronautEditPage