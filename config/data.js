const roles = [
  {
    name: 'Super Admin',
    description:
      'Super Admins can access and manage all features and settings.',
    type: 'SUPER_ADMIN',
  },
  {
    name: 'Finance',
    description: 'Default role given to finance user',
    type: 'FINANCE',
  },
  {
    name: 'Accountant',
    description: 'Default role given to accountant user',
    type: 'ACCOUNTANT',
  },
  {
    name: 'Agency',
    description: 'Default role given to agency organizations.',
    type: 'AGENCY',
  },
  {
    name: 'Authenticated',
    description: 'Default role given to authenticated user.',
    type: 'AUTHENTICATED',
  },
]

const users = {
  name: 'Ahmed Ibrahim',
  email: 'ahmed@websom.dev',
  password: '123456',
  confirmed: true,
  blocked: false,
}

const profile = {
  phone: '+252615301507',
  address: 'Mogadishu',
  image: 'https://github.com/ahmaat19.png',
  bio: 'Full Stack Developer',
}

const clientPermissions = [
  {
    name: 'Home',
    path: '/',
    menu: 'hidden',
    auth: true,
    description: 'Home page',
  },
  {
    name: 'Users',
    path: '/admin/auth/users',
    menu: 'admin',
    auth: true,
    description: 'Users page',
  },
  {
    name: 'Roles',
    path: '/admin/auth/roles',
    menu: 'admin',
    auth: true,
    description: 'Roles page',
  },
  {
    name: 'Profile',
    path: '/account/profile',
    menu: 'profile',
    auth: true,
    description: 'Profile page',
  },
  {
    name: 'Permissions',
    path: '/admin/auth/permissions',
    menu: 'admin',
    auth: true,
    description: 'Permissions page',
  },
  {
    name: 'Client Permissions',
    path: '/admin/auth/client-permissions',
    menu: 'admin',
    auth: true,
    description: 'Client Permissions page',
  },
  {
    name: 'User Roles',
    path: '/admin/auth/user-roles',
    menu: 'admin',
    auth: true,
    description: 'User Roles page',
  },
  {
    name: 'User Profiles',
    path: '/admin/auth/user-profiles',
    menu: 'admin',
    auth: true,
    description: 'User Profiles page',
  },
  {
    name: 'Agencies',
    path: '/setting/agencies',
    menu: 'setting',
    auth: true,
    description: 'Agencies page',
  },
  {
    name: 'Airports',
    path: '/setting/airports',
    menu: 'setting',
    auth: true,
    description: 'Airports page',
  },
  {
    name: 'Seaports',
    path: '/setting/seaports',
    menu: 'setting',
    auth: true,
    description: 'Seaports page',
  },
  {
    name: 'Commodities',
    path: '/setting/commodities',
    menu: 'setting',
    auth: true,
    description: 'Commodities page',
  },
  {
    name: 'Containers',
    path: '/setting/containers',
    menu: 'setting',
    auth: true,
    description: 'Containers page',
  },
  {
    name: 'Countries',
    path: '/setting/countries',
    menu: 'setting',
    auth: true,
    description: 'Countries page',
  },
  {
    name: 'Towns',
    path: '/setting/towns',
    menu: 'setting',
    auth: true,
    description: 'Towns page',
  },
  {
    name: 'Transportations',
    path: '/setting/transportations',
    menu: 'setting',
    auth: true,
    description: 'Transportations page',
  },
  {
    name: 'Tradelanes',
    path: '/setting/tradelanes',
    menu: 'setting',
    auth: true,
    description: 'Tradelanes page',
  },
  {
    name: 'Orders',
    path: '/orders',
    menu: 'order',
    auth: true,
    description: 'Create New Orders page',
  },
  {
    name: 'New Order',
    path: '/orders/bookings',
    menu: 'order',
    auth: true,
    description: 'Order list page',
  },
  {
    name: 'Order Details',
    path: '/orders/details/[id]',
    menu: 'order',
    auth: true,
    description: 'Order details page',
  },
]

const permissions = [
  {
    description: 'Get All Users',
    route: '/api/auth/users',
    auth: true,
    name: 'Users',
    method: 'GET',
  },
  {
    description: 'Get User By Id',
    route: '/api/auth/users/:id',
    auth: true,
    name: 'Users',
    method: 'GET',
  },
  {
    description: 'Create User',
    route: '/api/auth/users',
    auth: true,
    name: 'Users',
    method: 'POST',
  },
  {
    description: 'Update User',
    route: '/api/auth/users/:id',
    auth: true,
    name: 'Users',
    method: 'PUT',
  },
  {
    description: 'Delete User',
    route: '/api/auth/users/:id',
    auth: true,
    name: 'Users',
    method: 'DELETE',
  },
  {
    description: 'Login',
    route: '/api/auth/login',
    auth: false,
    name: 'Login',
    method: 'POST',
  },
  {
    description: 'Forgot Password',
    route: '/api/auth/forgot-password',
    auth: false,
    name: 'Forgot Password',
    method: 'POST',
  },
  {
    description: 'Reset Password',
    route: '/api/auth/reset-password',
    auth: false,
    name: 'Reset Password',
    method: 'POST',
  },
  {
    description: 'Get All User Profiles',
    route: '/api/auth/user-profiles',
    auth: true,
    name: 'User Profiles',
    method: 'GET',
  },
  {
    description: 'Get Profile',
    route: '/api/auth/profile',
    auth: true,
    name: 'User Profile',
    method: 'GET',
  },
  {
    description: 'Update Profile',
    route: '/api/auth/profile',
    auth: true,
    name: 'User Profile',
    method: 'POST',
  },
  {
    description: 'Get All Roles',
    route: '/api/auth/roles',
    auth: true,
    name: 'Roles',
    method: 'GET',
  },
  {
    description: 'Create Role',
    route: '/api/auth/roles',
    auth: true,
    name: 'Roles',
    method: 'POST',
  },
  {
    description: 'Update Role',
    route: '/api/auth/roles/:id',
    auth: true,
    name: 'Roles',
    method: 'PUT',
  },
  {
    description: 'Delete Role',
    route: '/api/auth/roles/:id',
    auth: true,
    name: 'Roles',
    method: 'DELETE',
  },
  {
    description: 'Get All Permissions',
    route: '/api/auth/permissions',
    auth: true,
    name: 'Permissions',
    method: 'GET',
  },
  {
    description: 'Create Permission',
    route: '/api/auth/permissions',
    auth: true,
    name: 'Permissions',
    method: 'POST',
  },
  {
    description: 'Update Permission',
    route: '/api/auth/permissions/:id',
    auth: true,
    name: 'Permissions',
    method: 'PUT',
  },
  {
    description: 'Delete Permission',
    route: '/api/auth/permissions/:id',
    auth: true,
    name: 'Permissions',
    method: 'DELETE',
  },
  {
    description: 'Get All User Roles',
    route: '/api/auth/user-roles',
    auth: true,
    name: 'User Roles',
    method: 'GET',
  },
  {
    description: 'Get User Roles By Id With POST',
    route: '/api/auth/user-roles/:id',
    auth: false,
    name: 'User Roles',
    method: 'POST',
  },
  {
    description: 'Create User Role',
    route: '/api/auth/user-roles',
    auth: true,
    name: 'User Roles',
    method: 'POST',
  },
  {
    description: 'Update User Role',
    route: '/api/auth/user-roles/:id',
    auth: true,
    name: 'User Roles',
    method: 'PUT',
  },
  {
    description: 'Delete User Role',
    route: '/api/auth/user-roles/:id',
    auth: true,
    name: 'User Roles',
    method: 'DELETE',
  },
  {
    description: 'Get All ClientPermissions',
    route: '/api/auth/client-permissions',
    auth: true,
    name: 'ClientPermissions',
    method: 'GET',
  },
  {
    description: 'Create Permission',
    route: '/api/auth/client-permissions',
    auth: true,
    name: 'ClientPermissions',
    method: 'POST',
  },
  {
    description: 'Update Permission',
    route: '/api/auth/client-permissions/:id',
    auth: true,
    name: 'ClientPermissions',
    method: 'PUT',
  },
  {
    description: 'Delete Permission',
    route: '/api/auth/client-permissions/:id',
    auth: true,
    name: 'ClientPermissions',
    method: 'DELETE',
  },

  // Agency endpoint
  {
    description: 'Get All Agencies',
    route: '/api/setting/agencies',
    auth: true,
    name: 'Agency',
    method: 'GET',
  },
  {
    description: 'Create Agency',
    route: '/api/setting/agencies',
    auth: true,
    name: 'Agency',
    method: 'POST',
  },
  {
    description: 'Update Agency',
    route: '/api/setting/agencies/:id',
    auth: true,
    name: 'Agency',
    method: 'PUT',
  },
  {
    description: 'Delete Agency',
    route: '/api/setting/agencies/:id',
    auth: true,
    name: 'Agency',
    method: 'DELETE',
  },

  // Airport endpoint
  {
    description: 'Get All Airports',
    route: '/api/setting/airports',
    auth: true,
    name: 'Airport',
    method: 'GET',
  },
  {
    description: 'Create Airport',
    route: '/api/setting/airports',
    auth: true,
    name: 'Airport',
    method: 'POST',
  },
  {
    description: 'Update Airport',
    route: '/api/setting/airports/:id',
    auth: true,
    name: 'Airport',
    method: 'PUT',
  },
  {
    description: 'Delete Airport',
    route: '/api/setting/airports/:id',
    auth: true,
    name: 'Airport',
    method: 'DELETE',
  },

  // Commodity endpoint
  {
    description: 'Get All Commodities',
    route: '/api/setting/commodities',
    auth: true,
    name: 'Commodity',
    method: 'GET',
  },
  {
    description: 'Create Commodity',
    route: '/api/setting/commodities',
    auth: true,
    name: 'Commodity',
    method: 'POST',
  },
  {
    description: 'Update Commodity',
    route: '/api/setting/commodities/:id',
    auth: true,
    name: 'Commodity',
    method: 'PUT',
  },
  {
    description: 'Delete Commodity',
    route: '/api/setting/commodities/:id',
    auth: true,
    name: 'Commodity',
    method: 'DELETE',
  },

  // Container endpoint
  {
    description: 'Get All Containers',
    route: '/api/setting/containers',
    auth: true,
    name: 'Container',
    method: 'GET',
  },
  {
    description: 'Create Container',
    route: '/api/setting/containers',
    auth: true,
    name: 'Container',
    method: 'POST',
  },
  {
    description: 'Update Container',
    route: '/api/setting/containers/:id',
    auth: true,
    name: 'Container',
    method: 'PUT',
  },
  {
    description: 'Delete Container',
    route: '/api/setting/containers/:id',
    auth: true,
    name: 'Container',
    method: 'DELETE',
  },

  // Country endpoint
  {
    description: 'Get All Countries',
    route: '/api/setting/countries',
    auth: true,
    name: 'Country',
    method: 'GET',
  },
  {
    description: 'Create Country',
    route: '/api/setting/countries',
    auth: true,
    name: 'Country',
    method: 'POST',
  },
  {
    description: 'Update Country',
    route: '/api/setting/countries/:id',
    auth: true,
    name: 'Country',
    method: 'PUT',
  },
  {
    description: 'Delete Country',
    route: '/api/setting/countries/:id',
    auth: true,
    name: 'Country',
    method: 'DELETE',
  },

  // Seaport endpoint
  {
    description: 'Get All Seaports',
    route: '/api/setting/seaports',
    auth: true,
    name: 'Seaport',
    method: 'GET',
  },
  {
    description: 'Create Seaport',
    route: '/api/setting/seaports',
    auth: true,
    name: 'Seaport',
    method: 'POST',
  },
  {
    description: 'Update Seaport',
    route: '/api/setting/seaports/:id',
    auth: true,
    name: 'Seaport',
    method: 'PUT',
  },
  {
    description: 'Delete Seaport',
    route: '/api/setting/seaports/:id',
    auth: true,
    name: 'Seaport',
    method: 'DELETE',
  },

  // Town endpoint
  {
    description: 'Get All Towns',
    route: '/api/setting/towns',
    auth: true,
    name: 'Town',
    method: 'GET',
  },
  {
    description: 'Create Town',
    route: '/api/setting/towns',
    auth: true,
    name: 'Town',
    method: 'POST',
  },
  {
    description: 'Update Town',
    route: '/api/setting/towns/:id',
    auth: true,
    name: 'Town',
    method: 'PUT',
  },
  {
    description: 'Delete Town',
    route: '/api/setting/towns/:id',
    auth: true,
    name: 'Town',
    method: 'DELETE',
  },

  // Transportation endpoint
  {
    description: 'Get All Transportations',
    route: '/api/setting/transportations',
    auth: true,
    name: 'Transportation',
    method: 'GET',
  },
  {
    description: 'Create Transportation',
    route: '/api/setting/transportations',
    auth: true,
    name: 'Transportation',
    method: 'POST',
  },
  {
    description: 'Update Transportation',
    route: '/api/setting/transportations/:id',
    auth: true,
    name: 'Transportation',
    method: 'PUT',
  },
  {
    description: 'Delete Transportation',
    route: '/api/setting/transportations/:id',
    auth: true,
    name: 'Transportation',
    method: 'DELETE',
  },

  // Tradelane endpoint
  {
    description: 'Get All Tradelanes',
    route: '/api/setting/tradelanes',
    auth: true,
    name: 'Tradelane',
    method: 'GET',
  },
  {
    description: 'Create Tradelane',
    route: '/api/setting/tradelanes',
    auth: true,
    name: 'Tradelane',
    method: 'POST',
  },
  {
    description: 'Update Tradelane',
    route: '/api/setting/tradelanes/:id',
    auth: true,
    name: 'Tradelane',
    method: 'PUT',
  },
  {
    description: 'Delete Tradelane',
    route: '/api/setting/tradelanes/:id',
    auth: true,
    name: 'Tradelane',
    method: 'DELETE',
  },

  // Order endpoint
  {
    description: 'Get All Orders',
    route: '/api/orders',
    auth: true,
    name: 'Orders',
    method: 'GET',
  },
  {
    description: 'Create Order',
    route: '/api/orders',
    auth: true,
    name: 'Orders',
    method: 'POST',
  },
  {
    description: 'Update Order',
    route: '/api/orders/:id',
    auth: true,
    name: 'Orders',
    method: 'PUT',
  },
  {
    description: 'Delete Order',
    route: '/api/orders/:id',
    auth: true,
    name: 'Orders',
    method: 'DELETE',
  },
  {
    description: 'Get Order Details',
    route: '/api/orders/:id',
    auth: true,
    name: 'Orders',
    method: 'GET',
  },
  {
    description: 'Get Available Transportations',
    route: '/api/orders/transportations',
    auth: true,
    name: 'Order Transportation',
    method: 'POST',
  },
  {
    description: 'Search Orders',
    route: '/api/orders/lists',
    auth: true,
    name: 'Search Orders',
    method: 'POST',
  },
  {
    description: 'Update Order To Confirm',
    route: '/api/orders/edit/:id/confirm',
    auth: true,
    name: 'Confirm Order',
    method: 'PUT',
  },
  {
    description: 'Update Order To Cancel',
    route: '/api/orders/edit/:id/cancel',
    auth: true,
    name: 'Cancel Order',
    method: 'PUT',
  },
  {
    description: 'Update Order Buyer',
    route: '/api/orders/edit/:id/buyer',
    auth: true,
    name: 'Buyer Order',
    method: 'PUT',
  },
  {
    description: 'Update Order Drop-Off',
    route: '/api/orders/edit/:id/dropoff',
    auth: true,
    name: 'Drop-Off Order',
    method: 'PUT',
  },
  {
    description: 'Update Order Pick-Up',
    route: '/api/orders/edit/:id/pickup',
    auth: true,
    name: 'Pick-Up Order',
    method: 'PUT',
  },
  {
    description: 'Update Order Other',
    route: '/api/orders/edit/:id/other',
    auth: true,
    name: 'Other Order',
    method: 'PUT',
  },
]

export { roles, users, profile, permissions, clientPermissions }
