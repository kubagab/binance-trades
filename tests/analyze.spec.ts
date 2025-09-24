import {ProcessedKline} from '../src/services/getTrades'
import {analzyeTrades} from '../src/services/analyze'

describe('analyzeTrades', () => {
    it('', () => {
       const trades = [
        {timestamp: 1, open: 10, close: 11, high: 12, low: 9, volume:100, change: 1, changePercent: 2},
        {timestamp: 3, open: 20, close: 22, high: 24, low: 18, volume:200, change: 1, changePercent: 2}
       ]

       const summary = analzyeTrades(trades)
       expect(summary.firstClose).toBe(11)
       expect(summary.lastClose).toBe(22)
       expect(summary.absoluteChange).toBe(11)
       expect(summary.totalVolume).toBe(300)
       expect(summary.vwap).toBeCloseTo(18.33)
       expect(summary.minPrice).toBe(9)
       expect(summary.maxPrice).toBe(24)
    })

    it('should return 0', () => {
        const summary = analzyeTrades([])
        expect(summary.firstClose).toBe(0)
       expect(summary.lastClose).toBe(0)
       expect(summary.absoluteChange).toBe(0)
       expect(summary.totalVolume).toBe(0)
       expect(summary.vwap).toBe(0)
       expect(summary.minPrice).toBe(null)
       expect(summary.maxPrice).toBe(null)
    })
})
