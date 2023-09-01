import { defineConfig } from 'vitepress'

import apidocConfig from '../apidocConfig.json'

export default defineConfig({
	base: '',
	title: 'savage-electron-ipc',
	themeConfig: {
		sidebar: {
			'/dist/': apidocConfig
		},
		socialLinks: [{ icon: 'github', link: 'https://github.com/savage181855' }],
		footer: {
			message: 'Released under the MIT License.',
			copyright: 'Copyright © 2019-present savage'
		},
		search: {
			provider: 'local'
		}
	}
})
