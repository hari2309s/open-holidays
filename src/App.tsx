import React from 'react';
import './App.css';
import styled from '@emotion/styled';
import Form from './components/Form';
import { Typography } from '@mui/joy';
import List from './components/List';

function App() {
    return (
        <div className="App">
            <Header>
                <Typography level="h2" sx={{ color: '#006d77' }}>
                    Open Holidays
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
    width: '70vw',
    display: 'flex',
    flexDirection: 'column',
    margin: '40px 40px 0',
});

const Header = styled.div({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: '40px',
});

export default App;
