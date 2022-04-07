const base =
	process.env.NODE_ENV === 'production'
		? '/InhiblabCore/vue3-hooks-plus-docs'
		: ''
const { resolve } = require('path')

module.exports = {
	head: [['link', { rel: 'icon', href: '/favicon.ico' }]],
	title: 'Vue3-hooks-plus',
	description: '_description',
	// // 扫描srcIncludes里面的 *.md文件
	srcIncludes: ['src'],
	alias: {
		'vue3-hooks-plus': resolve('./src'),
	},
	base,
	themeConfig: {
		lang: 'zh-CN',
		title: 'Vue3-hooks-plus',
		// logo:
		// 	'https://banner2.cleanpng.com/20180718/cbh/kisspng-vue-js-javascript-library-angularjs-react-vue-js-5b4ebe1bc45884.1915769815318871318042.jpg',

		nav: [
			{ text: '指南', link: '/' },
			{ text: 'Hooks', link: '/useBoolean/' },
		],
		sidebar: {
			'/': getHooksSidebar(),
		},

		search: {
			searchMaxSuggestions: 10,
		},
		lang: 'zh-CN',
		repo: 'InhiblabCore/vue3-hooks-plus-docs',
		repoLabel: 'Github',
		lastUpdated: '最近更新',
		prevLink: true,
		nextLink: true,
	},
}

function getHooksSidebar() {
	return [
		{
			text: 'useRequest',
			children: [
				{
					text: '快速使用',
					link: '/useRequest/',
				},
				{
					text: '基础用法',
					link: '/useRequest/basic/',
				},
				{
					text: 'loadingDelay',
					link: '/useRequest/loadingDelay/',
				},
				{
					text: '轮询',
					link: '/useRequest/polling/',
				},
				{
					text: 'Ready',
					link: '/useRequest/ready/',
				},
				{
					text: '依赖刷新',
					link: '/useRequest/refreshDeps/',
				},
				{
					text: '屏幕聚焦重新请求',
					link: '/useRequest/refreshOnWindowFocus/',
				},
				{
					text: '防抖',
					link: '/useRequest/debounce/',
				},
				{
					text: '节流',
					link: '/useRequest/throttle/',
				},
				{
					text: '错误重试',
					link: '/useRequest/retry/',
				},
			],
		},
		{
			text: 'State',
			children: [
				{ text: 'useBoolean', link: '/useBoolean/' },
				// { text: 'useUrlState', link: '/useUrlState/' },
				{ text: 'useDebounce', link: '/useDebounce/' },
				{ text: 'useThrottle', link: '/useThrottle/' },
				{ text: 'useToggle', link: '/useToggle/' },
				{ text: 'useCookieState', link: '/useCookieState/' },
				{ text: 'useLocalStorageState', link: '/useLocalStorageState/' },
				{ text: 'useSessionStorageState', link: '/useSessionStorageState/' },
				{ text: 'useMap', link: '/useMap/' },
				{ text: 'useSet', link: '/useSet/' },
			],
		},
		{
			text: 'Effect',
			children: [
				{ text: 'useDebounceFn', link: '/useDebounceFn/' },
				{ text: 'useThrottleFn', link: '/useThrottleFn/' },
				{ text: 'useLockFn', link: '/useLockFn/' },
				{ text: 'useUpdate', link: '/useUpdate/' },
			],
		},
		{
			text: 'Scene',
			children: [
				{ text: 'useEcharts', link: '/useEcharts/' },
				{ text: 'useVirtualList', link: '/useVirtualList/' },
			],
		},
		{
			text: 'Dom',
			children: [
				{
					text: 'useEventListener',
					link: '/useEventListener/',
				},
				{ text: 'useDrop & useDrag', link: '/useDrop/' },
				{ text: 'useTitle', link: '/useTitle/' },
				{ text: 'useSize', link: '/useSize/' },
				{ text: 'useHover', link: '/useHover/' },
				{ text: 'useWinResize', link: '/useWinResize/' },
				{ text: 'useFocusWithin', link: '/useFocusWithin/' },
			],
		},
		{
			text: 'Advanced',
			children: [{ text: 'useEventEmitter', link: '/useEventEmitter/' }],
		},
	]
}
