export const SERVER_URL = process.env.NEXT_PUBLIC_API_URL as string

export const API_URL = {
  root: (url = '') => `${url ? url : ''}`,

  auth: (url = '') => API_URL.root(`http://localhost:4000/api/auth${url}`),
  category: (url = '') => API_URL.root(`/categories${url}`),
  order: (url = '') => API_URL.root(`/orders${url}`),
  product: (url = '') => API_URL.root(`/products${url}`),
  review: (url = '') => API_URL.root(`/reviews${url}`),
  user: (url = '') => API_URL.root(`/user${url}`),
}
