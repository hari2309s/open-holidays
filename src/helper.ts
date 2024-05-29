/* eslint-disable @typescript-eslint/no-explicit-any */
import { Holiday, ISchoolHoliday } from './api/types';

export const normalizeSchoolHolidays = (
    schoolHolidays: ISchoolHoliday[],
): ISchoolHoliday[] => {
    const groupedByHolidays = groupByHoliday(
        schoolHolidays,
        Holiday.CHRISTMAS_HOLIDAYS,
    );

    return groupedByHolidays.length > 0
        ? groupByDates(groupedByHolidays)
        : schoolHolidays;
};

export const groupByHoliday = (
    schoolHolidays: ISchoolHoliday[],
    holiday: Holiday,
): ISchoolHoliday[] => {
    return schoolHolidays.filter(schoolHoliday => {
        return (
            schoolHoliday.name.filter(item => item.language === 'EN')[0]
                .text === holiday
        );
    });
};

export const groupByDates = (
    schoolHolidays: ISchoolHoliday[],
): ISchoolHoliday[] => {
    const firstEndDate = schoolHolidays[0].endDate;
    const lastEndDate = schoolHolidays[schoolHolidays.length - 1].endDate;

    const groupedHolidays: ISchoolHoliday[] = [
        { ...schoolHolidays[0], endDate: firstEndDate },
        { ...schoolHolidays[schoolHolidays.length - 1], endDate: lastEndDate },
    ];

    return groupedHolidays;
};
