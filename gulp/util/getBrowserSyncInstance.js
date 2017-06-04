import bs from 'browser-sync';

const instance = bs.has('server') ? bs.get('server') : bs.create('server');

export default instance;
