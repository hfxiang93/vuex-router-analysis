<!--
 * @Descripttion: 
 * @Author: xianghaifeng
 * @Date: 2023-03-03 15:39:44
 * @LastEditors: xianghaifeng
 * @LastEditTime: 2023-03-03 15:44:38
-->
<template>
    <div>
about
{{ info }}
    </div>
</template>

<script>
import {mapState} from '@/store/myVuex'
export default {
    name:'AboutView',
        computed:{
            ...mapState(['info'])
        }
    }
</script>

<style lang="scss" scoped>

</style>