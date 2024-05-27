import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { HolidayType } from '../../../api/types';
import { RootState } from '../..';

interface UiState {
    country: string;
    holidayType: string;
}

const initialState: UiState = {
    country: 'Germany',
    holidayType: HolidayType.PUBLIC,
};

export const UiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        setCountry: (state, action: PayloadAction<string>) => {
            state.country = action.payload;
        },
        setHolidayType: (state, action: PayloadAction<string>) => {
            state.holidayType = action.payload;
        },
    },
});

export const selectCountry = (state: RootState) => state.ui.country;
export const selectHolidayType = (state: RootState) => state.ui.holidayType;

export const { setCountry, setHolidayType } = UiSlice.actions;

export default UiSlice.reducer;
