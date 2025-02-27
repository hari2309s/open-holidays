import {
    PayloadAction,
    SerializedError,
    createAsyncThunk,
    createSlice,
} from '@reduxjs/toolkit';
import { IHolidaysRequestPayload, ISchoolHoliday } from '../../../api/types';
import { getSchoolHolidays as getSchoolHolidaysAPI } from '../../../api/index';
import { RootState } from '../..';

interface SchoolHolidaysState {
    schoolHolidays: ISchoolHoliday[];
    loading: boolean;
    error: Error | SerializedError | null;
}

const initialState: SchoolHolidaysState = {
    schoolHolidays: [],
    loading: false,
    error: null,
};

export const getSchoolHolidays = createAsyncThunk(
    'schoolHolidays/getSchoolHolidays',
    async (
        { countryIsoCode, validFrom, validTo }: IHolidaysRequestPayload,
        { rejectWithValue },
    ) => {
        try {
            const response = await getSchoolHolidaysAPI({
                countryIsoCode,
                validFrom,
                validTo,
            });

            return response as ISchoolHoliday[];
        } catch (error) {
            return rejectWithValue(error);
        }
    },
);

export const schoolHolidaysSlice = createSlice({
    name: 'schoolHolidays',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(
                getSchoolHolidays.fulfilled,
                (state, action: PayloadAction<ISchoolHoliday[]>) => {
                    state.schoolHolidays = action.payload;
                    state.loading = false;
                    state.error = null;
                },
            )
            .addCase(getSchoolHolidays.pending, state => {
                state.schoolHolidays = [];
                state.loading = true;
                state.error = null;
            })
            .addCase(
                getSchoolHolidays.rejected,
                (
                    state,
                    action: PayloadAction<
                        unknown,
                        string,
                        never,
                        SerializedError
                    >,
                ) => {
                    state.schoolHolidays = [];
                    state.loading = false;
                    state.error = action.error;
                },
            );
    },
});

export const selectSchoolHolidays = (state: RootState) =>
    state.schoolHolidays.schoolHolidays;
export const selectSchoolHolidaysLoading = (state: RootState) =>
    state.schoolHolidays.loading;
export const selectSchoolHolidaysError = (state: RootState) =>
    state.schoolHolidays.error;

export default schoolHolidaysSlice.reducer;
