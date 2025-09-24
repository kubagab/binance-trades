import express from 'express'
import { PORT } from './config';
import tradeRouter from './routes/trades'


const app = express()
app.use(express.json())
app.use('/api', tradeRouter)


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    
})