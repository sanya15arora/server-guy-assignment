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
}))

const SearchTitle = styled(Typography)(({ theme }) => ({
    fontSize: '16px',
    fontWeight: "500",
    color: '#000000',
    [theme.breakpoints.down('md')]: {
        display: "none"
    },
}))


const SelectTag = ({ allValue }) => {
    const { searchParams } = useSelector((state) => state.search)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);


    const handleSearchParamChange = (e) => {
        queryParams.set('type', e.target.value);
        navigate({ search: queryParams.toString() });
        dispatch(updateSearchParams({ [e.target.name]: e.target.value === "all" ? allValue : e.target.value }))
    }

    const tagOptions = [
        { label: "All", value: "all" },
        { label: "Stories", value: "story" },
        { label: "Comments", value: "comment" },
        { label: "Ask HN", value: "ask_hn" },
        { label: "Show HN", value: "show_hn" },
        { label: "Jobs", value: "job" },
        { label: "Polls", value: "poll" },
    ];

    return (
        <>
            <SearchTitle>Search</SearchTitle>
            <CustomSelect
                value={searchParams?.tags === allValue ? 'all' : searchParams?.tags}
                inputProps={{ name: 'tags' }}
                onChange={handleSearchParamChange}>
                {tagOptions.map((option, index) => (
                    <MenuItem key={index} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </CustomSelect>
        </>
    );
};

export default SelectTag;
