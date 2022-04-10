module.exports = {

    getUserFullData: 'SELECT * FROM users WHERE user_name = $1 AND deleted_at = 0;'
}