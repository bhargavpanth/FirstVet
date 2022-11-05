"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAvailableHours = exports.fetchBreaks = exports.isValidBreak = void 0;
const isValidBreak = (breakSchedule) => !((breakSchedule.start === '00:00:00') ||
    (breakSchedule.end === '00:00:00'));
exports.isValidBreak = isValidBreak;
const fetchBreaks = (schedule) => {
    return [
        { start: schedule.startBreak, end: schedule.endBreak },
        { start: schedule.startBreak2, end: schedule.endBreak2 },
        { start: schedule.startBreak3, end: schedule.endBreak3 },
        { start: schedule.startBreak4, end: schedule.endBreak4 },
    ];
};
exports.fetchBreaks = fetchBreaks;
const getAvailableHours = (workingHours) => {
    return ({
        start: new Date(`${workingHours.start.date} ${workingHours.start.time}`),
        end: new Date(`${workingHours.end.date} ${workingHours.end.time}`)
    });
};
exports.getAvailableHours = getAvailableHours;
