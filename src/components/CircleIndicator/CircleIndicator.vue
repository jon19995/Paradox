<template>
    <div class="circle-item" :style="{background: color}"/>
</template>

<script>

export default {
    props: {
        color: {
            type: String,
            required: true
        }
    }
}
</script>

<style scoped>
.circle-item {
    border-radius: 50%;
    width: 8px;
    height: 8px;
}
.circle-item:hover {
    border: 1px solid #000000;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}
</style>
