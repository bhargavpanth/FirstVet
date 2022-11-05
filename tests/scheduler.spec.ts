import expect from 'expect.js'
import moment from 'moment'
import { scheduleParser } from '../src'

describe('Unit tests', () => {
    describe('Parses a record with no breaks', () => {
        const schedule = [{
            "scheduleId": 4715,
            "startDate": "2020-04-29",
            "startTime": "18:00:00",
            "endDate": "2020-04-29",
            "endTime": "22:00:00",
            "startBreak": "00:00:00",
            "endBreak": "00:00:00",
            "startBreak2": "00:00:00",
            "endBreak2": "00:00:00",
            "startBreak3": "00:00:00",
            "endBreak3": "00:00:00",
            "startBreak4": "00:00:00",
            "endBreak4": "00:00:00",
            "employeeId": 4714,
            "employeeName": "Jane Doe"
        }]
        let result = null
        before(() => {
            result = scheduleParser(schedule)
        })
        it('creates only sixteen schedules', () => {
            expect(result.length).to.equal(16)
        })
    })

    describe('Parses a record with one 30 minute break', () => {
        const schedule = [{
            "scheduleId": 4715,
            "startDate": "2020-04-29",
            "startTime": "18:00:00",
            "endDate": "2020-04-29",
            "endTime": "22:00:00",
            "startBreak": "20:00:00",
            "endBreak": "20:30:00",
            "startBreak2": "00:00:00",
            "endBreak2": "00:00:00",
            "startBreak3": "00:00:00",
            "endBreak3": "00:00:00",
            "startBreak4": "00:00:00",
            "endBreak4": "00:00:00",
            "employeeId": 4714,
            "employeeName": "Jane Doe"
        }]
        let result = null
        before(() => {
            result = scheduleParser(schedule)
        })
        it('creates only fourteen schedules', () => {
            expect(result.length).to.equal(14)
        })
    })

    describe('Parses a record with two 30 minute breaks', () => {
        const schedule = [{
            "scheduleId": 4715,
            "startDate": "2020-04-29",
            "startTime": "18:00:00",
            "endDate": "2020-04-29",
            "endTime": "22:00:00",
            "startBreak": "20:00:00",
            "endBreak": "20:30:00",
            "startBreak2": "21:00:00",
            "endBreak2": "21:30:00",
            "startBreak3": "00:00:00",
            "endBreak3": "00:00:00",
            "startBreak4": "00:00:00",
            "endBreak4": "00:00:00",
            "employeeId": 4714,
            "employeeName": "Jane Doe"
        }]
        let result = null
        before(() => {
            result = scheduleParser(schedule)
        })
        it('creates only twelve schedules', () => {
            expect(result.length).to.equal(12)
        })
    })

    describe('Parses a record with three 30 minute breaks', () => {
        const schedule = [{
            "scheduleId": 4715,
            "startDate": "2020-04-29",
            "startTime": "18:00:00",
            "endDate": "2020-04-29",
            "endTime": "22:00:00",
            "startBreak": "20:00:00",
            "endBreak": "20:30:00",
            "startBreak2": "21:00:00",
            "endBreak2": "21:30:00",
            "startBreak3": "21:30:00",
            "endBreak3": "22:00:00",
            "startBreak4": "00:00:00",
            "endBreak4": "00:00:00",
            "employeeId": 4714,
            "employeeName": "Jane Doe"
        }]
        let result = null
        before(() => {
            result = scheduleParser(schedule)
        })
        it('creates only ten schedules', () => {
            expect(result.length).to.equal(10)
        })
    })

    describe('Parses a record with four 30 minute breaks', () => {
        const schedule = [{
            "scheduleId": 4715,
            "startDate": "2020-04-29",
            "startTime": "18:00:00",
            "endDate": "2020-04-29",
            "endTime": "22:00:00",
            "startBreak": "19:00:00",
            "endBreak": "19:30:00",
            "startBreak2": "20:00:00",
            "endBreak2": "20:30:00",
            "startBreak3": "21:00:00",
            "endBreak3": "21:30:00",
            "startBreak4": "21:30:00",
            "endBreak4": "22:00:00",
            "employeeId": 4714,
            "employeeName": "Jane Doe"
        }]
        let result = null
        before(() => {
            result = scheduleParser(schedule)
        })
        it('creates only eight schedules', () => {
            expect(result.length).to.equal(8)
        })
    })

    describe('Parses multiple records', () => {
        const schedule = [
            {
                "scheduleId": 4711,
                "startDate": "2020-04-29",
                "startTime": "10:00:00",
                "endDate": "2020-04-29",
                "endTime": "14:30:00",
                "startBreak": "12:00:00",
                "endBreak": "12:30:00",
                "startBreak2": "00:00:00",
                "endBreak2": "00:00:00",
                "startBreak3": "00:00:00",
                "endBreak3": "00:00:00",
                "startBreak4": "00:00:00",
                "endBreak4": "00:00:00",
                "employeeId": 4712,
                "employeeName": "John Doe"
            },
            {
                "scheduleId": 4713,
                "startDate": "2020-04-29",
                "startTime": "10:00:00",
                "endDate": "2020-04-29",
                "endTime": "16:35:00",
                "startBreak": "10:30:00",
                "endBreak": "12:30:00",
                "startBreak2": "16:00:00",
                "endBreak2": "16:15:00",
                "startBreak3": "00:00:00",
                "endBreak3": "00:00:00",
                "startBreak4": "00:00:00",
                "endBreak4": "00:00:00",
                "employeeId": 4714,
                "employeeName": "Jane Doe"
            },
            {
                "scheduleId": 4715,
                "startDate": "2020-04-29",
                "startTime": "18:00:00",
                "endDate": "2020-04-29",
                "endTime": "22:10:00",
                "startBreak": "19:00:00",
                "endBreak": "19:30:00",
                "startBreak2": "00:00:00",
                "endBreak2": "00:00:00",
                "startBreak3": "00:00:00",
                "endBreak3": "00:00:00",
                "startBreak4": "00:00:00",
                "endBreak4": "00:00:00",
                "employeeId": 4714,
                "employeeName": "Jane Doe"
            }
        ]
        let result = null
        before(() => {
            result = scheduleParser(schedule)
        })
        it('creates only fourty seven schedules', () => {
            expect(result.length).to.equal(47)
        })
    })

    describe('When parsing multiple schdule', () => {
        const schdule = [{
            "scheduleId": 4715,
            "startDate": "2020-04-29",
            "startTime": "18:15:00",
            "endDate": "2020-04-29",
            "endTime": "18:30:00",
            "startBreak": "00:00:00",
            "endBreak": "00:00:00",
            "startBreak2": "00:00:00",
            "endBreak2": "00:00:00",
            "startBreak3": "00:00:00",
            "endBreak3": "00:00:00",
            "startBreak4": "00:00:00",
            "endBreak4": "00:00:00",
            "employeeId": 4714,
            "employeeName": "Jane Doe"
        }, {
            "scheduleId": 4715,
            "startDate": "2020-04-29",
            "startTime": "18:00:00",
            "endDate": "2020-04-29",
            "endTime": "18:15:00",
            "startBreak": "00:00:00",
            "endBreak": "00:00:00",
            "startBreak2": "00:00:00",
            "endBreak2": "00:00:00",
            "startBreak3": "00:00:00",
            "endBreak3": "00:00:00",
            "startBreak4": "00:00:00",
            "endBreak4": "00:00:00",
            "employeeId": 4714,
            "employeeName": "John Doe"
        }]
        let result = null
        before(() => {
            result = scheduleParser(schdule)
        })
        it('ensures the relative choronological ordering is maintained', () => {
            expect(result[0].name).to.equal('John Doe')
            expect(result[1].name).to.equal('Jane Doe')

            expect(moment(result[0].start).toDate()).to.eql(moment('2020-04-29 18:00:00').toDate())
            expect(moment(result[0].end).toDate()).to.eql(moment('2020-04-29 18:15:00').toDate())

            expect(moment(result[1].start).toDate()).to.eql(moment('2020-04-29 18:15:00').toDate())
            expect(moment(result[1].end).toDate()).to.eql(moment('2020-04-29 18:30:00').toDate())
        })
    })
})
