import moment from 'moment'
import { Schedule, AvailableHoursSchedule, WorkingHours, Break, AvailableHours } from './interface'
import { fetchBreaks, getAvailableHours, isValidBreak } from './utils'

export const scheduleParser = (schedules: Array<Schedule>) => {
    const splitAvailabilityByFifteenMinuteSlots = splitAvailabilityBy(15)
    return schedules
        .map(fetchAvailableHours)
        .map(veterinarianInfo => ({
            scheduleId: veterinarianInfo.scheduleId,
            employeeId: veterinarianInfo.employeeId,
            employeeName: veterinarianInfo.employeeName,
            availableHours: veterinarianInfo.availableHours.flatMap(splitAvailabilityByFifteenMinuteSlots)
        }))
        .flatMap(veterinarianInfo =>
            veterinarianInfo.availableHours.map(hours => ({
                name: veterinarianInfo.employeeName,
                start: hours.start,
                end: hours.end
            }))
        )
        .sort((scheduleOne, scheduleTwo) => scheduleOne.start - scheduleTwo.start)
}

const fetchAvailableHours = (schedule: Schedule): AvailableHoursSchedule => {
    const validBreaks = fetchBreaks(schedule).filter(isValidBreak)
    const workingHours: WorkingHours = {
        start: {
            date: schedule.startDate,
            time: schedule.startTime
        },
        end: {
            date: schedule.endDate,
            time: schedule.endTime
        }
    }

    const availableHours = validBreaks && validBreaks.length ?
        generateAvailableHours(workingHours, validBreaks) :
        [getAvailableHours(workingHours)]
    
    return ({
        scheduleId: schedule.scheduleId,
        employeeId: schedule.employeeId,
        employeeName: schedule.employeeName,
        availableHours
    })
}

const generateAvailableHours = (
    workingHours: WorkingHours,
    scheduledBreaks: Array<Break>
): Array<AvailableHours> => {
    let availableHours = []
    let startingDate = new Date(`${workingHours.start.date} ${workingHours.start.time}`)
    for(const scheduleBreak of scheduledBreaks) {
        availableHours.push({
            start: startingDate,
            end: new Date(`${workingHours.start.date} ${scheduleBreak.start}`)
        })
        startingDate = new Date(`${workingHours.start.date} ${scheduleBreak.end}`)
    }
    availableHours.push({
        start: startingDate,
        end: new Date(`${workingHours.end.date} ${workingHours.end.time}`)
    })
    return availableHours
}

const splitAvailabilityBy = (min) => (availableHours: AvailableHours) => {
    let splitTime = []
    let startTime = moment(availableHours.start)
    let timeAheadByNMinutes = moment(startTime).add(min, 'minute')

    while(timeAheadByNMinutes <= moment(availableHours.end)) {
        splitTime.push({
            start: startTime,
            end: timeAheadByNMinutes
        })
        startTime = timeAheadByNMinutes
        timeAheadByNMinutes = moment(timeAheadByNMinutes).add(min, 'minute')
    }

    return splitTime
}

