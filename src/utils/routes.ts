const ROUTES = {
  HOME: {
    path: '/',
  },
  PLAN_MANAGEMENT: {
    path: '/plan_management',
  },
  PLAN_CREATE: {
    path: '/plan_create/:slug',
    path_prefix: '/plan_create',
  },
  PLAN_DETAILS: {
    path: '/plans/:id',
    path_prefix: '/plans',
  },
}

export default ROUTES
