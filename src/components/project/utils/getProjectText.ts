export const getProjectText = (text) => {
    const baseurl = location.pathname

    return text.replace(/\.\/asset/g, `/assets/${baseurl}/asset`).replace(/\/\//g, '/')
}