const AuthService = require("../auth/auth-service")

function requireAuth(req, res, next) {
    const authToken = req.get('Authorization') || '';
    const bearerToken = authToken.slice(7, authToken.length)

    if (bearerToken === 'undefined') {
        res.json({jwt: "none"});
    } else {
        let tokenData = AuthService.verifyJwt(bearerToken);
        req.tokenData = tokenData;
        next();
    }
    
}

module.exports = { requireAuth }