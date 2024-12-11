import React from 'react'
import { AppBar, Toolbar, Box, Typography, InputBase, Link } from '@mui/material'
import { styled } from "@mui/material/styles";
import SearchIcon from '@mui/icons-material/Search';
import { useDispatch, useSelector } from 'react-redux';
import { updateQuery } from '../../store/SearchSlice';
import { useNavigate } from 'react-router-dom';


const Logo = styled('img')(({ theme }) => ({
    width: '45px',
    [theme.breakpoints.down('md')]: {
        display: "none"
    },
}))

const CustomUserName = styled(Typography)(({ theme }) => ({
    fontSize: '18px',
    [theme.breakpoints.down('md')]: {
        display: "none"
    },

}))
const Search = styled(Box)(({ theme }) => ({
    position: 'relative',
    backgroundColor: '#FFFFFF',
    marginRight: theme.spacing(2),
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    flexGrow: '1',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled(Box)(({ theme }) => ({
    padding: theme.spacing(0, 1),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const CustomSearchIcon = styled(SearchIcon)(({ theme }) => ({
    color: theme.palette.primary.main

}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: '#000000',
    fontWeight: '520',
    flexGrow: 1,
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(2)})`,
        transition: theme.transitions.create('width'),
        width: '35vw',
        [theme.breakpoints.up('lg')]: {
            width: "50vw",
        },
    },
}));


const PoweredBy = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    alignSelf: 'center',
}))

const SearchByText = styled(Typography)(({ theme }) => ({
    whiteSpace: 'noWrap',
    fontSize: '12px',
    color: 'rgba(0, 0, 0, .50)',
    [theme.breakpoints.down('md')]: {
        display: "none"
    },

}))

const PoweredLogo = styled('img')(({ theme }) => ({
    height: '20px',
    margin: theme.spacing(0, 1),
    [theme.breakpoints.down('sm')]: {
        display: "none"
    },

}))

const NavigationBar = () => {

    const { searchParams } = useSelector((state) => state.search)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);

    const handleQueryChange = (e) => {
        queryParams.set('query', e.target.value)
        queryParams.set('page', 0)
        navigate({ search: queryParams.toString() });
        dispatch(updateQuery(e.target.value))
    }
    return (
        <AppBar position="static" color="primary">
            <Toolbar>
                <Logo src='logo.png' alt='logo' />
                <CustomUserName>
                    {localStorage?.getItem('user') ? JSON.parse(localStorage?.getItem('user'))?.username : "Search Hacker News"}
                </CustomUserName>


                <Search >
                    <SearchIconWrapper>
                        <CustomSearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                        value={searchParams?.query || ''}
                        placeholder="Search stories by title, url or author"
                        onChange={handleQueryChange}
                    />
                    <PoweredBy>
                        <SearchByText >
                            Search by
                        </SearchByText>
                        <PoweredLogo src='https://hn.algolia.com/public/38a9c67b12016b52267071c530ff2e78.svg' alt='search_logo' />
                    </PoweredBy>
                </Search>
            </Toolbar>
        </AppBar>
    )
}

export default NavigationBar