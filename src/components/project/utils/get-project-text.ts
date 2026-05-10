export const getProjectText = (text) => {
    const baseurl = location.pathname

    return text
        .replace(/\.\/asset/g, `/assets/${baseurl.substring(1)}/asset`)
        // .replace(/\/\//g, '/')
}