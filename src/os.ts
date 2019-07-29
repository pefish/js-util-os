/** @module */
import os from 'os'
import ShellHelper from '@pefish/js-helper-shell'

/**
 * os工具类
 */
export default class OsUtil {

  static getHomeDir (): string {
    return os.homedir()
  }

  static getArgv (index: number): string {
    //index:获取第几个参数
    return process.argv[index + 1]
  }

  static getEnv (envName: string): string {
    return process.env[envName]
  }

  static getPid (): number {
    return process.pid
  }

  static getLocalIp (): string {
    const ipLib = require('ip')
    return ipLib.address()
  }

  static getMachineHash (): string {
    const crypto = require('crypto')
    return crypto.createHash('md5').update(os.hostname()).digest('hex')
  }

  static isMac (): boolean {
    return os.platform() === 'darwin'
  }

  static isLinux (): boolean {
    return os.platform() === 'linux'
  }

  /**
   * 获取进程的所有子进程
   * @param pid {number | string}
   */
  static getChildPids (pid: number | string): [] {
    let cmd = `ps -jlx|awk -v ppid=${pid} 'BEGIN {} {if($4==ppid){print $4;}} END{}'`
    if (OsUtil.isMac()) {
      cmd = `ps -jlx|awk -v ppid=${pid} 'BEGIN {} {if($3==ppid){print $2;}} END{}'`
    }
    const ShellHelper = require('../helpers/shell').default
    const result = new ShellHelper(false).execSyncForResult(cmd, {
      silent: true
    })
    return result['stdout'].split('\n').removeLastOne()
  }

  /**
   * 获取进程所在的进程组id
   * @param pid
   */
  static getGip (pid: number): number | null {
    // ps -o pgid= ${pid}
    let cmd = `ps -jlx|awk -v pid=${pid} 'BEGIN {} {if($4==pid){print $6;}} END{}'`
    if (OsUtil.isMac()) {
      cmd = `ps -jlx|awk -v pid=${pid} 'BEGIN {} {if($2==pid){print $4;}} END{}'`
    }
    const result = new ShellHelper().execSyncForResult(cmd, {
      silent: true
    })
    return result['stdout'].removeLastEnter() || null
  }

  /**
   * 获取进程的父进程id
   * @param pid
   */
  static getParentPid (pid: number): number | null {
    // ps -o ppid= ${pid}
    let cmd = `ps -jlx|awk -v pid=${pid} 'BEGIN {} {if($4==pid){print $5;}} END{}'`
    if (OsUtil.isMac()) {
      cmd = `ps -jlx|awk -v pid=${pid} 'BEGIN {} {if($2==pid){print $3;}} END{}'`
    }
    const result = new ShellHelper().execSyncForResult(cmd, {
      silent: true
    })
    return result['stdout'].removeLastEnter() || null
  }
}
