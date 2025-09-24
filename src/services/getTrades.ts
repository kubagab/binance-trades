import axios from "axios";
import { DEFAULT_SYMBOL, INTERVAL, LIMIT } from "../config";

export interface BinanceKlineRaw {
    0: number,
    1: string,
    2: string,
    3: string,
    4: string,
    5: string,
    6: number,
    7: string,
    8: number,
    9: string,
    10: string,
    11: string
}

export interface ProcessedKline {
    timestamp: number,
    open: number,
    high: number,
    low: number,
    close: number,
    volume: number,
    change: number,
    changePercent: number
}

function processRawData(rawData: BinanceKlineRaw[]): ProcessedKline[]{
return rawData.map((kline: BinanceKlineRaw) => {
    const open = parseFloat(kline[1])
    const high = parseFloat(kline[2])
    const low = parseFloat(kline[3])
    const close = parseFloat(kline[4])
    const volume = parseFloat(kline[5])
    const change = close - open
    const changePercent = open !== 0 ? (change / open) * 100 : 0

    return {
        timestamp: kline[0],
        open,
        high,
        low,
        close,
        volume,
        change,
        changePercent
    }
})


}

export async function getTrades(): Promise<ProcessedKline[]> {

    try {
        const response = await axios.get(`https://api.binance.com/api/v3/klines?symbol=${DEFAULT_SYMBOL}&interval=${INTERVAL}&limit=${LIMIT}`)
        return processRawData(response.data)
    } catch (error: any) {
        console.log('error fetching data', error.message);
        throw new Error(`could not download data ${error.message}`)
        
    }

}