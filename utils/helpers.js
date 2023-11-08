/**
 * Truncate a string to a specified length and append "..." if it exceeds that length.
 * 
 * @param {string} str - The string to truncate.
 * @param {number} maxLength - The maximum length of the string before truncating.
 * @returns {string} - The truncated string.
 */
export function truncateString(str, maxLength) {
  if (str.length <= maxLength) {
    return str;
  }
  return str.slice(0, maxLength - 3) + '...';
}