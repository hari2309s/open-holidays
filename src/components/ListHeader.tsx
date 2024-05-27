import { ListSubheader } from '@mui/joy';
import React from 'react';

const ListHeader = () => {
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
                    <ListSubheader sticky>Holidays</ListSubheader>
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
                    <ListSubheader sticky>Duration</ListSubheader>
                    <ListSubheader sticky>Type</ListSubheader>
                </div>
            </div>
        </div>
    );
};

export default ListHeader;
