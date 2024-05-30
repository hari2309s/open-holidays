import { Option, Select } from '@mui/joy';
import React from 'react';
import { LanguageCode, LanguageText } from '../api/types';
import { setLanguage } from '../store/features/ui/uiSlice';
import { AppDispatch } from '../store';
import { useDispatch } from 'react-redux';

const LanguageHeader = () => {
    const dispatch: AppDispatch = useDispatch();

    const handleLanguageChange = (
        event: React.SyntheticEvent | null,
        newValue: string | null,
    ) => {
        if (newValue) {
            dispatch(
                setLanguage({
                    languageCode: newValue as LanguageCode,
                    languageText: newValue as LanguageText,
                }),
            );
        }
    };

    return (
        <Select
            defaultValue={LanguageCode.EN}
            sx={{ margin: '10px 75px', alignSelf: 'end', minWidth: '100px' }}
            onChange={handleLanguageChange}
            data-testid="language-selector"
        >
            <Option value={LanguageCode.EN} data-testid="option-en">
                {LanguageText.EN}
            </Option>
            <Option value={LanguageCode.DE} data-testid="option-de">
                {LanguageText.DE}
            </Option>
        </Select>
    );
};

export default LanguageHeader;
