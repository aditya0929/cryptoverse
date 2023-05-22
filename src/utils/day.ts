import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

/**
 * @example
 * timeToX('1990-01-01') // "31 years ago"
 * @param {Date} date date to be compare
 * @returns {String} of relative time to X.
 */
function timeToX(date: Date | string): string {
	return dayjs().to(dayjs(date));
}

export { timeToX };
