<template>
	<div>{{ data?.name ?? '-' }}</div>
	<div>{{ data?.age ?? '-' }}</div>
</template>

<script lang="ts" setup>
import { useRequest } from 'vue3-hooks-plus'

import { Plugin } from '../../../types'

const useFormatter: Plugin<
	{
		name: string
		age: number
	},
	[]
> = (fetchInstance, { formatter }) => {
	return {
		onSuccess: () => {
			fetchInstance.setData(formatter(fetchInstance.state.data), 'data')
		},
	}
}

function getUsername(): Promise<{ name: string; age: number }> {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve({
				name: 'yong_git',
				age: 18,
			})
		}, 1000)
	})
}

const { data } = useRequest(
	() => getUsername(),
	{
		formatter: () => {
			return {
				name: 'plugins update',
				age: 20,
			}
		},
	},
	[useFormatter]
)
</script>
s

<style scoped lang="less"></style>
