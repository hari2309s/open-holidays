import Table from '@mui/joy/Table';
import Sheet from '@mui/joy/Sheet';
import dayjs from 'dayjs';
import React from 'react';
import { useSelector } from 'react-redux';
import { selectSchoolHolidays } from '../store/features/school-holidays/schoolHolidaysSlice';
import { selectLanguage } from '../store/features/ui/uiSlice';
import { LanguageCode } from '../api/types';

const SchoolHolidaysList = () => {
    const schoolHolidays = useSelector(selectSchoolHolidays);
    const currentLanguage = useSelector(selectLanguage);

    return (
        <Sheet sx={{ height: '400px', overflow: 'auto', borderRadius: '5px' }}>
            <Table
                aria-label="publice-holidays-table"
                variant="outlined"
                stickyHeader
                size="lg"
                stripe="odd"
                sx={{
                    '> thead > tr > th': { textAlign: 'center' },
                }}
            >
                <thead>
                    <tr>
                        <th>
                            {currentLanguage.languageCode === LanguageCode.EN
                                ? 'Holidays'
                                : 'Ferientag'}
                        </th>
                        <th>Dates</th>
                        <th>
                            {currentLanguage.languageCode === LanguageCode.EN
                                ? 'Duration'
                                : 'Laufzeit'}
                        </th>
                        <th>
                            {currentLanguage.languageCode === LanguageCode.EN
                                ? 'Type'
                                : 'Typ'}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {schoolHolidays.map(holiday => (
                        <tr key={holiday.id}>
                            <td>{`${
                                holiday.name.filter(
                                    entry =>
                                        entry.language ===
                                        currentLanguage.languageCode,
                                )[0].text
                            }`}</td>
                            <td>
                                {dayjs(holiday.startDate).format('DD.MM.YYYY') +
                                    ' - ' +
                                    dayjs(holiday.endDate).format('DD.MM.YYYY')}
                            </td>
                            <td>
                                {dayjs(holiday.endDate).diff(
                                    dayjs(holiday.startDate),
                                    'day',
                                    true,
                                ) +
                                    1 +
                                    ' day(s)'}
                            </td>
                            <td>{holiday.nationwide ? 'National' : 'Local'}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Sheet>
    );
};

export default SchoolHolidaysList;
