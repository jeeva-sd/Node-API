export const statusData = [{
    id: 1,
    name: 'Active',
    description: 'User is active',
},
{
    id: 0,
    name: 'Banned',
    description: 'User is banned',
},
{
    id: -1,
    name: 'Hold',
    description: 'User in Hold',
},
{
    id: -2,
    name: 'Inactive',
    description: 'User is inactive',
},
{
    id: 100,
    name: 'Issued',
    description: 'Ticket issued. Task is ongoing',
},
{
    id: 101,
    name: 'Rejected',
    description: 'Task is Rejected',
},
{
    id: 102,
    name: 'Completed',
    description: 'Task is completed',
}];

export const roleData = [{
    id: 1,
    name: 'Developer',
    description: 'Developer account',
},
{
    id: 2,
    name: 'Super Admin',
    description: 'Owner of organization',
},
{
    id: 3,
    name: 'Admin',
    description: 'Owner of branch',
},
{
    id: 4,
    name: 'Standard User',
    description: 'Employee',
},
{
    id: 5,
    name: 'Spectator',
    description: 'Demo user',
}];

export const userData = [{
    name: 'developer',
    roleId: 1,
    statusId: 1,
    phone: '9876543210',
    password: '$2b$10$uhyw1Ypxa4WvknBLnrAsYuaMGJKcHiOvDQZMYwlQ0yzuiP6FS.Nym'
},
{
    'name': 'Billa',
    'phone': '0123456789',
    roleId: 2,
    'email': 'Billa@example.com',
    'password': '$2b$10$Iu4AxV0c.Vl8iw2fTiO6cOZ.ugnqiiwqwf0YLjIFYcSlqttMX2BP6',
    'orgName': 'Billa org'
}];