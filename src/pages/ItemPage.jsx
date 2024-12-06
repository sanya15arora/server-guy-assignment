import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { styled } from "@mui/material/styles";
import { Container, Box, Typography } from '@mui/material'
import { getItem } from '../store/ItemSlice';

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

const ItemPage = () => {
    const [itemData, setItemData] = useState({})
    const dispatch = useDispatch()
    const { loading } = useSelector((state) => state.items)

    const queryParams = new URLSearchParams(location.search);
    const itemId = queryParams?.get('id')


    useEffect(() => {
        if (itemId)
            dispatch(getItem(itemId)).then((result) => {
                if (result.payload) {
                    setItemData(result.payload);
                }
            })
    }, [itemId])

    if (itemId)
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
                        {loading && <CustomText>Loading... </CustomText>}
                        {!loading && !itemData?.error && <>
                            <CustomText> {itemData.title}</CustomText>
                            <CustomText> {itemData.url}</CustomText>
                            <CustomText> {itemData.points} points by {itemData.author}</CustomText>
                        </>}
                        {itemData.error && <CustomText> {itemData.error}</CustomText>}

                    </CustomBox>
                </Container>
            </Wrapper>)
    else
        return <>Invalid URL</>

}

export default ItemPage