import { API_BASE_URL } from '../constants';
import { IPublicHolidaysRequestPayload } from './types';

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
}: IPublicHolidaysRequestPayload) => {
    const publicHolidaysURL = `${API_BASE_URL}/PublicHolidays?countryIsoCode=${countryIsoCode}&validFrom=${validFrom}&validTo=${validTo}`;
    return await fetch(publicHolidaysURL)
        .then(data => data.json())
        .catch(error => {
            return Promise.reject(error);
        });
};
