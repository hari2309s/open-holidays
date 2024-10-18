import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import React from 'react';
import { ICountry } from '../api/types';
import { useSelector } from 'react-redux';
import { selectLanguage } from '../store/features/ui/uiSlice';

interface SelectInputProps {
    placeholder: string;
    name: string;
    defaultValue: string;
    value: string;
    options: ICountry[];
    onChange: (value: string) => void;
}

const SelectInput = ({
    placeholder,
    name,
    defaultValue,
    value,
    options,
    onChange,
}: SelectInputProps) => {
    const language = useSelector(selectLanguage);

    const handleChange = (
        event: React.SyntheticEvent | null,
        newValue: string | null,
    ) => {
        if (newValue) {
            onChange(newValue);
        }
    };

    return (
        <Select
            placeholder={placeholder}
            name={name}
            data-testid="country-selector"
            defaultValue={defaultValue}
            value={value}
            onChange={handleChange}
            size="lg"
            sx={{
                minWidth: '230px',
                minHeight: '56px',
                marginRight: '15px',
                '@media (min-width: 320px) and (max-width: 430px)': {
                    minHeight: '36px',
                },
            }}
        >
            {options.map(option => (
                <Option
                    value={option.isoCode}
                    key={option.isoCode}
                    data-testid={`option-${option.isoCode}`}
                >
                    {
                        option.name.filter(
                            entry => entry.language === language.languageCode,
                        )[0].text
                    }
                </Option>
            ))}
        </Select>
    );
};

export default SelectInput;
