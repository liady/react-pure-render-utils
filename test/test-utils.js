export function toObj(...arr) {
    return arr.reduce((acc, cur, i) => {acc[String.fromCharCode(97 + i)] = cur; return acc}, {});
}