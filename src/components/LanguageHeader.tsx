import { Option, Select } from '@mui/joy';
import React from 'react';
import { LanguageCode, LanguageText } from '../api/types';
import { setLanguage } from '../store/features/ui/uiSlice';

const LanguageHeader = () => {
    const handleLanguageChange = (
        event: React.SyntheticEvent | null,
        newValue: string | null,
    ) => {
        if (newValue) {
            setLanguage({
                languageCode: newValue as LanguageCode,
                languageText: newValue as LanguageText,
            });
        }
    };

    return (
        <Select
            defaultValue={LanguageCode.EN}
            sx={{ margin: '10px 75px', alignSelf: 'end' }}
            onChange={handleLanguageChange}
        >
            <Option value={LanguageCode.EN}>{LanguageText.EN}</Option>
            <Option value={LanguageCode.DE}>{LanguageText.DE}</Option>
        </Select>
    );
};

export default LanguageHeader;
