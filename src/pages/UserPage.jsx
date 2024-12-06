import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserById } from '../store/UserSlice'
import { styled } from "@mui/material/styles";
import { Container, Box, Typography } from '@mui/material'

const Wrapper = styled(Box)(({ theme }) => ({
    background: theme.palette.secondary.light,
    width: '100%'
}))

const CustomBox = styled(Box)(({ theme }) => ({
    background: '#F6F6EF',
    height: "auto",
    minHeight: '100vh',
    padding: theme.spacing(3, 2)
}))

const CustomText = styled(Typography)(({ theme }) => ({
    fontSize: '14px',
    fontWeight: "500",
    color: '#828282',
    overflowWrap: 'break-word'
}))

const UserPage = () => {
    const [userData, setUserData] = useState({})
    const dispatch = useDispatch()
    const { loading, error } = useSelector((state) => state.user)
    const queryParams = new URLSearchParams(location.search);
    const userId = queryParams?.get('id')


    useEffect(() => {
        if (userId)
            dispatch(getUserById(userId)).then((result) => {
                if (result.payload) {
                    setUserData(result.payload);
                }
            })
    }, [userId])

    if (userId)
        return (
            <Wrapper>
                <Container sx={{
                    maxWidth: {
                        xs: '100%',
                        sm: '90%',
                        md: '80%',
                    }
                }}>
                    <CustomBox>
                        {loading && <CustomText>Loading...</CustomText>}
                        {!loading && !error && <>
                            <CustomText> user: {userData.username}</CustomText>
                            <CustomText> karma: {userData.karma}</CustomText>
                            <CustomText> about: {userData.about}</CustomText>
                        </>}
                        {error && <CustomText> {error}</CustomText>}
                    </CustomBox>
                </Container>
            </Wrapper>
        )
    else
        return <>Invalid URL</>
}

export default UserPage