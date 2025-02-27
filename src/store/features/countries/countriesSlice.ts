import {
    PayloadAction,
    SerializedError,
    createAsyncThunk,
    createSlice,
} from '@reduxjs/toolkit';
import { getCountries as getCountriesAPI } from '../../../api';
import { ICountry } from '../../../api/types';
import { RootState } from '../..';

interface CountriesState {
    countries: ICountry[];
    loading: boolean;
    error: Error | SerializedError | null;
}

const initialState: CountriesState = {
    countries: [],
    loading: false,
    error: null,
};

export const getCountries = createAsyncThunk(
    'countries/getCountries',
    async (_, { rejectWithValue }) => {
        try {
            const response = await getCountriesAPI();
            return response as ICountry[];
        } catch (error) {
            return rejectWithValue(error);
        }
    },
);

export const countriesSlice = createSlice({
    name: 'countries',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(
                getCountries.fulfilled,
                (state, action: PayloadAction<ICountry[]>) => {
                    state.countries = action.payload;
                    state.loading = false;
                    state.error = null;
                },
            )
            .addCase(getCountries.pending, state => {
                state.countries = [];
                state.loading = true;
                state.error = null;
            })
            .addCase(
                getCountries.rejected,
                (
                    state,
                    action: PayloadAction<
                        unknown,
                        string,
                        never,
                        SerializedError
                    >,
                ) => {
                    state.countries = [];
                    state.loading = false;
                    state.error = action.error;
                },
            );
    },
});

export const selectCountries = (state: RootState) => state.country.countries;
export const selectCountriesLoading = (state: RootState) =>
    state.country.loading;
export const selectCountriesError = (state: RootState) => state.country.error;

export default countriesSlice.reducer;
