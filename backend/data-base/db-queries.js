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
    `,

    insertNewEnroll: `
    INSERT INTO users_events (user_id, event_id)
    VALUES ($1, $2)
    RETURNING id;
    `,

    getUserIdByUserName: `SELECT id FROM users where user_name = $1;`,

    getUserEnrolledEvents: `
    WITH matched_events AS (
        SELECT users_events.id as event_id, title, event_date, event_time, user_id, confirmed_presence
        FROM events
        LEFT JOIN users_events on event_id = events.id
    )
    SELECT full_name, user_name, title, event_date, event_time, event_id
        FROM matched_events
    LEFT JOIN users on users.id = user_id
    WHERE users.id = $1  AND confirmed_presence IS NULL
    ORDER BY event_date, event_time;
    `,

    confirmPresenceOnEvent: `
    UPDATE users_events
    SET confirmed_presence = NOW()
    WHERE id = $1
    RETURNING id, user_id, event_id, confirmed_presence;
    `
}