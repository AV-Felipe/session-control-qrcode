module.exports = {

    getUserFullData: 'SELECT * FROM users WHERE user_name = $1 AND deleted_at = 0;',

    insertNewUser: `
    INSERT INTO users (full_name, user_name, password, user_type)
    VALUES ($1, $2, $3, 'user')
    RETURNING id;
    `,

    listAllUsers: 'SELECT id, full_name, user_name FROM users WHERE deleted_at = 0;',

    listAllEvents: 'SELECT id, title, description, event_date, event_time FROM events WHERE deleted_at IS NULL;',

    insertNewEvent: `
    INSERT INTO events (title, description, event_date, event_time)
    VALUES ($1, $2, $3, $4)
    RETURNING id;
    `
}