<template>
    <component :is="tag" class="container">
        <div
            class="header"
        >
            <the-checkbox :value="isOpen" @change="handleToggleIsOpenSubMenu" />
            <h3 class="title">{{title}}</h3>
            <circle-indicator
                v-for="circle in circles"
                :key="circle"
                :color="circle"
            />
            <p class="description">{{description}}</p>
            <div class="buttons">
                <the-button icon="icon-edit" />
                <the-button icon="icon-delete"  @click="deleteItem"/>
                <the-button icon="icon-move handle" />
            </div>
        </div>
        <collapse-transition>
            <div
                v-show="isOpen"
                class="sub-items"
            >
                <slot />
            </div>
        </collapse-transition>
        
    </component>
</template>

<script>
import TheCheckbox from "../TheCheckbox/TheCheckbox.vue"
import TheButton from "../TheButton/TheButton.vue"
import CircleIndicator from "../CircleIndicator/CircleIndicator.vue"

export default {
    components: {
        TheButton,
        TheCheckbox,
        CircleIndicator
    },

    data () {
        return {
            isOpen: true
        }
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
            default: 'div'
        }
    },

    methods: {
        handleToggleIsOpenSubMenu() {
            this.isOpen = !this.isOpen
        },

        deleteItem () {
            this.$emit("delete", this.id)
        }
    }
}
</script>

<style scoped>
.container {
    list-style: none;
}

.header {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 15px;
    font-style: normal;
    font-weight: 500;
    font-size: 15px;
    list-style: none;
    padding: 13px 16px;
    border: 1px solid var(--color-grey);
}

.title {
    white-space: nowrap;
    width: fit-content;

}
.title::first-letter {
    text-transform: uppercase;
}

.description {
    overflow: hidden;
    position: relative;
    white-space: nowrap;
    color: var(--color-grey)
}

.buttons {
    display: flex;
    align-items: center;
    gap: 23px;
    height: 20px;
    position: absolute;
    right: 16px;
    top: 50%;
    transform: translateY(-50%);
    background: white;
}

.buttons:before {
    content: "";
    position: absolute;
    right: 100%;
    top: 0;
    width: 40px;
    height: 100%;
    background: linear-gradient(90deg, transparent, #fff 50%);
}

.sub-items {
    padding-left: 16px;
}
</style>
