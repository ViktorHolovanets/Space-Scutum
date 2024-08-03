import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Post } from '@/types'
import { getPosts, deletePost, updatePost } from '@/api/posts'

export const usePostsStore = defineStore('posts', () => {
  const posts = ref<Post[]>([])
  const currentPost = ref<Post | null>(null)
  const currentPage = ref(1)
  const totalPages = ref(1)
  const totalPosts = ref(0)
  const pageSize = 10

  const isModalWindowPostOpen = ref(false)
  const showDetails = ref(false)
  const changeShow = () => {
    showDetails.value = !showDetails.value
  }
  const openModal = () => {
    isModalWindowPostOpen.value = true
  }

  const closeModal = () => {
    isModalWindowPostOpen.value = false
  }

  const loadPosts = async (page: number = 1) => {
    try {
      const response = await getPosts(page)
      posts.value = response.data
      currentPage.value = page
      totalPages.value = Math.ceil(response.total / pageSize)
      totalPosts.value = response.total
    } catch (error) {
      console.error('Failed to load posts:', error)
    }
  }

  const nextPage = () => {
    if (currentPage.value < totalPages.value) {
      currentPage.value += 1
      loadPosts(currentPage.value)
    }
  }
  const setCurrentPost = (post: Post | null) => {
    currentPost.value = post
  }

  const previousPage = () => {
    if (currentPage.value > 1) {
      currentPage.value -= 1
      loadPosts(currentPage.value)
    }
  }
  const update = async () => {
    if (currentPost.value) {
      let post: Post = currentPost.value
      try {
        const postUp = await updatePost(currentPost.value)

        const index = posts.value.findIndex((post) => post.id === currentPost.value?.id)
        if (index !== -1) {
          posts.value[index] = { ...posts.value[index], ...currentPost.value }
        }
        currentPost.value = null
      } catch (error) {
        console.error('Failed to update post:', error)
      }
    }
  }
  const removePost = async (postId: string) => {
    try {
      await deletePost(postId)
      posts.value = posts.value.filter((post) => post.id !== postId)
      totalPosts.value -= 1
      totalPages.value = Math.ceil(totalPosts.value / pageSize)
      loadPosts(currentPage.value)
    } catch (error) {
      console.error('Failed to delete post:', error)
    }
  }
  const updateLocalPost = (title: string, body: string) => {
    if (currentPost.value) {
      currentPost.value.title = title
      currentPost.value.body = body
    }
  }

  return {
    posts,
    currentPage,
    currentPost,
    totalPages,
    totalPosts,
    isModalWindowPostOpen,
    showDetails,
    changeShow,
    openModal,
    closeModal,
    setCurrentPost,
    removePost,
    update,
    updateLocalPost,
    loadPosts,
    nextPage,
    previousPage
  }
})
