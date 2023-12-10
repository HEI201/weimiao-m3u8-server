import express from 'express';
import { videosPath, videosRoute } from './config.js';
import router from './router.js';
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
const app = express();

// allow cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

// body parser
app.use(express.json());

// log requests
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// serve static files, map /videos to videosPath
app.use(`${videosRoute}`, express.static(videosPath));

app.use('/api', router);

const port = 3800;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
