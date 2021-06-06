<template>
  <div id="app">
   <div v-if="showLessonsPage">
            <div class="header">
                <button v-if="cart.length>0" class="cart-btn" v-on:click="switchPages">{{cart.length}} Cart Page <i
                        class="fa fa-cart-plus" aria-hidden="true"></i></button>
                <div>

                    <select name="" id="" v-model="selectedOrder" v-on:change="handleOrder">
                        <option value="" disabled>Order Option</option>
                        <option v-for="(order, index) in orders" :key="index" v-bind:value="order">
                            {{order}}
                        </option>
                    </select>

                    <select name="" id="" v-model="selected" v-on:change="handleOrder">
                        <option v-for="(option, index) in options" :key="index" v-bind:value="option">
                            {{option}}
                        </option>
                    </select>


                </div>
            </div>
   </div>
   <div v-else>
  <div class="header">
                <button v-on:click="switchPages" class="cart-btn">Home <i class="fa fa-home"
                        aria-hidden="true"></i></button>
            </div>
   </div>
    <div v-if="showLessonsPage">
         <LessonList  :lessons="lessons" v-on:decrementSpace="decrementSpace" v-on:addToCart="addToCart"></LessonList>
        </div>
         <div class="cart" v-else>
  <Cart :cart="cart" :switchPage="switchPages" v-on:removeFromCart="removeFromCart"></Cart>
         </div>
  </div>
</template>

<script>
import LessonList from './components/LessonList.vue'
import Cart from './components/Cart.vue'
import Lessons from './lessons.js' 
export default {
  name: 'App',
  components: {
    LessonList, Cart
  },
   data() {
                return {
                    lessons: Lessons,
                    orders: ["ascending", "descending"],
                    selectedOrder: '',
                    options: ['subject', 'location', 'price', 'spaces'],
                    selected: 'subject',
                    cart: [],
                    showLessonsPage:true,
                    checkout: {
                        name: '',
                        phone_number: '',
                        lessonsInformation:[]
                    },
                    checkoutDetails:[]
                }
            },
               methods: {
                async getLessons(){
this.lessons = Lessons
console.log(this.lessons);

},

                handleOrder() {
                    if (this.selectedOrder === 'ascending') {
                        this.lessons.sort((a, b) => (a[this.selected] > b[this.selected]) ? 1 : -1)
                    
                    } else if (this.selectedOrder === 'descending') {
                        this.lessons.sort((a, b) => (b[this.selected] > a[this.selected]) ? 1 : -1)
                    }
                },
                decrementSpace(id){
                  
                    let tempLessons = [...this.lessons]
                    let selectedLesson = tempLessons.find(lesson => lesson.id === id)
                    const index = tempLessons.indexOf(selectedLesson)

                    const lesson = tempLessons[index]
                    if (lesson.spaces > 0) {
                        lesson.spaces = lesson.spaces - 1
                        this.lessons = tempLessons

                    } else {
                        return null
                    }
                    this.handleOrder()
                },
                addToCart(id) {
                    let tempLessons = [...this.lessons]
                    let selectedLesson = tempLessons.find(lesson => lesson.id === id)
                    const index = tempLessons.indexOf(selectedLesson)


                    let lesson = tempLessons[index]
                    this.lessons = tempLessons
                    this.cart = [...this.cart, lesson]
                    

                },
                switchPages() {
                    this.showLessonsPage = !this.showLessonsPage
                },
                removeFromCart (lessonId, cartIndex) {
                    let tempCart = [...this.cart]
                    tempCart = tempCart.filter((item, index) => index !== cartIndex)

                    const tempLessons = [...this.lessons]
                    const selectedLesson = tempLessons.find(lesson => lesson.id === lessonId)
                    const index = tempLessons.indexOf(selectedLesson)

                    const lesson = tempLessons[index]
                    lesson.spaces = lesson.spaces + 1

                    this.cart = tempCart
                    this.lessons = tempLessons
                },
                confirmSubmission: () => {
                    let checkoutMessage = `Cheers! Your order has been submitted ${this.checkout.name} 😁`
                    alert(checkoutMessage)
                    this.checkout.name = ''
                    this.checkout.phone_number = ''
                },
                countOccurences: ()=>{
                //     let tempCart = [...this.cart]
                //     let selectedLesson = tempCart.find(lesson => lesson.id === id)
                //     const index = tempCart.indexOf(selectedLesson)
                //     let lesson = tempCart[index]
                    
                
                //     tempCart.forEach((v) => (v === lesson.name && count++));
                //    console.log(count);
                    let items = []
                    
                    for (let i = 0; i < this.cart.length; i++) {
                        let count = 0;
                        const element = this.cart[i];
                    
                        this.cart.forEach((v) => (v === element && count++))
                        
                
                        items = [...items, {
                            lessonId: element.id,
                            name: element.subject,
                            number_of_spaces:count      
                        }]
                    }

                const uniqueObjects = [...new Map(items.map(item=>[item.lessonId, item])).values()]
                    
                    console.log(uniqueObjects);

                    this.checkout.lessonsInformation = uniqueObjects
                    console.log(this.checkout.lessonsInformation);

              

                },

                async postOrder(){
 await fetch('https://individual-cw2.herokuthis.com/order/', {
    method: "POST",
    body: JSON.stringify({
        name:this.checkout.name,
        phone_number:this.checkout.phone_number,
        lessonsInformation:this.checkout.lessonsInformation
    }),
    headers: {
"Content-type": "thislication/json; charset=UTF-8"
}
})
console.log('successful');
},
        async updateLesson(){
            console.log(this.lessons);
           await fetch('https://individual-cw2.herokuthis.com/', {
                method:'PUT',
                body:JSON.stringify(this.lessons),
                headers:{
                    "Content-type": "thislication/json; charset=UTF-8"
                }
            })
            
        }


            },
            async created (){
await this.getLessons()


}
}
</script>

<style>
   body {
            box-sizing: border-box;
            padding: 0;
            margin: 0;
        }

        .lesson-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(30rem, 1fr));
            gap: .7rem;
        }

        .lesson {
            padding: .5rem;
            margin: .7rem;
            border-radius: 4%;
            background: #292938;
            color: #fff;
            font-size: 1.5rem;
            display: flex;
            justify-content: space-around;
            border: 2px solid #ff8e3c;


        }

        .lesson-img {
            display: flex;
            justify-content: center;
            align-items: center;

        }

        .lesson-img img {
            max-width: 11.7rem;
            transition: .4s;
        }

        .lesson:hover>.lesson-img img {
            transform: scale(1.1);
        }

        .lesson-info button {
            background: #ff8e3c;
            padding: .5rem 1rem;
            border-radius: 5px;
            outline: none;
            border: none;
            cursor: pointer;
            transition: .5s;
            color: #fff;
        }

        .lesson button:hover {
            background: #d9376e;
        }

        .lesson-info p span {
            font-weight: bold;
        }

        .cart-btn {
            padding: 1rem 1.3rem;
            border-radius: 5px;
            outline: none;
            border: none;
            cursor: pointer;
            transition: .5s;
            font-size: 1rem;
            color: #292938;
            background: #fffffe;
        }

        .cart-btn:hover {
            background: #292938;
            color: #fffffe;
        }


        .header {
            background: linear-gradient(100deg, #ff8e3c 50%, #f3f3ef8c 0);
            padding: 1rem;
            align-items: center;
            justify-content: space-between;
            display: flex;
            margin-bottom: 1rem;

        }

        select {
            padding: .5rem;
            text-transform: capitalize;
            font-size: 1rem;
            border-radius: 5px;
            padding: .9rem;
            color: #292938;
            background: #fffffe;
        }



        form {

            padding: 1.2rem;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
        }

        form input {
            padding: .7rem 1.4rem;
            border-radius: 5px;
            transition: 1s;
            border: 2px solid #000;
            outline: none;
            margin: 1rem 1rem 1rem 0;
            display: inline-block;
            min-width: 250px;

        }

        form input:focus {
            background: #000;
            color: #fff;
        }

        .form-group {
            display: flex;
            flex-direction: column;
        }

        .form-group label {
            font-size: 1.5rem;
        }

        .checkout-btn {
            padding: .7em 1.4rem;
            border-radius: 5px;
            outline: none;
            border: none;
            cursor: pointer;
            transition: .5s;
            font-size: 1.2rem;
            margin-top: 1.3rem;
            color: #fffffe;
            background: #292938;
        }
</style>
