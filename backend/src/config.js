module.exports = {
    PORT: process.env.PORT || 8000,
    NODE_ENV: process.env.NODE_ENV || 'development',
    JWT_SECRET: process.env.JWT_SECRET || '',
    JWT_EXPIRY: process.env.JWT_EXPIRY || '3h',
    LOGIN_FORM_SHOW: process.env.LOGIN_FORM_SHOW || '',
    DB_URL: process.env.DB_URL || '',
    DATABASE_URL: process.env.DATABASE_URL || '',
    S3_BUCKET: process.env.S3_BUCKET || '',
    AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY || '',
    AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID || '',
    ADMIN_PASSWORD: process.env.ADMIN_PASSWORD || ''
  }
  