import { Break, Schedule, WorkingHours } from './interface'

export const isValidBreak = (breakSchedule: Break): Boolean => !(
    (breakSchedule.start === '00:00:00') ||
    (breakSchedule.end === '00:00:00')
)

export const fetchBreaks = (schedule: Schedule): Array<Break> => {
    return [
        { start: schedule.startBreak, end: schedule.endBreak },
        { start: schedule.startBreak2, end: schedule.endBreak2 },
        { start: schedule.startBreak3, end: schedule.endBreak3 },
        { start: schedule.startBreak4, end: schedule.endBreak4 },
    ]
}

export const getAvailableHours = (workingHours: WorkingHours) => {
    return ({
        start: new Date(`${workingHours.start.date} ${workingHours.start.time}`),
        end: new Date(`${workingHours.end.date} ${workingHours.end.time}`)
    })
}