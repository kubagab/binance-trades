import dotenv from 'dotenv'

dotenv.config()

export const PORT = process.env.PORT
export const DEFAULT_SYMBOL = process.env.DEFAULT_SYMBOL
export const INTERVAL = process.env.INTERVAL
export const LIMIT = process.env.LIMIT