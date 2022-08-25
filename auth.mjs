export const isAuthenticated = (req, res, next) => {
    if (req.headers.hasOwnProperty('x-api-key')
       && req.headers['x-api-key']==process.env.secret) {
        return next()
    }

    return res.json({ error: true, message: "Api key not provided, or not correct." })
}