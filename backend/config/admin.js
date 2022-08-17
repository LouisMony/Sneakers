module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', 'f7fe63decdb90abb442a0b6717ee8827'),
  },
});
