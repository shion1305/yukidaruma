"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Snowflake = void 0;
class Snowflake {
    constructor(epoch, machineId) {
        this.sequence = 0;
        this.epoch = epoch;
        this.machineId = machineId;
        this.sequenceBits = 12;
        this.machineBits = 10;
        this.timeShift = this.sequenceBits + this.machineBits;
    }
    generateId() {
        const now = BigInt(Date.now());
        const timeStamp = now - BigInt(this.epoch);
        if (this.sequence >= (1 << this.sequenceBits) - 1) {
            this.sequence = 0;
        }
        else {
            this.sequence++;
        }
        let id = timeStamp << BigInt(this.timeShift);
        id |= BigInt(this.machineId) << BigInt(this.sequenceBits);
        id |= BigInt(this.sequence);
        return id;
    }
}
exports.Snowflake = Snowflake;
// // 使用例:
// const epoch = 1609459200000;
// const machineId = 1;
// const snowflake = new Snowflake(epoch, machineId);
// const uniqueId = snowflake.generateId();
// console.log(uniqueId.toString());
//# sourceMappingURL=index.js.map