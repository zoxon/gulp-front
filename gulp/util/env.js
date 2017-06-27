import argv from './argv';

export const NODE_ENV = (argv.production || argv.prod) ? 'production' : 'development';
export const isDevelopment = NODE_ENV === 'development';
