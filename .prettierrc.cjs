// Prettier配置文档：https://prettier.io/docs/en/options.html
module.exports = {
  printWidth: 400, //指定每行的最大长度。当代码超过 180 个字符时，Prettier 会尝试将其换行
  tabWidth: 2, //指定一个制表符（Tab）等于多少个空格。这里设置为 2。
  useTabs: false, //使用空格进行缩进，而不是使用制表符。
  semi: true, //在语句末尾打印分号。
  singleQuote: true, //使用单引号（'）而不是双引号（"）。
  quoteProps: 'as-needed', //仅在对象属性名需要时（例如属性名包含特殊字符）才为其添加引号。
  jsxSingleQuote: false, //在 JSX 中使用双引号而不是单引号。
  trailingComma: 'none', //仅在ES5 中需要的位置添加逗号
  bracketSpacing: true, //在对象字面量的大括号 {} 内侧打印空格。例如 { foo: bar } 而不是 {foo:bar}。
  bracketSameLine: true, //将多行 HTML (HTML, JSX, Vue, Angular) 元素的 > 放在新的一行。
  arrowParens: 'always', //总是在箭头函数的单个参数周围加上括号。例如 (x) => x 而不是 x => x。
  proseWrap: 'preserve', //对于 Markdown 等文本文件，保持其原有的换行方式，不做自动换行处理。
  htmlWhitespaceSensitivity: 'ignore', //忽略 HTML、Vue、Angular 和 Handlebars 文件中的全局空白敏感性。Prettier 会对标签周围的空白进行更自由的格式化。
  vueIndentScriptAndStyle: false, //不缩进 .vue 文件中的 <script> 和 <style> 标签内的代码。
  endOfLine: 'lf', //统一使用 LF (\n) 作为换行符，通常用于 Linux 和 macOS 系统。
  embeddedLanguageFormatting: 'auto', //让 Prettier 自动格式化文件中的嵌入代码，例如 HTML 字符串中的 JavaScript 代码。
  singleAttributePerLine: false, //允许多个属性存在于同一行，而不是强制每个属性单独占一行。
  // Prettier 可以限制自己只格式化在文件顶部包含特殊注释（称为 pragma）的文件。这在逐渐将大型、未格式化的代码库过渡到 Prettier 时非常有用<bool>，默认false
  requirePragma: false,
  // Prettier可以在文件的顶部插入一个 @format 的特殊注释，以表明该文件已经被Prettier格式化过了。在使用 --require-pragma 参数处理一连串的文件时这个功能将十分有用。如果文件顶部已经有一个doclock，这个选项将新建一行注释，并打上 @format 标记<bool>，默认false
  insertPragma: false,
  //自定义文件后缀对应的parser
  parsers: {
    '.html': 'html',
    '.nvue': 'vue',
    '.ux': 'vue',
    '.uvue': 'vue',
    '.uts': 'typescript'
  }
};
