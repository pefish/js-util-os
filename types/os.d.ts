/**
 * os工具类
 */
export default class OsUtil {
    static getArgv(index: number): string;
    static getEnv(envName: string): string;
    static getPid(): number;
    static getLocalIp(): string;
    static getMachineHash(): string;
    static isMac(): boolean;
    static isLinux(): boolean;
    /**
     * 获取进程的所有子进程
     * @param pid {number | string}
     */
    static getChildPids(pid: number | string): [];
    /**
     * 获取进程所在的进程组id
     * @param pid
     */
    static getGip(pid: number): number | null;
    /**
     * 获取进程的父进程id
     * @param pid
     */
    static getParentPid(pid: number): number | null;
}
