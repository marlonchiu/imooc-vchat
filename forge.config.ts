import type { ForgeConfig } from '@electron-forge/shared-types'
import { MakerSquirrel } from '@electron-forge/maker-squirrel' // windows 平台
import { MakerZIP } from '@electron-forge/maker-zip'
import { MakerDeb } from '@electron-forge/maker-deb'
import { MakerRpm } from '@electron-forge/maker-rpm'
import { MakerDMG } from '@electron-forge/maker-dmg'
import { VitePlugin } from '@electron-forge/plugin-vite'
import { FusesPlugin } from '@electron-forge/plugin-fuses'
import { FuseV1Options, FuseVersion } from '@electron/fuses'
import path from 'path'

const config: ForgeConfig = {
  // 基础打包配置
  packagerConfig: {
    name: 'VChat',
    icon: './src/assets/icon',
    asar: true // 将源码压缩为 asar档案
  },
  rebuildConfig: {},
  // 制作安装包的工具
  makers: [
    // 制作 Windows 安装包
    new MakerSquirrel({
      // 应用信息
      name: 'VChat',
      authors: 'xxx',
      description: 'A chat application',
      // 安装包配置
      setupIcon: './src/assets/icon.ico', // Windows 安装图标
      iconUrl: 'file://' + path.resolve('./src/assets/icon.ico'), // 使用本地图标
      // iconUrl: 'https://raw.githubusercontent.com/your-repo/vchat/main/assets/icon.ico', // 远程图标URL
      // 自定义安装程序选项
      setupExe: 'VChat-Setup.exe' // 安装程序名称
    }),
    // 制作 macOS 安装包
    new MakerDMG({
      icon: './src/assets/icon.ico',
      format: 'ULFO' // 创建的安装包格式, 默认为 'ULFO' 兼容性更好
    }),
    new MakerZIP({}, ['darwin', 'win32']), // 压缩包，直接解压就可以运行
    new MakerRpm({}), // RPM包 - 用于 Red Hat 系列 适用于:Red Hat，Fedora，Cent0S，SUSE
    new MakerDeb({}) // DEB包 - 用于 Debian 系列 适用于:Ubuntu，Debian，Linux Mint
  ],
  plugins: [
    new VitePlugin({
      // `build` can specify multiple entry builds, which can be Main process, Preload scripts, Worker process, etc.
      // If you are familiar with Vite configuration, it will look really familiar.
      build: [
        {
          // `entry` is just an alias for `build.lib.entry` in the corresponding file of `config`.
          entry: 'src/main.ts',
          config: 'vite.main.config.ts',
          target: 'main'
        },
        {
          entry: 'src/preload.ts',
          config: 'vite.preload.config.ts',
          target: 'preload'
        }
      ],
      renderer: [
        {
          name: 'main_window',
          config: 'vite.renderer.config.ts'
        }
      ]
    }),
    // Fuses are used to enable/disable various Electron functionality
    // at package time, before code signing the application
    new FusesPlugin({
      version: FuseVersion.V1,
      [FuseV1Options.RunAsNode]: false,
      [FuseV1Options.EnableCookieEncryption]: true,
      [FuseV1Options.EnableNodeOptionsEnvironmentVariable]: false,
      [FuseV1Options.EnableNodeCliInspectArguments]: false,
      [FuseV1Options.EnableEmbeddedAsarIntegrityValidation]: true,
      [FuseV1Options.OnlyLoadAppFromAsar]: true
    })
  ]
}

export default config
