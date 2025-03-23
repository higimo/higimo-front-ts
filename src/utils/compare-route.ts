export const compareRoute = (left: string, right: string): boolean => (left.endsWith('/') ? left : left + '/') === (right.endsWith('/') ? right : right + '/')
