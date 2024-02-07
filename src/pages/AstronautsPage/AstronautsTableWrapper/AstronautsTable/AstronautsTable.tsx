import CustomTable from "../../../../components/CustomTable/CustomTable";
import {useCustomTable} from "../../../../hooks/other/useCustomTable";
import {useNavigate } from "react-router-dom";
import AstronautsFilters from "../../AstronautsFilters/AstronautsFilters";

const AstronautsTable = ({isLoading, data, isSuccess, refetch}) => {

    const columns = [
        {
            Header: "№",
            accessor: "id"
        },
        {
            Header: "Имя",
            accessor: "name",
            Cell: ({ value }) => { return value }
        },
        {
            Header: "Фото",
            accessor: "image",
            Cell: ({ value }) => {  return <img src={value} style={{ width: '100px', height: 'auto', display: 'block', margin: '0 auto ', borderRadius: '15px'}} alt="Изображение" />; }
        },
        {
            Header: "Возраст",
            accessor: "age",
            Cell: ({ value }) => { return value }
        },
        {
            Header: "Пол",
            accessor: "sex",
            Cell: ({ value }) => { return value }
        },
        {
            Header: "Страна",
            accessor: "country",
            Cell: ({ value }) => { return value }
        }
    ]

    const navigate = useNavigate()

    const {
        getTableBodyProps,
        headerGroups,
        page,
        prepareRow
    } = useCustomTable(
        columns,
        isSuccess,
        data
    )

    const openEditCityPage = (astronaut_id) => {
        navigate(`/astronauts/${astronaut_id}/edit`)
    }

    return (
        <div>

            <CustomTable
                getTableBodyProps={getTableBodyProps}
                headerGroups={headerGroups}
                page={page}
                prepareRow={prepareRow}
                isLoading={isLoading}
                onClick={openEditCityPage}
            >
                <AstronautsFilters refetch={refetch} />
            </CustomTable>

        </div>

    )
}

export default AstronautsTable