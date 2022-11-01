<template>
    <div class="search-label">
        <i class="icon icon-search" />
        <input class="search-input" type="text" :value="value" @input="handleInput" placeholder="Поиск">
        <the-button class="btn-close" icon="icon-close" v-show="!!value.length" @click="handleDeleteSearch" />
        <span class="border-bottom" />
    </div> 
</template>

<script>
import TheButton from "../TheButton/TheButton.vue"

export default {
    components: {
        TheButton
    },

    props: {
        value: {
            type: String,
            require: true,
            default: ""
        }
    },

    methods: {
        handleInput(e) {
            this.$emit("input", e.target.value)
        },

        handleDeleteSearch() {
            this.$emit("input", "")
        }
    }
}
</script>

<style scoped>
.search-label {
    display: block;
    width: 570px;
    border-bottom: 1px solid var(--color-grey);
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
    padding-bottom: 10px;
}

.search-label:focus {
    border-bottom: 1px solid var(--color-blue);
}

.search-input {
    border: none;
    outline: none;
    width: 100%;
    font-weight: 400;
    font-size: 15px;
}

.search-input::placeholder {
    color: var(--color-grey);
    font-weight: 400;
    font-size: 15px;
    font-style: italic;
}

.border-bottom {
    display: block;
    position: absolute;
    bottom: 0;
    left: 0;
    content: "";
    width: 100%;
    height: 1px;
    background: var(--color-grey);
    transition: background .3s linear;
}

.search-input:focus ~ .border-bottom {
    background: var(--color-blue);
}

.btn-close {
    background: transparent;
    border: none;
    cursor: pointer;
}

</style>
