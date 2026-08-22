export const APP_URL = process.env.APP_URL as string

export const PUBLIC_URL = {
  root: (url = '') => `${url ? url : ''}`,

  home: () => PUBLIC_URL.root('/'),
  auth: () => PUBLIC_URL.root('/auth'),

  user: () => PUBLIC_URL.root('/user'),
  order: () => PUBLIC_URL.root('/user/order'),
  wish: () => PUBLIC_URL.root('/user/wish'),
  viewed: () => PUBLIC_URL.root('/user/viewed'),
  logout: () => PUBLIC_URL.root('/user/logout'),

  product: (id = '') => PUBLIC_URL.root(`/product/${id}`),
  category: (id = '') => PUBLIC_URL.root(`/category/${id}`),
}

export const ADMIN_URL = {
  root: (url = '') => `/admin${url ? url : ''}`,

  home: () => ADMIN_URL.root('/'),
}
