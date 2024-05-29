import { ListSubheader } from '@mui/joy';
import React from 'react';
import { useSelector } from 'react-redux';
import { selectLanguage } from '../store/features/ui/uiSlice';
import { LanguageCode } from '../api/types';

const ListHeader = () => {
    const currentLanguage = useSelector(selectLanguage);

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'space-between',
                width: '90vw',
            }}
        >
            <div
                style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    margin: '0 40px',
                }}
            >
                <div
                    style={{
                        width: '500px',
                        display: 'flex',
                        justifyContent: 'space-between',
                    }}
                >
                    <ListSubheader sticky>
                        {currentLanguage.languageCode === LanguageCode.EN
                            ? 'Holidays'
                            : 'Ferientag'}
                    </ListSubheader>
                    <div
                        style={{
                            width: '200px',
                            display: 'flex',
                            justifyContent: 'center',
                        }}
                    >
                        <ListSubheader sticky>Dates</ListSubheader>
                    </div>
                </div>
                <div
                    style={{
                        width: '200px',
                        display: 'flex',
                        justifyContent: 'space-between',
                    }}
                >
                    <ListSubheader sticky>
                        {currentLanguage.languageCode === LanguageCode.EN
                            ? 'Duration'
                            : 'Laufzeit'}
                    </ListSubheader>
                    <ListSubheader sticky>
                        {currentLanguage.languageCode === LanguageCode.EN
                            ? 'Type'
                            : 'Typ'}
                    </ListSubheader>
                </div>
            </div>
        </div>
    );
};

export default ListHeader;
