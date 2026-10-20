/** Public-folder URL that works both locally ("/") and on GitHub Pages ("/restro-asia-web/"). */
export const asset = (path: string) => import.meta.env.BASE_URL + path.replace(/^\//, '')
