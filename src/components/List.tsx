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

const List = () => {
    const publicHolidays = useSelector(selectPublicHolidays);

    return (
        <Box>
            <JoyList
                variant="outlined"
                size="lg"
                sx={{
                    minWidth: '70vw',
                    maxHeight: '400px',
                    margin: '20px 0',
                    backgroundColor: '#006d77',
                    borderRadius: 'sm',
                    overflow: 'scroll',
                }}
            >
                {publicHolidays.map(holiday => (
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
