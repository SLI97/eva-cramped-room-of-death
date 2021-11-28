import Singleton from '../base/Singleton'

/**
 * 全局数据管理类
 */
export default class DataManager extends Singleton{
    static get Instance() {
        return super.GetInstance(DataManager)
    }

    player:any
    enemies:any
    spikes:any
    bursts:any
    door:any
    smokes:any
    records:any

    constructor() {
        super()
        this.levelIndex = 1
        this.frame = 0
        this.tileGoInfo = []
        // this.reset()
    }

    reset() {

        //地图偏移
        // this.offset = {
        //     width: 0,
        //     height: 0
        // }

        //地图信息
        this.mapInfo = []
        this.mapRowCount = 0
        this.mapColumnCount = 0

        //活动元素信息
        if (this.player) {
            this.player.off()
        }
        this.player = null

        if (this.enemies instanceof Array && this.enemies.length) {
            this.enemies.forEach(i => {
                i.off()
            })
        }
        this.enemies = []

        if (this.spikes instanceof Array && this.spikes.length) {
            this.spikes.forEach(i => {
                i.off()
            })
        }
        this.spikes = []

        if (this.bursts instanceof Array && this.bursts.length) {
            this.bursts.forEach(i => {
                i.off()
            })
        }
        this.bursts = []
        //
        // if (this.door) {
        //     this.door.off()
        // }
        this.door = null
        this.smokes = []

        this.records = []
    }
}
