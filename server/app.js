const express = require('express');
    const cors = require('cors');
    const index = require('./routers/index');
    // const errorHandling = require('./middlewares/errorHandling');

    const PORT = 3000;

    const app = express();

    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));

    app.use(index);
    // app.use(errorHandling)

    app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});