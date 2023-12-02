import express from 'express';
import router from './router.js';

const app = express();

// allow cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});
// body parser
app.use(express.json());
app.use('/api', router);

const port = 3800;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});