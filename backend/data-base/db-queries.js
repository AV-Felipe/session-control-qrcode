module.exports = {

    getUserFullData: 'SELECT * FROM users WHERE user_name = $1 AND deleted_at = 0;',

    insertNewUser: `
    INSERT INTO users (full_name, user_name, password, user_type)
    VALUES ($1, $2, $3, 'user')
    RETURNING id;
    `,

    listAllUsers: 'SELECT id, full_name, user_name FROM users WHERE deleted_at = 0;'
}