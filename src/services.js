import M3u8Downloader from '@lhw/m3u8-downloader';
import axios from 'axios';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { videosPath, videosRoute } from './config.js';

// get the path of the script
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// read cookie from file
let cookie = fs.readFileSync(path.join(__dirname, 'cookie.txt'), 'utf-8');
console.log(cookie);
// remove \r\n from cookie
cookie = cookie.replace(/(\\r\\n)$/g, '');
console.log(cookie);

// create an instance
const instance = axios.create({
    baseURL: 'https://course.weimiaotj.cn/api',
    timeout: 60 * 1000,
    headers: {
        'referer': 'https://course.weimiaotj.cn/course',

        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36 Edg/119.0.0.0',

        cookie
    }
});


// api services
const rests = {
    userInfo: '/user/getUserInfo', // get 用户信息
    courses: '/v3/study/getPcCourseList', // get 课程列表
    scheduleList: '/v3/study/scheduleList', // get 课程下的安排， 该course下的每周的安排
    chapters: '/v3/study/weekVideos', // get 该周下的chapters安排，有几个chapter， chapter下有该chapter下的视频列表
    videoInfo: '/v3/study/getVideoInfo?sharpness=SD&video_type=1', // get 具体某个视频信息，包括播放地址 封面等

    quickStudy: '/v3/study/quickStudy', // 上次学习视频，可以用于继续学习 get
};

const get = (url, params) => {
    try {
        return instance.get(url, { params });
    } catch (error) {
        console.log(error);
    }
};

const post = (url, params) => {
    return instance.post(url, params);
};

export const getUserInfo = () => {
    return get(rests.userInfo);
};

export const quickStudy = () => {
    return get(rests.quickStudy);
};

export const getCourses = () => {
    return get(rests.courses);
};
export const getScheduleList = ({ course_id }) => {
    return get(rests.scheduleList, { course_id });
};

export const getChapters = ({ course_id, week_id }) => {
    return get(rests.chapters, { course_id, week_id });
};

export const getVideoInfo = async ({
    vid,
    cid,
    sharpness,
    video_type,
    course_id
}) => {

    const { data: { data } } = await get(rests.videoInfo, {
        vid,
        cid,
        sharpness,
        video_type,
        course_id
    });

    const url = data.aliAllUrl;
    const d = new M3u8Downloader({
        m3u8_url: url,
        merge: false,
        taskName: data.name,
        savedPath: videosPath,
        m3u8TsPath: videosRoute
    });

    await d.parseM3u8();
    await d.download();
    const m3u8Filepath = [videosRoute, d.videoFolder, 'index.m3u8'].join('/');
    console.log(m3u8Filepath);
    return m3u8Filepath;

};


export default {
    getUserInfo,
    quickStudy,
    getCourses,
    getScheduleList,
    getChapters,
    getVideoInfo
};