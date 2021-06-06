<template>
  <div class="hello">
    
     
            <div class="lesson-grid">
                <div v-for="(lesson, index) in cart" :key="lesson.id" class="lesson-grid">
                    <div class="lesson">
                        <div class="lesson-img">
                            <img v-bind:src="lesson.imageUrl" alt="">
                        </div>
                        <div class="lesson-info">
                            <p>Subject: {{lesson.subject}}</p>
                            <p>Location: {{lesson.location}}</p>
                            <p>Price: #{{lesson.price}}</p>
                            <p>Spaces: {{lesson.spaces}}</p>
                            <button v-on:click="removeFromCart(lesson.id, index)">Remove from cart</button>
                        </div>
                    </div>
                </div>
  </div>
  </div>
</template>

<script>
export default {
  name: 'Cart',
  props: [
    "cart",
  ],
  methods:{
        removeFromCart(id, index){
          this.$emit('removeFromCart', id, index)
      }  
      }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
