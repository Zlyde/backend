const mockDatabase = {
    cities: [
        { id: 1, name: 'Stockholm' },
        { id: 2, name: 'Göteborg' },
        { id: 3, name: 'Malmö' }
    ],
    bikes: [
        { bike_id: 1, status: 'available', location: { lat: 59.3293, lng: 18.0686 }, battery_level: 85, last_service_date: '2024-01-10', parking_zone_id: 1, charging_station_id: null },
        { bike_id: 2, status: 'in-use', location: { lat: 59.3322, lng: 18.0648 }, battery_level: 60, last_service_date: '2024-02-15', parking_zone_id: null, charging_station_id: null },
        { bike_id: 3, status: 'maintenance', location: { lat: 59.3346, lng: 18.0701 }, battery_level: 20, last_service_date: '2024-03-01', parking_zone_id: null, charging_station_id: 1 }
    ],
    users: [
        {
            user_id: 1,
            name: 'Alice Andersson',
            email: 'alice@example.com',
            password_hash: '5f4dcc3b5aa765d61d8327deb882cf99', // Mockad hash (MD5 för "password")
            account_balance: 250,
            created_at: '2024-01-15T10:00:00Z',
            oauth_id: null,
            role: 'customer'
        },
        {
            user_id: 2,
            name: 'Bob Bergström',
            email: 'bob@example.com',
            password_hash: '5e884898da28047151d0e56f8dc62927', // Mockad hash (MD5 för "password123")
            account_balance: 500,
            created_at: '2024-02-20T12:30:00Z',
            oauth_id: 'google-oauth-id-123',
            role: 'customer'
        },
        {
            user_id: 3,
            name: 'Clara Carlsson',
            email: 'clara@example.com',
            password_hash: '6cb75f652a9b52798eb6cf2201057c73', // Mockad hash (MD5 för "adminpass")
            account_balance: 0,
            created_at: '2024-01-01T08:15:00Z',
            oauth_id: null,
            role: 'admin'
        }
    ]
};

module.exports = mockDatabase;