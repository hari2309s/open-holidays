import React from 'react';
import { useSelector } from 'react-redux';
import { selectPublicHolidays } from '../store/features/public-holidays/publicHolidaysSlice';
import {
    Box,
    List as JoyList,
    ListDivider,
    ListItem,
    Typography,
} from '@mui/joy';
import { selectCountry, selectHolidayType } from '../store/features/ui/uiSlice';
import { HolidayType } from '../api/types';
import { selectSchoolHolidays } from '../store/features/school-holidays/schoolHolidaysSlice';

const List = () => {
    const publicHolidays = useSelector(selectPublicHolidays);
    const schoolHolidays = useSelector(selectSchoolHolidays);
    const selectedCountry = useSelector(selectCountry);
    const selectedHolidayType = useSelector(selectHolidayType);

    return (
        <Box>
            <Typography
                level="h4"
                sx={{ color: '#006d77', marginTop: '15px' }}
            >{`${selectedHolidayType} holidays in ${selectedCountry}`}</Typography>
            <JoyList
                variant="outlined"
                size="lg"
                sx={{
                    minWidth: '70vw',
                    minHeight: '400px',
                    maxHeight: '400px',
                    margin: '20px 0',
                    backgroundColor: '#006d77',
                    borderRadius: 'sm',
                    overflow: 'scroll',
                }}
            >
                {selectedHolidayType === HolidayType.PUBLIC &&
                    publicHolidays.map(holiday => (
                        <ListItem
                            key={holiday.id}
                            sx={{
                                margin: '10px',
                                display: 'flex',
                                padding: '10px',
                            }}
                        >
                            <Typography sx={{ color: '#edf6f9' }}>
                                {
                                    holiday.name.filter(
                                        entry => entry.language === 'EN',
                                    )[0].text
                                }
                            </Typography>
                            <ListDivider
                                sx={{ backgroundColor: '#edf6f9' }}
                                inset="gutter"
                            />
                        </ListItem>
                    ))}
                {selectedHolidayType === HolidayType.SCHOOL &&
                    schoolHolidays.map(holiday => (
                        <ListItem
                            key={holiday.id}
                            sx={{
                                margin: '10px',
                                display: 'flex',
                                padding: '10px',
                            }}
                        >
                            <Typography sx={{ color: '#edf6f9' }}>
                                {
                                    holiday.name.filter(
                                        entry => entry.language === 'EN',
                                    )[0].text
                                }
                            </Typography>
                            <ListDivider
                                sx={{ backgroundColor: '#edf6f9' }}
                                inset="gutter"
                            />
                        </ListItem>
                    ))}
            </JoyList>
        </Box>
    );
};

export default List;
