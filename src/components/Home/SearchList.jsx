import React, { useEffect, useState } from 'react'
import { Box, Divider, Pagination, Typography, styled } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux';
import { defaultSearch, setCurrentPage, updateSearchParams, updateQuery } from '../../store/SearchSlice';
import SearchCard from './SearchCard';
import SelectDate from './SelectDate';
import SelectTag from './SelectTag';
import SelectSortBy from './SelectSortBy';
import { useNavigate } from 'react-router-dom';


const now = new Date();

const getUnixTimestamp = (date) => Math.round(date.getTime() / 1000);

const getNumericFilterValue = (filterType) => {
    switch (filterType) {
        case 'all': return `created_at_i<${getUnixTimestamp(new Date(now.getTime()))}`;
        case 'last24h': return `created_at_i>${getUnixTimestamp(new Date(now.getTime() - 24 * 60 * 60 * 1000))}`;
        case "pastWeek": return `created_at_i>${getUnixTimestamp(new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000))}`;
        case "pastMonth": return `created_at_i>${getUnixTimestamp(new Date(now.setMonth(now.getMonth() - 1)))}`;
        case "pastYear": return `created_at_i>${getUnixTimestamp(new Date(now.setFullYear(now.getFullYear() - 1)))}`;
    }
}

const CustomFlex = styled('Box')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0.5),
}))

const ResultCount = styled(Typography)(({ theme }) => ({
    fontSize: '12px',
    color: '#000000',
    margin: theme.spacing(2),
    [theme.breakpoints.down('md')]: {
        display: "none"
    },
}))

const SearchList = () => {
    const [data, setData] = useState([])
    const { loading, error, searchParams, currentPage } = useSelector((state) => state.search)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const allValue = "(story,comment,poll,job)";
    const [debouncedSearchParams, setDebouncedSearchParams] = useState(null);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const page = parseInt(params.get('page')) + 1 || 1;
        const newFilters = {
            page,
            sortBy: params.get('sort') || 'byPopularity',
            numericFilters: getNumericFilterValue(params.get('dateRange') || 'all'),
            tags: params.get('type') === "all" ? allValue : params.get('type') || 'story',
        };
        const searchQuery = params.get('query') || '';
        dispatch(updateSearchParams(newFilters));
        if (searchQuery) {
            dispatch(updateQuery(searchQuery));
        }
        if (page > 1) {
            dispatch(setCurrentPage(page));
        }

    }, [location.search, dispatch]);


    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearchParams(searchParams);
        }, 1000);

        return () => clearTimeout(handler);
    }, [searchParams]);

    useEffect(() => {
        if (debouncedSearchParams) {
            dispatch(defaultSearch({ page: currentPage, searchParams: debouncedSearchParams }))
                .then((result) => {
                    if (result.payload) {
                        setData(result.payload);
                        console.log('Search Data Updated', result.payload);
                    }
                });
        }
    }, [debouncedSearchParams, dispatch, currentPage]);


    const handlePageChange = (event, value) => {
        const queryParams = new URLSearchParams(location.search);
        queryParams.set('page', value - 1);
        navigate({ search: queryParams.toString() });
        dispatch(setCurrentPage(value));

    };

    return (
        <>
            <CustomFlex sx={{ justifyContent: 'space-between' }}>
                <CustomFlex sx={{ flexWrap: 'wrap', gap: 1 }} >
                    <SelectTag allValue={allValue} />
                    <SelectSortBy />
                    <SelectDate getNumericFilterValue={getNumericFilterValue} />
                </CustomFlex >
                {data?.nbHits && data?.processingTimeMS && <ResultCount>{data?.nbHits} results ({data?.processingTimeMS / 1000}) seconds</ResultCount>}
            </CustomFlex>
            {loading && <Box> Loading...</Box>
            }
            {
                !loading && data?.hits?.length > 0 && <>
                    {data?.hits?.map((hit) => <SearchCard searchData={hit} />)}
                    <Pagination count={data?.nbPages}
                        variant="outlined"
                        shape="rounded"
                        sx={{ justifySelf: 'center', m: { sm: 1, md: 2 }, mt: 2 }}
                        page={currentPage}
                        onChange={handlePageChange} />
                </>
            }

            {data?.hits?.length === 0 && <Box> No Result found !!! </Box>}



        </>
    )
}

export default SearchList