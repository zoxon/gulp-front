import del from 'del';
import { delConfig } from '../config';

const cleanup = callback => del(delConfig, callback);

export default cleanup;
