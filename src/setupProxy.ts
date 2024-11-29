import { createProxyMiddleware, Options } from 'http-proxy-middleware';

const proxyOptions: Options = {
  target: 'https://testd5-img.azurewebsites.net', // The API server you are targeting
  changeOrigin: true,
  secure: false, // Set to false if you're using HTTP
  pathRewrite: {
    '^/api': '', // This rewrites the path when it reaches the target API server
  },
};

export default function (app: any) {
  app.use(
    '/api', // This will forward all /api requests to the target API server
    createProxyMiddleware(proxyOptions)
  );
}
