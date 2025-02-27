import {
    PayloadAction,
    SerializedError,
    createAsyncThunk,
    createSlice,
} from '@reduxjs/toolkit';
import { IPublicHoliday, IHolidaysRequestPayload } from '../../../api/types';
import { getPublicHolidays as getPublicHolidaysAPI } from '../../../api';
import { RootState } from '../..';

interface PublicHolidaysState {
    publicHolidays: IPublicHoliday[];
    loading: boolean;
    error: Error | SerializedError | null;
}

const initialState: PublicHolidaysState = {
    publicHolidays: [],
    loading: false,
    error: null,
};

export const getPublicHolidays = createAsyncThunk(
    'publicHolidays/getPublicHolidays',
    async (
        { countryIsoCode, validFrom, validTo }: IHolidaysRequestPayload,
        { rejectWithValue },
    ) => {
        try {
            const response = await getPublicHolidaysAPI({
                countryIsoCode,
                validFrom,
                validTo,
            });
            return response as IPublicHoliday[];
        } catch (error) {
            return rejectWithValue(error);
        }
    },
);

export const publicHolidaysSlice = createSlice({
    name: 'publicHolidays',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(
                getPublicHolidays.fulfilled,
                (state, action: PayloadAction<IPublicHoliday[]>) => {
                    state.publicHolidays = action.payload;
                    state.loading = false;
                    state.error = null;
                },
            )
            .addCase(getPublicHolidays.pending, state => {
                state.publicHolidays = [];
                state.loading = true;
                state.error = null;
            })
            .addCase(
                getPublicHolidays.rejected,
                (
                    state,
                    action: PayloadAction<
                        unknown,
                        string,
                        never,
                        SerializedError
                    >,
                ) => {
                    state.publicHolidays = [];
                    state.loading = false;
                    state.error = action.error;
                },
            );
    },
});

export const selectPublicHolidays = (state: RootState) =>
    state.publicHolidays.publicHolidays;
export const selectPublicHolidaysLoading = (state: RootState) =>
    state.publicHolidays.loading;
export const selectPublicHolidaysError = (state: RootState) =>
    state.publicHolidays.error;

export default publicHolidaysSlice.reducer;
