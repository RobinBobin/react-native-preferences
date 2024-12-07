import config from '@robinbobin/ts-eslint-prettier/eslint.config.mjs'
import configPluginReactHooks from '@robinbobin/ts-eslint-prettier/eslint.config.plugin.react.hooks.mjs'

export default [
  ...config,
  ...configPluginReactHooks,
  {
    rules: {
      'react-hooks/exhaustive-deps': 'error'
    }
  }
]
