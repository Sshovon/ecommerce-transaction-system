const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        createProxyMiddleware('/api3', {
            target: 'http://localhost:6006', // API endpoint 1
            changeOrigin: true,
            pathRewrite: {
                "^/api3": "",
            },
            headers: {
                Connection: "keep-alive",
                'Content-Type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",
                Accept: "application/json"
            }
        })
    );
    app.use(
        createProxyMiddleware('/api2', {
            target: 'http://localhost:5005', // API endpoint 2
            changeOrigin: true,
            pathRewrite: {
                "^/api2": "",
            },
            headers: {
                Connection: "keep-alive",
                // 'Content-Type': 'application/json;charset=UTF-8;',
                "Access-Control-Allow-Origin": "*",
                Accept: "application/json"
            }
        })
    );
    app.use(
        createProxyMiddleware("/api1", {
            target: "http://localhost:4004", // API endpoint 1
            changeOrigin: true,
            pathRewrite: {
                "^/api1": "",
            },
            headers: {
                Connection: "keep-alive",
                "Content-Type": "application/json;charset=UTF-8",
                "Access-Control-Allow-Origin": "*",
                Accept: "application/json",
            },
        })
    );
}
