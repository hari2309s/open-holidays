import { configureStore } from '@reduxjs/toolkit';
import countryReducer from './features/countries/countriesSlice';
import holidaysReducer from './features/public-holidays/publicHolidaysSlice';

export const store = configureStore({
    reducer: {
        country: countryReducer,
        publicHolidays: holidaysReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
