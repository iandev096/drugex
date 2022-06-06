export function truncateString(str: string) {
    if (str.length < 18) {
        return str;
    }
    return str.slice(0, 12) + '...'
}