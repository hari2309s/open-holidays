import React from 'react';
import './App.css';
import styled from '@emotion/styled';
import Form from './components/Form';
import Typography from '@mui/joy/Typography';
import List from './components/List';
import LanguageHeader from './components/LanguageHeader';
import { useSelector } from 'react-redux';
import { selectLanguage } from './store/features/ui/uiSlice';
import { LanguageCode } from './api/types';
import christmasIcon1 from '../src/assets/icon-christmas-1.png';

function App() {
    const currentLanguage = useSelector(selectLanguage);

    return (
        <div className="App">
            <LanguageHeader />
            <Header>
                <img src={christmasIcon1} alt="holidays" height="35px" />
                <Typography
                    data-testid="app-title"
                    level="h2"
                    sx={{ color: '#006d77', marginLeft: '20px' }}
                >
                    {currentLanguage.languageCode === LanguageCode.EN
                        ? 'Holidays'
                        : 'Feiertage'}
                </Typography>
            </Header>
            <Container>
                <Form />
                <List />
            </Container>
        </div>
    );
}

const Container = styled.div({
    width: '90vw',
    display: 'flex',
    flexDirection: 'column',
    margin: '40px 0 0',
});

const Header = styled.div({
    display: 'flex',
    justifyContent: 'center',
    margin: '10px 0 auto',
});

export default App;
