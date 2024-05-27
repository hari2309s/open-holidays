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
import { Button, Option, Select } from '@mui/joy';
import {
    getPublicHolidays,
    selectPublicHolidaysLoading,
} from '../store/features/public-holidays/publicHolidaysSlice';
import { HolidayType } from '../api/types';
import {
    getSchoolHolidays,
    selectSchoolHolidaysLoading,
} from '../store/features/school-holidays/schoolHolidaysSlice';
import { setCountry, setHolidayType } from '../store/features/ui/uiSlice';

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
    const publicHolidaysLoading = useSelector(selectPublicHolidaysLoading);
    const schoolHolidaysLoading = useSelector(selectSchoolHolidaysLoading);

    useEffect(() => {
        dispatch(getCountries());
        if (
            formValues.country &&
            formValues.fromValue &&
            formValues.toValue &&
            formValues.type
        ) {
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
        }
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
        dispatch(
            setCountry(
                countries
                    .filter(
                        country => country.isoCode === formValues.country,
                    )[0]
                    .name.filter(item => item.language === 'EN')[0].text,
            ),
        );
        dispatch(setHolidayType(formValues.type));

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
                    size="lg"
                    sx={{
                        minWidth: '230px',
                        minHeight: '56px',
                        marginRight: '15px',
                    }}
                >
                    <Option value={HolidayType.PUBLIC}>
                        {HolidayType.PUBLIC + ' holidays'}
                    </Option>
                    <Option value={HolidayType.SCHOOL}>
                        {HolidayType.SCHOOL + ' holidays'}
                    </Option>
                </Select>
                <Button
                    variant="solid"
                    size="lg"
                    onClick={handleButtonClick}
                    sx={{ backgroundColor: '#006d77', minHeight: '56px' }}
                    loading={publicHolidaysLoading || schoolHolidaysLoading}
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
