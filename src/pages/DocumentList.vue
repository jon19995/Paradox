<template>
    <div class="page">
        <h1 class="page-title">Документы</h1>
        <search-button :value="search" @input="handleSearch" class="btn-search"/>
        
        <draggable
            class="list-group"
            v-model="categoriesSorted"
            v-bind="dragOptions"
            handle=".handle"
            @start="drag = true"
            @end="drag = false"
        >
            <transition-group tag="ul" type="transition" :name="!drag ? 'flip-list' : null">
                <category-item
                    v-for="category in categoriesSorted"
                    :key="category.id"
                    tag="li"
                    :id="category.id"
                    :title="category.title"
                    :circles="category.circles"
                    :description="category.description"
                    @delete="handleDeleteCategory"
                >
                    <draggable
                        class="list-items"
                        tag="ul"
                        v-model="category.documents"
                        v-bind="dragOptions"
                        :group="{ name: 'documents' }"
                        handle=".handle"
                        @start="drag = true"
                        @end="drag = false"
                    >
                    <transition-group tag="ul" type="transition" :name="!drag ? 'flip-list' : null">
                        <list-item
                            v-for="document in category.documents"
                            :key="document.id"
                            :id="document.id"
                            :class="{isActive: drag}"
                            :title="document.title"
                            :circles="document.circles"
                            :description="document.description"
                            @delete="handleDeleteDocumentInCategry"
                        >
                            <div v-if="category.require" class="sub-title">
                                <span>Обязательный</span>&nbsp;&nbsp;
                                <span>Для всех</span>
                            </div>
                        </list-item>
                    </transition-group>
                    </draggable>
                </category-item>
            </transition-group>
        </draggable>
        
        <draggable
            class="list-group"
            v-model="documentsSorted"
            v-bind="dragOptions"
            :group="{ name: 'documents' }"
            handle=".handle"
            @start="drag = true"
            @end="drag = false"
        >
            <transition-group tag="ul" type="transition" :name="!drag ? 'flip-list' : null">
                <list-item
                    v-for="document in documentsSorted"
                    :id="document.id"
                    :key="document.id"
                    :title="document.title"
                    :description="document.description" 
                    @delete="handleDeleteOtherDocument"
                />
            </transition-group>
        </draggable>

    </div>
</template>

<script>
import CategoryItem from "../components/CategoryItem/CategoryItem.vue"
import ListItem from "../components/ListItem/ListItem.vue"
import SearchButton from "../components/SearchButton/SearchButton.vue"
import draggable from "vuedraggable"

export default {
    components: {
        ListItem,
        draggable,
        SearchButton,
        CategoryItem
    },

    data () {
        return {
            search: "",
            categories: [],
            documents: [],
            categoriesSorted: [],
            documentsSorted: [],
            drag: false
        }
    },

    beforeMount () {
        this.getDocuments()
    },

    computed: {
        dragOptions () {
            return {
                animation: 300,
                group: "description",
                disabled: false,
                ghostClass: "ghost"
            };
        },
    },
    
    watch: {
        search () {
            this.sortCategories(this.search)
            this.sortDocuments(this.search)
        }
    },

    methods: {
        addActiveClass (e) {
            console.log(e.item.classList.add("active"));
        },

        removeActiveClass (e) {
            console.log(e.item.classList.remove("active") );
        },

        handleDeleteCategory (id) {
            this.categories = this.categories.filter((category) => category.id !== id)
            this.categoriesSorted = this.categoriesSorted.filter((category) => category.id !== id)
        },
        
        handleDeleteDocumentInCategry (id) {
            this.categories.forEach((category) => {
                const documents = category.documents

                const index = documents.findIndex((document) => document.id === id)
                
                if (index !== -1) {
                    documents.splice(index, 1)

                    return
                }
            })
        },

        handleDeleteOtherDocument (id) {
            this.documents = this.documents.filter((document) => document.id !== id)
            this.documentsSorted = this.documentsSorted.filter((document) => document.id !== id)
        },

        checkTextMatch (string, text) {
            return string.toLocaleLowerCase().includes(text.toLocaleLowerCase())
        },

        sortCategories (text) {
            this.categoriesSorted = this.categories.filter((item) => {
                const categoriesWithText = this.checkTextMatch(item.title, text)
                
                if (!categoriesWithText) {
                    const documents = item.documents.some((documnent) => this.checkTextMatch(documnent.title, text))
                    
                    if (documents) {
                        return item
                    }
                }
                
                return categoriesWithText
            })
        },

        sortDocuments (text) {
            this.documentsSorted = this.documents.filter((documnent) => this.checkTextMatch(documnent.title, text))
        },

        async getDocuments () {
            ({
                categories: this.categories,
                documents: this.documents
            } = await import("../mocks/documents.json"))
            
            this.categoriesSorted = this.categories
            this.documentsSorted = this.documents
        },

        handleSearch(value) {
            this.search = value
        }
    }
}
</script>

<style scoped>
.page {
    margin: 50px;
}

.btn-search {
    margin-bottom: 20px;
}

.page-title {
    margin-bottom: 23px;
}

.sub-title span:first-child {
    color: var(--color-pink);
}
.sub-title span {
    color: var(--color-grey);
}

/* АНИМАЦИИ */

.flip-list-move {
    transition: transform 0.5s;
}
.no-move {
    transition: transform 0s;
}
</style>
