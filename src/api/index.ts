import { API_BASE_URL } from '../constants';
import { IHolidaysRequestPayload } from './types';

export const getCountries = async () => {
    return await fetch(`${API_BASE_URL}/Countries`)
        .then(data => data.json())
        .catch(error => {
            return Promise.reject(error);
        });
};

export const getPublicHolidays = async ({
    countryIsoCode,
    validFrom,
    validTo,
}: IHolidaysRequestPayload) => {
    const publicHolidaysURL = `${API_BASE_URL}/PublicHolidays?countryIsoCode=${countryIsoCode}&validFrom=${validFrom}&validTo=${validTo}`;
    return await fetch(publicHolidaysURL)
        .then(data => data.json())
        .catch(error => {
            return Promise.reject(error);
        });
};

export const getSchoolHolidays = async ({
    countryIsoCode,
    validFrom,
    validTo,
}: IHolidaysRequestPayload) => {
    const schoolHolidaysURL = `${API_BASE_URL}/SchoolHolidays?countryIsoCode=${countryIsoCode}&validFrom=${validFrom}&validTo=${validTo}`;
    return await fetch(schoolHolidaysURL)
        .then(data => data.json())
        .catch(error => {
            return Promise.reject(error);
        });
};
