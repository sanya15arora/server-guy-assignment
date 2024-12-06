import React, { useState } from 'react';
import { Select, MenuItem, Typography, styled } from '@mui/material';
import { updateSearchParams } from '../../store/SearchSlice';
import { useDispatch } from 'react-redux';
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


const SelectDate = ({ getNumericFilterValue }) => {
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);
    const dateRange = queryParams?.get('dateRange');
    const [filterValue, setFilterValue] = useState(dateRange || 'all')
    const dispatch = useDispatch();

    const handleSearchParamChange = (e) => {
        setFilterValue(e.target.value)
        queryParams.set('dateRange', e.target.value);
        navigate({ search: queryParams.toString() });

        const numericFilterValue = getNumericFilterValue(e.target.value)
        dispatch(updateSearchParams({ [e.target.name]: numericFilterValue }))
    }
    const dateOptions = [
        { label: "All time", value: "all" },
        { label: "Last 24h", value: "last24h" },
        { label: "Past Week", value: "pastWeek" },
        { label: "Past Month", value: "pastMonth" },
        { label: "Past Year", value: "pastYear" },
    ];

    return (
        <>
            <SearchTitle>for</SearchTitle>
            <CustomSelect
                value={filterValue}
                inputProps={{ name: 'numericFilters' }}
                onChange={handleSearchParamChange}>
                {dateOptions.map((option, index) => (
                    <MenuItem key={index} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </CustomSelect>
        </>
    );
};

export default SelectDate;
