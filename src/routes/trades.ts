import { Router, Request, Response } from "express";
import { getTrades } from "../services/getTrades";
import { analzyeTrades } from "../services/analyze";

const router = Router();

router.get('/trades', async (req: Request, res: Response) => {
    try {
        const processedData = await getTrades()
        const analyzed = analzyeTrades(processedData)

        res.send(analyzed)
    } catch (error: any) {
        res.status(500).json({error: error.message})
    }
})

export default router;