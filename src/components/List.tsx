import React from 'react';
import { useSelector } from 'react-redux';
import { Box, Typography } from '@mui/joy';
import { selectCountry, selectHolidayType } from '../store/features/ui/uiSlice';
import { HolidayType } from '../api/types';
import PublicHolidaysList from './PublicHolidaysList';
import SchoolHolidaysList from './SchoolHolidaysList';

const List = () => {
    const selectedCountry = useSelector(selectCountry);
    const selectedHolidayType = useSelector(selectHolidayType);

    return (
        <Box>
            <Typography
                level="h4"
                sx={{ color: '#006d77', marginTop: '15px' }}
            >{`${selectedHolidayType} holidays in ${selectedCountry}`}</Typography>
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
