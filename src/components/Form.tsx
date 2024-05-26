import React, { useEffect, useState } from 'react';
import SelectInput from './SelectInput';
import styled from '@emotion/styled';
import {
    getCountries,
    selectCountries,
} from '../store/features/countries/countriesSlice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../store';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/de';
import { Button, Select } from '@mui/joy';
import { getPublicHolidays } from '../store/features/public-holidays/publicHolidaysSlice';
import { HolidayType } from '../api/types';
import { getSchoolHolidays } from '../store/features/school-holidays/schoolHolidaysSlice';

interface FormValues {
    country: string;
    fromValue: Dayjs | null;
    toValue: Dayjs | null;
    type: HolidayType;
}

const startOfcurrentYear = dayjs().startOf('year');
const endOfcurrentYear = dayjs().endOf('year');

const initialFormValues: FormValues = {
    country: 'DE',
    fromValue: startOfcurrentYear,
    toValue: endOfcurrentYear,
    type: HolidayType.PUBLIC,
};

const Form = () => {
    const [formValues, setFormValues] = useState<FormValues>(initialFormValues);

    const dispatch: AppDispatch = useDispatch();
    const countries = useSelector(selectCountries);

    useEffect(() => {
        dispatch(getCountries());
    }, []);

    const handleCountryChange = (value: string) => {
        setFormValues(formValues => ({
            ...formValues,
            country: value,
        }));
    };

    const handleFromValueChange = (value: Dayjs | null) => {
        setFormValues(formValues => ({
            ...formValues,
            fromValue: value,
        }));
    };

    const handleToValueChange = (value: Dayjs | null) => {
        setFormValues(formValues => ({
            ...formValues,
            toValue: value,
        }));
    };

    const handleTypeChange = (
        event: React.SyntheticEvent | null,
        newValue: string | null,
    ) => {
        setFormValues(formValues => ({
            ...formValues,
            type: newValue as HolidayType,
        }));
    };

    const handleButtonClick = () => {
        if (formValues.type === HolidayType.PUBLIC) {
            dispatch(
                getPublicHolidays({
                    countryIsoCode: formValues.country,
                    validFrom: formValues.fromValue
                        ? formValues.fromValue?.format('YYYY-MM-DD')
                        : startOfcurrentYear.format('YYYY-MM-DD'),
                    validTo: formValues.toValue
                        ? formValues.toValue?.format('YYYY-MM-DD')
                        : endOfcurrentYear.format('YYYY-MM-DD'),
                }),
            );
        } else {
            dispatch(
                getSchoolHolidays({
                    countryIsoCode: formValues.country,
                    validFrom: formValues.fromValue
                        ? formValues.fromValue?.format('YYYY-MM-DD')
                        : startOfcurrentYear.format('YYYY-MM-DD'),
                    validTo: formValues.toValue
                        ? formValues.toValue?.format('YYYY-MM-DD')
                        : endOfcurrentYear.format('YYYY-MM-DD'),
                }),
            );
        }
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="de">
            <Container>
                <SelectInput
                    placeholder="Select country"
                    name="country-select"
                    defaultValue="DE"
                    value={formValues.country}
                    options={countries}
                    onChange={handleCountryChange}
                />
                <DatePicker
                    name="from-value"
                    defaultValue={startOfcurrentYear}
                    value={formValues.fromValue}
                    views={['year', 'month', 'day']}
                    onChange={handleFromValueChange}
                    sx={{ marginRight: '15px' }}
                />
                <DatePicker
                    name="to-value"
                    defaultValue={endOfcurrentYear}
                    value={formValues.toValue}
                    views={['year', 'month', 'day']}
                    onChange={handleToValueChange}
                    sx={{ marginRight: '15px' }}
                />
                <Select
                    placeholder="Select holiday type"
                    name="holiday-type-select"
                    defaultValue={HolidayType.PUBLIC}
                    value={formValues.type}
                    onChange={handleTypeChange}
                    sx={{
                        minWidth: '230px',
                        minHeight: '56px',
                        marginRight: '15px',
                    }}
                >
                    <option value={HolidayType.PUBLIC}>
                        {HolidayType.PUBLIC + ' holidays'}
                    </option>
                    <option value={HolidayType.SCHOOL}>
                        {HolidayType.SCHOOL + ' holidays'}
                    </option>
                </Select>
                <Button
                    variant="solid"
                    size="lg"
                    onClick={handleButtonClick}
                    sx={{ backgroundColor: '#006d77', minHeight: '56px' }}
                >
                    Show
                </Button>
            </Container>
        </LocalizationProvider>
    );
};

const Container = styled.div({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
});

export default Form;
