import React from 'react'
import { styled } from "@mui/material/styles";
import { Container, Box } from '@mui/material'
import NavigationBar from '../components/Home/NavigationBar'
import SearchList from '../components/Home/SearchList';

const Wrapper = styled(Box)(({ theme }) => ({
    background: theme.palette.secondary.main,
    width: '100%'
}))

const CustomBox = styled(Box)(({ theme }) => ({
    background: '#F6F6EF',
    height: "auto",
    minHeight: '100vh'
}))


const Home = () => {


    return (
        <Wrapper>
            <Container sx={{
                maxWidth: {
                    xs: '100%',
                    sm: '90%',
                    md: '80%',
                }
            }}>
                <NavigationBar />
                <CustomBox>
                    <SearchList />
                </CustomBox>
            </Container>
        </Wrapper>
    )
}

export default Home