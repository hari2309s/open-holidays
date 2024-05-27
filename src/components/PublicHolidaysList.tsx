import { List, ListDivider, ListItem, Typography } from '@mui/joy';
import dayjs from 'dayjs';
import React from 'react';
import { useSelector } from 'react-redux';
import { selectPublicHolidays } from '../store/features/public-holidays/publicHolidaysSlice';
import ListHeader from './ListHeader';

const PublicHolidaysList = () => {
    const publicHolidays = useSelector(selectPublicHolidays);

    return (
        <div>
            <ListHeader />
            <List
                variant="outlined"
                size="lg"
                sx={{
                    minWidth: '90vw',
                    minHeight: '400px',
                    maxHeight: '400px',
                    margin: '20px 0',
                    backgroundColor: 'white',
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
                            flexDirection: 'column',
                            padding: '10px',
                        }}
                    >
                        <div
                            style={{
                                width: '100%',
                                display: 'flex',
                                justifyContent: 'space-between',
                            }}
                        >
                            <div
                                style={{
                                    width: '500px',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <Typography sx={{ color: '#006d77' }}>
                                    {
                                        holiday.name.filter(
                                            entry => entry.language === 'EN',
                                        )[0].text
                                    }
                                </Typography>
                                <div
                                    style={{
                                        width: '200px',
                                        display: 'flex',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            color: '#006d77',
                                            fontStyle: 'italic',
                                        }}
                                    >
                                        {dayjs(holiday.startDate).format(
                                            'DD.MM.YYYY',
                                        )}
                                    </Typography>
                                    {' - '}
                                    <Typography
                                        sx={{
                                            color: '#006d77',
                                            fontStyle: 'italic',
                                        }}
                                    >
                                        {dayjs(holiday.endDate).format(
                                            'DD.MM.YYYY',
                                        )}
                                    </Typography>
                                </div>
                            </div>
                            <div
                                style={{
                                    width: '200px',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <Typography sx={{ color: '#006d77' }}>
                                    {dayjs(holiday.endDate).diff(
                                        dayjs(holiday.startDate),
                                    ) +
                                        1 +
                                        ' day(s)'}
                                </Typography>
                                <Typography sx={{ color: '#006d77' }}>
                                    {holiday.nationwide ? 'National' : 'Local'}
                                </Typography>
                            </div>
                        </div>
                        <ListDivider
                            sx={{ backgroundColor: '#006d77' }}
                            inset="gutter"
                        />
                    </ListItem>
                ))}
            </List>
        </div>
    );
};

export default PublicHolidaysList;
