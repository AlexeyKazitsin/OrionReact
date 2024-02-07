export interface Astronaut {
    id: number,
    name: string,
    experience: string,
    age: number,
    country: string,
    sex: string,
    status: number,
    image: string,
    //percent_in: number
}

export interface User {
    id: number,
    name: string,
    email: string
}

export interface Flight {
    id: number,
    status: number,
    owner: User,
    moderator: User,
    date_created: string,
    date_formation: string,
    date_complete: string,
    mission_name: string,
    objective: string,
    is_crew_healthy: number
}

export interface Option {
    id: number,
    name: string
}