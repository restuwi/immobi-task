import momment from 'moment'

export const convertDate = (date) => {
    return momment(date).format('ll')
}