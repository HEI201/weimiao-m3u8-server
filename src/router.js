// routes fo api
import { Router } from 'express';

import {
    getChapters,
    getCourses,
    getScheduleList,
    getUserInfo,
    getVideoInfo,
    quickStudy
} from './controller.js';

const router = Router();

router.get('/userInfo', getUserInfo);
router.get('/quickStudy', quickStudy);
router.get('/courses', getCourses);
router.get('/scheduleList', getScheduleList);
router.get('/chapters', getChapters);
router.get('/videoInfo', getVideoInfo);

export default router;