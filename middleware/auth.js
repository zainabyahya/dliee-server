const jwt = require('jsonwebtoken')
const User = require('../models/User')

/**
 * Protects any route by looking for a Bearer token in Authorization header,
 * verifying it, loading the corresponding user, and attaching it to req.user.
 */
async function requireAuth(req, res, next) {
    try {
        // 1. Check for Authorization header
        const authHeader = req.headers.authorization
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Authorization token missing or malformed' })
        }

        // 2. Extract token
        const token = authHeader.split(' ')[1]

        // 3. Verify token
        const payload = jwt.verify(token, process.env.SECRET_KEY)
        if (!payload || !payload.userId) {
            return res.status(401).json({ message: 'Invalid token payload' })
        }

        // 4. Load user from DB (exclude password)
        const user = await User.findById(payload.userId).select('-password')
        if (!user) {
            return res.status(401).json({ message: 'User not found' })
        }

        // 5. Attach to request and continue
        req.user = user
        next()

    } catch (err) {
        // Handle token expiration or any other error
        console.error('Auth middleware error:', err)
        return res.status(401).json({ message: 'Authentication failed' })
    }
}

module.exports = requireAuth;
