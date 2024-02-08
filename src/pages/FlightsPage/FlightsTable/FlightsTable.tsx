import React from "react";
import "./FlightsTable.sass"
import {STATUSES, variables} from "/src/utils/consts";
import {ru} from "/src/utils/momentLocalization";
import moment from "moment";
import {useQuery} from "react-query";
import {useFlights} from "../../../hooks/flights/useFlights";
import {useCustomTable} from "../../../hooks/other/useCustomTable";
import CustomTable from "../../../components/CustomTable/CustomTable";
import {useNavigate} from "react-router-dom"
import FlightsFilters from "../FlightsFilters/FlightsFilters";
import CustomButton from "../../../components/CustomButton/CustomButton";
import {useAuth} from "../../../hooks/users/useAuth";
import {useToken} from "../../../hooks/users/useToken";
import {api} from "../../../utils/api";
import {pluralCrewHealth} from "../../../utils/utils";

const FlightsTable = () => {

    const {access_token} = useToken()

    const {is_moderator} = useAuth()

    const navigate = useNavigate()

    const {searchFlights} = useFlights()

    const columns = [
        {
            Header: "№",
            accessor: "id"
        },
        {
            Header: "Миссия",
            accessor: "mission_name",
            Cell: ({ value }) => { return value }
        },
        {
            Header: "Статус",
            accessor: "status",
            Cell: ({ value }) => { return STATUSES.find(status => status.id == value).name }
        },
        {
            Header: "Пользователь",
            accessor: "owner",
            Cell: ({ value }) => { return value.name }
        },
        {
            Header: "Дата формирования",
            accessor: "date_formation",
            Cell: ({ value }) => { return moment(value).locale(ru()).format("D MMMM HH:mm") }
        },
        {
            Header: "Результат медосмотра экипажа",
            accessor: "is_crew_healthy",
            //accessor: "crew_health",
            Cell: ({ value }) => {
                return pluralCrewHealth(value)
            }
        }
    ]

    
    const acceptFlight = async (order_id) => {

        const formData = new FormData()

        formData.append("status", "3")

        const response = await api.put(`flights/${order_id}/update_status_admin/`, formData, {
            headers: {
                'authorization': access_token
            }
        });

        if (response.status == 200) {
            refetch()
        }
    }

    const dismissFlight = async (order_id) => {

        const formData = new FormData()

        formData.append("status", "4")

        const response = await api.put(`flights/${order_id}/update_status_admin/`, formData, {
            headers: {
                'authorization': access_token
            }
        });

        if (response.status == 200) {
            refetch()
        }
    }
    
    const { isLoading, data, isSuccess, refetch } = useQuery(
        ["flights"],
        () => searchFlights(),
        {
            refetchInterval: 2000,
            refetchOnWindowFocus: false,
            cacheTime: 0,
            keepPreviousData: false,
        }
    );

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

    const handleClick = (flight_id) => {
        navigate(`/flights/${flight_id}`)
    }

    return (
        <div className="flights-table-wrapper">

            <CustomTable
                getTableBodyProps={getTableBodyProps}
                headerGroups={headerGroups}
                page={page}
                prepareRow={prepareRow}
                isLoading={isLoading}
                onClick={handleClick}
            >
                <FlightsFilters refetch={refetch}/>
            </CustomTable>

        </div>
    )
}

export default FlightsTable