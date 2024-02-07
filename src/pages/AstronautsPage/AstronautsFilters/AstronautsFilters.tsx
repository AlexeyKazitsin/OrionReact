import "./AstronautsFilters.sass"
import SearchBar from "../../../components/SearchBar/SearchBar";
import {useAstronauts} from "../../../hooks/astronauts/useAstronauts";
import {useAuth} from "../../../hooks/users/useAuth";
import LinkButton from "../../../components/LinkButton/LinkButton";
import {variables} from "../../../utils/consts";
import CustomButton from "../../../components/CustomButton/CustomButton";

import SexFilter from "../../../components/SearchBar/SexFilter";

const AstronautsFilters = ({refetch}) => {

    const {is_moderator} = useAuth()

    const {query, setQuery} = useAstronauts()

    const {sexquery, setSexQuery} = useAstronauts()

    const handleSubmit = (e) => {
        e.preventDefault()
        refetch()
    }

    return (
        <div className="astronauts-filters">

            <h2>Поиск астронавтов</h2>

            <div className="right-container" >

                {is_moderator &&
                    <LinkButton to="/astronauts/add" bg={variables.primary}>
                        Добавить астронавта
                    </LinkButton>
                }

                <form className="search-form" onSubmit={handleSubmit}>
                    <SexFilter sexquery={sexquery} setSexQuery={setSexQuery}/>
                    <SearchBar query={query} setQuery={setQuery} placeholder={"Поиск по имени..."} />

                    <CustomButton bg={variables.primary} >
                        Применить
                    </CustomButton>

                </form>

            </div>
        </div>
    )
}

export default AstronautsFilters