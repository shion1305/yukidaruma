export declare class Snowflake {
    private epoch;
    private sequence;
    private machineId;
    private sequenceBits;
    private machineBits;
    private timeShift;
    constructor(epoch: number, machineId: number);
    generateId(): bigint;
}
