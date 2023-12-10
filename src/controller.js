import services from "./services.js";

export const getUserInfo = (req, res) => {
    // get user info and send to client
    services.getUserInfo().then((response) => {
        res.send(response.data);
    });
};

export const quickStudy = (req, res) => {
    services.quickStudy().then((response) => {
        res.send(response.data);
    });
};

export const getCourses = (req, res) => {
    services.getCourses().then((response) => {
        res.send(response.data);
    }).catch((e) => {
        console.log(e);
        res.status(500).json({ error: e.message });
    });
};

export const getScheduleList = (req, res) => {
    services.getScheduleList(req.query).then((response) => {
        res.send(response.data);
    });
};

export const getChapters = (req, res) => {
    services.getChapters(req.query).then((response) => {
        res.send(response.data);
    });
};

export const getVideoInfo = (req, res) => {
    services.getVideoInfo(req.query).then((response) => {
        res.send(response);
    });
};