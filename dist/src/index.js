"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.scheduleParser = void 0;
const moment_1 = __importDefault(require("moment"));
const utils_1 = require("./utils");
const scheduleParser = (schedules) => {
    const splitAvailabilityByFifteenMinuteSlots = splitAvailabilityBy(15);
    return schedules
        .map(fetchAvailableHours)
        .map(veterinarianInfo => ({
        scheduleId: veterinarianInfo.scheduleId,
        employeeId: veterinarianInfo.employeeId,
        employeeName: veterinarianInfo.employeeName,
        availableHours: veterinarianInfo.availableHours.map(splitAvailabilityByFifteenMinuteSlots).flat(1)
    }))
        .map(veterinarianInfo => veterinarianInfo.availableHours.map(hours => ({
        name: veterinarianInfo.employeeName,
        start: hours.start,
        end: hours.end
    }))).flat(1)
        .sort((scheduleOne, scheduleTwo) => scheduleOne.start - scheduleTwo.start);
};
exports.scheduleParser = scheduleParser;
const fetchAvailableHours = (schedule) => {
    const validBreaks = (0, utils_1.fetchBreaks)(schedule).filter(utils_1.isValidBreak);
    const workingHours = {
        start: {
            date: schedule.startDate,
            time: schedule.startTime
        },
        end: {
            date: schedule.endDate,
            time: schedule.endTime
        }
    };
    const availableHours = validBreaks && validBreaks.length ?
        generateAvailableHours(workingHours, validBreaks) :
        [(0, utils_1.getAvailableHours)(workingHours)];
    return ({
        scheduleId: schedule.scheduleId,
        employeeId: schedule.employeeId,
        employeeName: schedule.employeeName,
        availableHours
    });
};
const generateAvailableHours = (workingHours, scheduledBreaks) => {
    let availableHours = [];
    let startingDate = new Date(`${workingHours.start.date} ${workingHours.start.time}`);
    for (const scheduleBreak of scheduledBreaks) {
        availableHours.push({
            start: startingDate,
            end: new Date(`${workingHours.start.date} ${scheduleBreak.start}`)
        });
        startingDate = new Date(`${workingHours.start.date} ${scheduleBreak.end}`);
    }
    availableHours.push({
        start: startingDate,
        end: new Date(`${workingHours.end.date} ${workingHours.end.time}`)
    });
    return availableHours;
};
const splitAvailabilityBy = (min) => (availableHours) => {
    let splitTime = [];
    let startTime = (0, moment_1.default)(availableHours.start);
    let timeAheadByNMinutes = (0, moment_1.default)(startTime).add(min, 'minute');
    while (timeAheadByNMinutes <= (0, moment_1.default)(availableHours.end)) {
        splitTime.push({
            start: startTime,
            end: timeAheadByNMinutes
        });
        startTime = timeAheadByNMinutes;
        timeAheadByNMinutes = (0, moment_1.default)(timeAheadByNMinutes).add(min, 'minute');
    }
    return splitTime;
};
