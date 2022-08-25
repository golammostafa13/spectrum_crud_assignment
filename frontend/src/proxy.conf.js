export const PROXY_CONFIG = {
    "/api": {
      "target": "https://spectrum-assignment.herokuapp.com/api",
      "secure": false,
      "pathRewrite": {
        "^/api": ""
      },
      "changeOrigin": true
    }
}