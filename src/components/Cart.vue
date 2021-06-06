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
  
            <form>
    
                <div>
                    <h1>Checkout</h1>
                </div>
                <div>
                    <div>
                        <span class="form-group">
                            <label for="">Name:</label>
                            <input v-model.trim="checkout.name" type="text" name="" id=""
                                placeholder="Please type your name" onkeypress="return /[a-z]/i.test(event.key)"
                                required>
                        </span>
                        <span class="form-group">
                            <label for="">Phone Number:</label>
                            <input v-model.number="checkout.phone_number" type="number"
                                placeholder="Please type your phone number" required>
                        </span>
                    </div>
                    <span> <button v-if="checkout.name !== '' && checkout.phone_number !==''" v-on:click="confirmSubmission();"
                            class="checkout-btn">Checkout</button></span>
                </div>
            </form>
  </div>
</template>

<script>
export default {
  name: 'Cart',
  data(){
    return{
      checkout: {
                        name: '',
                        phone_number: '',
                        lessonsInformation:[]
                    }
    }
  },
  props: [
    "cart",
  ],
  methods:{
        removeFromCart(id, index){
          this.$emit('removeFromCart', id, index)
      },
      confirmSubmission (){
                    let checkoutMessage = `Cheers! Your order has been submitted ${this.checkout.name} 😁`
                    alert(checkoutMessage)
                    this.checkout.name = ''
                    this.checkout.phone_number = ''
                }  
      }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
