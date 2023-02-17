import express, { Router } from 'express';
import { useUsersRouter } from './users.router';
import { usePostsRouter } from './posts.router';

import { useReviewsRouter } from './reviews.router';
import { useLogsRouter } from './logs.router';

export function setGlobalRouter(): Router {
    const router = express.Router();
    useUsersRouter(router);
    usePostsRouter(router);
    useReviewsRouter(router);
    useLogsRouter(router)
    return router;
}