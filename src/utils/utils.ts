export const pluralCrewHealth = (value) => {
    //console.log((value))
    if (value == -1) {
        return "Неизвестны"
    } else if (value == 0) {
        return "Неуспешны"
    }

    return "Успешны"
}