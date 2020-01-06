import React from 'react';
import AppLayout from '../common/AppLayout';
import './style.css';

const NewsFeed = () => {
  return (
    <AppLayout
      topbarContent={
        <div className="page-title">News feed</div>
      }
    >
      <div className="news-feed"></div>
    </AppLayout>
  )
}

export default NewsFeed
