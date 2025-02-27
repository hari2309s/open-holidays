import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import {
    selectCountry,
    selectHolidayType,
    selectLanguage,
} from '../store/features/ui/uiSlice';
import { HolidayType, LanguageCode } from '../api/types';
import PublicHolidaysList from './PublicHolidaysList';
import SchoolHolidaysList from './SchoolHolidaysList';

const List = () => {
    const selectedCountry = useSelector(selectCountry);
    const selectedHolidayType = useSelector(selectHolidayType);
    const currentLanguage = useSelector(selectLanguage);

    const [translatedHolidayType, setTranslatedHolidayType] =
        useState<string>('');

    useEffect(() => {
        setTranslatedHolidayType(
            selectedHolidayType === HolidayType.PUBLIC
                ? currentLanguage.languageCode === LanguageCode.EN
                    ? 'Public holidays'
                    : 'Feiertage'
                : currentLanguage.languageCode === LanguageCode.EN
                  ? 'School holidays'
                  : 'Schulferien',
        );
    }, [currentLanguage, selectedHolidayType]);

    return (
        <Box>
            <Typography
                data-testid="list-header"
                level="h4"
                sx={{ color: '#006d77', margin: '30px 0' }}
            >{`${translatedHolidayType} in ${selectedCountry}`}</Typography>
            {selectedHolidayType === HolidayType.PUBLIC && (
                <PublicHolidaysList />
            )}
            {selectedHolidayType === HolidayType.SCHOOL && (
                <SchoolHolidaysList />
            )}
        </Box>
    );
};

export default List;
