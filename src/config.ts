import { app } from 'electron'
import path from 'path'
import fs from 'fs/promises'
import { AppConfig, DEFAULT_CONFIG } from './types'

// 配置文件路径
const configPath = path.join(app.getPath('userData'), 'config.json')
// 默认配置
let config = { ...DEFAULT_CONFIG }

export const configManager = {
  async load(): Promise<AppConfig> {
    try {
      const data = await fs.readFile(configPath, 'utf8')
      config = { ...DEFAULT_CONFIG, ...JSON.parse(data) }
    } catch (error) {
      await this.save()
    }
    return config
  },

  async save() {
    await fs.writeFile(configPath, JSON.stringify(config, null, 2), 'utf8')
    return config
  },

  async update(newConfig: Partial<AppConfig>) {
    config = { ...config, ...newConfig }
    await this.save()
    return config
  },

  get() {
    return config
  }
}
