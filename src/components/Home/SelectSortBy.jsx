import React from 'react';
import { Select, MenuItem, Typography, styled } from '@mui/material';
import { updateSearchParams } from '../../store/SearchSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const CustomSelect = styled(Select)(({ theme }) => ({
    '& .MuiSelect-select': {
        padding: theme.spacing(0.5),
        color: '#828282'
    }
}
))
const SearchTitle = styled(Typography)(({ theme }) => ({
    fontSize: '16px',
    fontWeight: "500",
    color: '#000000',
    [theme.breakpoints.down('md')]: {
        display: "none"
    },
}))


const SelectSortBy = () => {
    const { searchParams } = useSelector((state) => state.search)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);


    const handleSearchParamChange = (e) => {
        queryParams.set('sort', e.target.value);
        navigate({ search: queryParams.toString() });
        dispatch(updateSearchParams({ [e.target.name]: e.target.value }))
    }

    const sortOptions = [
        { label: "Popularity", value: "byPopularity" },
        { label: "Date", value: "byDate" },
    ];

    return (
        <>
            <SearchTitle>for</SearchTitle>
            <CustomSelect
                value={searchParams?.sortBy}
                inputProps={{ name: 'sortBy' }}
                onChange={handleSearchParamChange}>
                {sortOptions.map((option, index) => (
                    <MenuItem key={index} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </CustomSelect>
        </>
    );
};

export default SelectSortBy;
