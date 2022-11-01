<template>
    <button class="btn"><i @click="$emit('click')" class="icon" :class="icon"/></button>
</template>

<script>
export default {
    props: {
        icon: {
            Type: String,
            require: true
        },
    }
}
</script>

<style scoped>
.btn {
    background: transparent;
    border: none;
    cursor: pointer;
}

.ghost .header .buttons .icon-move,
.list-item.ghost .buttons .icon-move{
    filter: saturate(200%) contrast(200%);
}
</style>
