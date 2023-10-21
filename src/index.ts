export class Snowflake {
    private epoch: number;
    private sequence: number = 0;
    private machineId: number;
    private sequenceBits: number;
    private machineBits: number;
    private timeShift: number;

    constructor(epoch: number, machineId: number) {
        this.epoch = epoch;
        this.machineId = machineId;

        this.sequenceBits = 12;
        this.machineBits = 10;

        this.timeShift = this.sequenceBits + this.machineBits;
    }

    public generateId(): bigint {
        const now = BigInt(Date.now());
        const timeStamp = now - BigInt(this.epoch);

        if (this.sequence >= (1 << this.sequenceBits) - 1) {
            this.sequence = 0;
        } else {
            this.sequence++;
        }

        let id: bigint = timeStamp << BigInt(this.timeShift);
        id |= BigInt(this.machineId) << BigInt(this.sequenceBits);
        id |= BigInt(this.sequence);

        return id;
    }
}

// // 使用例:
// const epoch = 1609459200000;
// const machineId = 1;
// const snowflake = new Snowflake(epoch, machineId);
// const uniqueId = snowflake.generateId();
// console.log(uniqueId.toString());
