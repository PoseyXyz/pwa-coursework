<template>
  <div class="hello">
   
     <div class="lesson-grid">
                <div v-for="(lesson, index) in lessons" v-bind:key="index">
                    <div class="lesson">
                        <div class="lesson-img">
                            <img v-bind:src="lesson.imageUrl" alt="">
                        </div>
                        <div class="lesson-info">
                            <p>Subject: {{lesson.subject}}</p>
                            <p>Location: {{lesson.location}}</p>
                            <p>Price: #{{lesson.price}}</p>
                            <p>Spaces: {{lesson.spaces}}</p>
                            <button v-if="lesson.spaces>0"
                                v-on:click="logger(lesson.id)">Add to cart</button>
                        </div>
                    </div>
                </div>
            </div>
  </div>
</template>

<script>
export default {
  name: 'LessonLst',
  props: [
    "msg",
   "lessons",
  
  ],
  methods:{
      logger(id){
          this.$emit('decrementSpace', id)
          this.$emit('addToCart', id)
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
