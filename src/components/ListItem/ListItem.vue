<template>
    <component :is="tag" class="list-item">
        <h3 class="title">{{title}}</h3>
        <circle-indicator
            v-for="circle in circles"
            :key="circle"
            :color="circle"
        />
        <slot />
        <p class="description">{{description}}</p>
        <div class="buttons">
            <the-button icon="icon-edit" />
            <the-button icon="icon-delete" @click="deleteItem"/>
            <the-button icon="icon-move handle" />
        </div>     
    </component>
</template>

<script>
import TheButton from '../TheButton/TheButton.vue';
import CircleIndicator from '../CircleIndicator/CircleIndicator.vue';

export default {
    components: {
        TheButton,
        CircleIndicator
    },

    props: {
        id: {
            type: Number,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        circles: Array,
        description: String,
        tag: {
            type: String,
            default: 'li'
        }
    },

    methods: {
        deleteItem () {
            this.$emit("delete", this.id)
        }
    }
}
</script>

<style scoped>
.list-item {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 15px;
    font-style: normal;
    font-weight: 500;
    font-size: 15px;
    list-style: none;
    padding: 10px 15px;
    border: 1px solid var(--color-grey)
}

.title {
    font-style: normal;
    font-weight: 400;
    font-size: 13px;
}

.description {
    font-weight: 400;
    font-size: 11px;
    line-height: 108%;
    color: var(--color-grey)
}
.buttons {
    display: flex;
    align-items: center;
    gap: 23px;
    height: 20px;
    position: absolute;
    right: 17px;
    top: 50%;
    background: white;
    transform: translateY(-50%);
}
</style>
