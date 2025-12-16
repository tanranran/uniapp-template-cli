import fs from 'node:fs'
import path from 'node:path'
import * as prettier from 'prettier'

export function handlePageName(ctx, inKey) {
  if (!(inKey in ctx)) return
  ctx[inKey].forEach((page) => {
    // 配置优先级高于自动生成
    if (page.name) return
    // 将路径中的 /.- 替换为下划线，并转换为大写，作为路由名称
    // 例如：路径 pages/home/index.page.vue 会生成路由名称 PAGES_HOME_INDEX_PAGE
    // 你可以根据需要修改生成规则，建议通过 path 转化而成，大多数情况下能保持全局唯一，而且容易从 name 猜测页面所在
    if (page.pages) {
      // 分包
      for (const pageItem of page.pages) {
        pageItem.name = pageItem.path.replace(/[/.-]/g, '_').toUpperCase()
      }
    } else {
      page.name = page.path.replace(/[/.-]/g, '_').toUpperCase()
    }
  })
}

export async function writePageConst(ctx) {
  const pageConstEntries = []
  ;[...ctx.pageMetaData, ...ctx.subPageMetaData].forEach((page) => {
    // 使用标题作为注释
    const comment = `/** ${page.style?.navigationBarTitleText || ''} */`
    // name 作为唯一键
    pageConstEntries.push(`${comment}\n"${page.name}": "/${page.path}",\n`)
  })
  // 如果你是 ts 项目，可以对照参考改为 enum 或者其他形式
  const fileContent = `
  /*******************************
   * 此文件由脚本自动生成，请勿手动修改 *
   *******************************/
  /**
   * 页面路径常量
   */
  export const PageUrlConst = {\n${pageConstEntries.join('\n')}\n}
  `
  const filepath = path.resolve(__dirname, '../src/router/pageConst.ts')
  console.log('生成路径', filepath)
  try {
    // 确保目录存在
    const dir = path.dirname(filepath)
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }
    // 如果你不需要 prettier 美化代码，可以跳过该步骤，直接写入文件
    const prettierConfig = await prettier.resolveConfig(filepath)
    const formattedContent = await prettier.format(fileContent, {
      ...prettierConfig,
      filepath
    })
    fs.writeFileSync(filepath, formattedContent, {
      encoding: 'utf-8'
    })
    console.log(`✅ 页面路径常量文件已成功生成：${filepath}`)
  } catch (error) {
    console.error(`❌ 生成页面路径常量文件失败：${error.message}`)
    console.error('错误详情：', error)
  }
}
