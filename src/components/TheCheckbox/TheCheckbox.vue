<template>
    <label class="checkbox-wrapper" @change="$emit('change', value)">
        <input type="checkbox" :checked="value"/>
        <span class="checkmark"></span>
        {{ title }}
    </label>
</template>

<script>
export default {
    props: {
        title: String,
        value: {
            Type: String | Boolean,
            default: false
        },
    }
}
</script>

<style scoped>
.checkbox-wrapper {
    display: flex;
    gap: 10px;
}

input {
    position: absolute;
    visibility: hidden;
    max-width: 0;
    max-height: 0;
    opacity: 0;
    z-index: -1;
}

.checkmark {
    display: block;
    cursor: pointer;
    position: relative;
    height: 22px;
    width: 22px;
    border-radius: 50%;
    border: 1px solid var(--color-grey);
}
input:checked + .checkmark::before {
    transform: translate(-50%, -60%) rotate(-135deg);
}
input + .checkmark::before {
    /* transition: all .3s linear; */
    content: "";
    height: 6px;
    width: 6px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -40%) rotate(45deg);
    border-top: 2px solid var(--color-blue);
    border-left: 2px solid var(--color-blue);
}
</style>
