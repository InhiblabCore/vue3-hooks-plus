<template>
	<div style="margin-top: 16px;">请求错误次数：{{ count }}</div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

import { useRequest } from 'vue3-hooks-plus'

function getUsername(): Promise<string> {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			reject(`error`)
		}, 1000)
	})
}

const count = ref(0)

useRequest(() => getUsername(), {
	retryCount: 3,
	onError: () => {
		count.value += 1
	},
})
</script>

<style scoped lang="less"></style>
