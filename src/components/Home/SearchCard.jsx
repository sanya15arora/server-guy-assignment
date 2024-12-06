import React from 'react'
import { Box, styled, Typography } from '@mui/material'
import moment from 'moment';
import { Link } from 'react-router-dom';

const StoryWrappeer = styled(Box)(({ theme }) => ({
    padding: theme.spacing(1, 2, 0, 2),
}))

const StoryData = styled(Box)(({ theme }) => ({
    width: '100%',
    '& a': {
        textDecoration: "none",
        color: 'inherit'
    },
    '& a:hover': {
        cursor: 'pointer',
        textDecoration: 'underline'

    }
}))

const StoryTitle = styled(Typography)(({ theme }) => ({
    fontSize: '14px',
    color: '#000000',
    marginRight: theme.spacing(1),
    display: 'inline-block',
}))

const StoryText = styled(Typography)(({ theme }) => ({
    fontSize: '12px',
    color: '#000000',
    marginRight: theme.spacing(1),
    fontWeight: '400',
    '& a': {
        textDecoration: "none",
        color: 'inherit'
    }
}))
const StoryLink = styled(Typography)(({ theme }) => ({
    fontSize: '12px',
    color: '#828282',
    display: 'inline-block',
    wordBreak: 'break-all',

}))


const StoryMeta = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    color: '#696969'
}))

const MetaText = styled(Typography)(({ theme }) => ({
    fontSize: '10px',
    fontWeight: 500,
    '& a': {
        textDecoration: "none",
        color: 'inherit'
    },
    '& a:hover': {
        cursor: 'pointer',
        textDecoration: 'underline'

    }
}))

const SearchCard = ({ searchData }) => {
    const dateTimeAgo = moment.utc(searchData.created_at).local().startOf('seconds').fromNow()

    const createStory = (story_text) => {
        return { __html: `<div>${story_text}</div>` };
    }

    if (searchData?.title || searchData?.story_title)
        return (
            <StoryWrappeer>
                <StoryData>
                    <Link to={`/item?id=${searchData?.story_id}`}>
                        <StoryTitle>
                            {searchData?.title || searchData?.story_title}
                        </StoryTitle>
                    </Link>
                    {(searchData?.url || searchData?.story_url) &&
                        <StoryLink>
                            <Link href={searchData?.url ? searchData?.url : searchData?.story_url}
                                target="_blank"
                                sx={{
                                    textDecoration: 'none',
                                    '&:hover': {
                                        textDecoration: 'underline',
                                    }
                                }}>
                                ({searchData?.url || searchData?.story_url})
                            </Link>
                        </StoryLink>}
                </StoryData>
                <StoryMeta>
                    <MetaText>
                        {searchData?.points} points |
                        {" "} <Link to={`/user?id=${searchData?.author}`}>{searchData?.author}</Link> |
                        {" "}  {dateTimeAgo} |
                        {" "}  {searchData?.num_comments} comments
                    </MetaText>
                </StoryMeta>
                {
                    searchData?.story_text && <StoryData>
                        <StoryText sx={{ textDecoration: 'none' }}
                            dangerouslySetInnerHTML={createStory(searchData?.story_text)} />
                    </StoryData>
                }
            </StoryWrappeer >

        )
}

export default SearchCard