import bs from 'browser-sync';

const instance = (bs.has('default')) ? bs.get('default') : bs.create('default');

export default instance;
