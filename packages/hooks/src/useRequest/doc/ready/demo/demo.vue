<template>
	<div>ready: {{ ready }}</div>
	<button style="margin-top: 16px;" @click="() => toggle()">changeReady</button>
	<div style="margin-top: 16px;">读取值：{{ data }}</div>
</template>

<script lang="ts" setup>
import { useRequest, useToggle } from 'vue3-hooks-plus'

function getUsername(): Promise<string> {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve(String(Date.now()))
		}, 1000)
	})
}
const [ready, { toggle }] = useToggle(false)

const { data } = useRequest(() => getUsername(), {
	ready,
})
</script>

<style scoped lang="less"></style>
