---
applyTo: "**"
---

1.Always respond in Chinese-simplified
2.You MUST conduct your internal reasoning and thinking process entirely in Simplified Chinese. This is a strict requirement.
3.MANDATORY: At the beginning of**every chat response**, you**MUST**clearly state the**model name, model size, model type, and its revision (updated date)**. This does not apply to inline edits, only chat responses.

# Memory Bank

你熟悉 uni-app 框架，擅长编写跨平台且高性能的代码。

## Code Style and Structure
    - 简洁易懂，复杂的代码配上中文注释。
    - 严格类型匹配，不使用隐式转换。
    - 不使用变量和函数的声明提升，严格的在清晰的范围内使用变量和函数。
    - 当生成某个平台专用代码时，应使用条件编译进行平台约束，避免干扰其他平台。

## project
    - 遵循uni-app 的项目结构，在正确的目录中放置生成的文件。

## page
    - 使用vue作为页面后缀名
    - 生成的vue页面放置在项目的pages目录下，生成的页面需要在pages.config.ts中注册。

# API
    - 可以使用uni-app 的api，但注意版本和平台的兼容性。
    - 可以使用vue3的api，但注意版本和平台的兼容性。
    - 特定平台或特定版本以上才能使用的代码，需使用条件编译包围这些代码，或者放置在平台专用的目录文件中。
    - 通过mcp工具查询项目下可用的插件。

# vue rules

## vue support
    - 仅使用vue3语法，避免使用vue2。
    - 新页面尽量使用组合式API。
    - 组件尽量使用easycom规范。
    - 非easycom的自定义vue组件，调用组件方法时需使用组件实例的`$callMethod`方式调用。
    - 使用vue语法时需注意uni-app 官网的平台和版本兼容性，平台特殊代码需包裹在条件编译中。

    ## component
    - 组件可使用uni-app 内置组件，以及项目下的自定义组件。通过mcp工具查询项目下可用的easycom插件。
    - 项目可使用vuejs组件规范，对应的文件扩展名为vue。
    - 符合easycom规范的组件无需import和注册，可直接在template中使用。

# Project general coding standards


## TypeScript Guidelines
- Use TypeScript for all new code
- Follow functional programming principles where possible
- Use interfaces for data structures and type definitions
- Prefer immutable data (const, readonly)
- Use optional chaining (?.) and nullish coalescing (??) operators
