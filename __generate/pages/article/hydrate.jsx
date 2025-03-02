import React from 'react';
import { hydrateRoot } from 'react-dom/client';
import ArticleTemplate from './template';

// Get the server-rendered data from a global variable
const serverData = window.__INITIAL_DATA__;

hydrateRoot(
    document.getElementById('root'),
    <ArticleTemplate {...serverData} />
);