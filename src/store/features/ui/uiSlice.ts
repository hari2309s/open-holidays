import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import {
    HolidayType,
    ILanguage,
    LanguageCode,
    LanguageText,
} from '../../../api/types';
import { RootState } from '../..';

interface UiState {
    country: string;
    holidayType: string;
    language: ILanguage;
}

const initialState: UiState = {
    country: 'Germany',
    holidayType: HolidayType.PUBLIC,
    language: { languageCode: LanguageCode.EN, languageText: LanguageText.EN },
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
        setLanguage: (state, action: PayloadAction<ILanguage>) => {
            state.language = action.payload;
        },
    },
});

export const selectCountry = (state: RootState) => state.ui.country;
export const selectHolidayType = (state: RootState) => state.ui.holidayType;
export const selectLanguage = (state: RootState) => state.ui.language;

export const { setCountry, setHolidayType, setLanguage } = UiSlice.actions;

export default UiSlice.reducer;
