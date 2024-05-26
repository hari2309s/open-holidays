import { Option, Select } from '@mui/joy';
import React from 'react';
import { ICountry } from '../api/types';

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
            defaultValue={defaultValue}
            value={value}
            onChange={handleChange}
            size="lg"
            sx={{ minWidth: '230px', minHeight: '56px', marginRight: '15px' }}
        >
            {options.map(option => (
                <Option value={option.isoCode} key={option.isoCode}>
                    {
                        option.name.filter(entry => entry.language === 'EN')[0]
                            .text
                    }
                </Option>
            ))}
        </Select>
    );
};

export default SelectInput;
