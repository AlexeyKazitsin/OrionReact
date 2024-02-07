import "./AstronautAddPage.sass"
import CustomInput from "../../components/CustomInput/CustomInput";
import CustomTextarea from "../../components/CustomTextarea/CustomTextarea";
import CustomButton from "../../components/CustomButton/CustomButton";
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import mock from "/src/assets/default.png"
import {api} from "../../utils/api";
import {useToken} from "../../hooks/users/useToken";
import UploadButton from "../../components/UploadButton/UploadButton";
import {variables} from "../../utils/consts";

const AstronautAddPage = () => {

    const {access_token} = useToken()

    const navigate = useNavigate()

    const [name, setName] = useState("")
    const [experience, setExperience] = useState("")
    const [age, setAge] = useState("")
    const [country, setCountry] = useState("")
    const [sex, setSex] = useState("")

    const [imgFile, setImgFile] = useState<File | undefined>()
    const [imgURL, setImgURL] = useState<string | undefined>(mock)

    const handleFileChange = (e) => {
        if (e.target.files) {
            const img = e.target?.files[0]
            setImgFile(img)
            setImgURL(URL.createObjectURL(img))
        }
    }

    const addAstronaut = async () => {

        const response = await api.post(`astronauts/create/`, {}, {
            headers: {
                'authorization': access_token
            }
        })


        if (response.status == 200){
            const astronaut_id = response.data["id"]
            await updateAstronaut(astronaut_id)
        }


    }

    const updateAstronaut = async (astronaut_id) => {

        const form_data = new FormData()

        form_data.append('name', name)
        form_data.append('experience', experience)
        //console.log((/^-?\d+\.?\d*$/.test(age)))
        if (/^-?\d+\.?\d*$/.test(age)){
            form_data.append('age', age)
        }
        form_data.append('country', country)
        form_data.append('sex', sex)

        if (imgFile != undefined) {
            form_data.append('image', imgFile, imgFile.name)
        }

        const response = await api.put(`astronauts/${astronaut_id}/update/`, form_data, {
            headers: {
                'content-type': 'multipart/form-data',
                'authorization': access_token
            }
        })

        if (response.status == 200){
            navigate(-1)
        }

    }


    return (
        <div className="add-page-wrapper">
            <div className="left">

                <img src={imgURL} alt=""/>

                <UploadButton handleFileChange={handleFileChange} />

            </div>

            <div className="right">

                <div className="info-container">

                    <CustomInput placeholder="Имя" defaultValue={name} setValue={setName} />

                    <CustomInput placeholder="Возраст" defaultValue={age} setValue={setAge} />

                    <CustomInput placeholder="Пол" defaultValue={sex} setValue={setSex} />

                    <CustomInput placeholder="Страна" defaultValue={country} setValue={setCountry} />

                    <CustomTextarea placeholder="Опыт" defaultValue={experience} setValue={setExperience} />
                    
                    {/*
                    <CustomTextarea placeholder="Возраст" value={age} setValue={setAge} />

                    <CustomTextarea placeholder="Пол" value={sex} setValue={setSex} />

                    <CustomTextarea placeholder="Страна" value={country} setValue={setCountry} />

                    <CustomTextarea placeholder="Опыт" value={experience} setValue={setExperience} />
                    */}
                    <div className="buttons-container">

                        <CustomButton bg={variables.green} onClick={addAstronaut}>
                            Создать
                        </CustomButton>

                    </div>

                </div>

            </div>
        </div>
    )
}

export default AstronautAddPage