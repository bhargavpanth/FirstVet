
export interface Schedule {
    scheduleId: Number
    startDate: String
    startTime: String
    endDate: String
    endTime: String
    startBreak: String,
    endBreak: String,
    startBreak2: String
    endBreak2: String
    startBreak3: String,
    endBreak3: String
    startBreak4: String,
    endBreak4: String
    employeeId: Number,
    employeeName: String
}

export interface AvailableHoursSchedule {
    scheduleId: Number
    employeeId: Number
    employeeName: String
    availableHours: Array<AvailableHours>
}

export interface WorkingHours {
    start: {
        date: String
        time: String
    }
    end: {
        date: String
        time: String
    }
}

export interface Break {
    start: String
    end: String
}

export interface AvailableHours {
    start: Date
    end: Date
}

