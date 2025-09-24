import {ProcessedKline} from './getTrades'

export interface Summary {
    firstClose: number,
    lastClose: number,
    absoluteChange: number,
    percentChange: number,
    totalVolume: number,
    vwap: number,
    minPrice: {price: number; timestamp: number} | null
    maxPrice: {price: number; timestamp: number} | null
}

export function analzyeTrades(trades: ProcessedKline[]): Summary {
if (!trades || trades.length === 0) {
    return {
        firstClose: 0,
        lastClose: 0,
        absoluteChange: 0,
        percentChange: 0,
        totalVolume: 0,
        vwap: 0,
        minPrice: null,
        maxPrice: null
    }
}

trades.sort((a, b) => a.timestamp - b.timestamp)

const firstClose = trades[0].close
const lastClose = trades[trades.length - 1].close
const absoluteChange = lastClose - firstClose
const percentChange = (absoluteChange / firstClose) * 100
const totalVolume = trades.reduce((sum, t) => sum + t.volume, 0)

let minPrice = {price: trades[0].low, timestamp: trades[0].timestamp}
let maxPrice = {price: trades[0].high, timestamp: trades[0].timestamp}

for (const trade of trades) {
    if (trade.low < minPrice.price) minPrice = {price: trade.low, timestamp: trades[0].timestamp}
    if (trade.high < maxPrice.price) minPrice = {price: trade.low, timestamp: trades[0].timestamp}
}

const vwapNumerator = trades.reduce((sum, t) => sum + t.close * t.volume, 0)
const vwap = vwapNumerator / totalVolume

return {
    firstClose,
    lastClose,
    absoluteChange,
    percentChange,
    totalVolume,
    vwap,
    minPrice,
    maxPrice
}
}