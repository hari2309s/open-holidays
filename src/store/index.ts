import { configureStore } from '@reduxjs/toolkit';
import countryReducer from './features/countries/countriesSlice';
import publicHolidaysReducer from './features/public-holidays/publicHolidaysSlice';
import schoolHolidaysReducer from './features/school-holidays/schoolHolidaysSlice';
import uiReducer from './features/ui/uiSlice';

export const store = configureStore({
    reducer: {
        country: countryReducer,
        publicHolidays: publicHolidaysReducer,
        schoolHolidays: schoolHolidaysReducer,
        ui: uiReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
