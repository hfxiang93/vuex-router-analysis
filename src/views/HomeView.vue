<!--
 * @Descripttion: 
 * @Author: xianghaifeng
 * @Date: 2023-03-03 15:36:43
 * @LastEditors: xianghaifeng
 * @LastEditTime: 2023-03-03 15:55:24
-->
<template>
    <div>
homeview
{{ num }}
    </div>
</template>

<script>
import {mapState} from '@/store/myVuex'
export default {
        name: 'HomeView',
        computed:{
            ...mapState(['num'])
        },
    }
</script>

<style lang="scss" scoped>

</style>