
import {ref,computed} from 'vue'
import { defineStore } from 'pinia'
export const useUsersStore = defineStore('users',  {
    state: () => {
         
     const users ={
        0:{
            name:'John Doe',
            email:'john@example.com',
            phone: 253732874678,
            deliveryAddress: '123 , Madaraka',
            password:'qwertyuio',
            userType: 'Customer',
            activeAccount: true
        },
        1:{
            name:'Janen Doe',
            email:'jane@example.com',
            phone: 253739874638,
            deliveryAddress: '123 , Madaraka',
            password:'RX blue',
            userType: 'Customer',
            activeAccount: true
        },
        2:{
            name:'Jack Doe',
            email:'jack@example.com',
            phone: 283732274671,
            deliveryAddress: '123 , Madaraka',
            password:'Dark-elk',
            userType: 'Customer',
            activeAccount: true
        },
        3:{
            name:'Jacob Doe',
            email:'jacob@example.com',
            phone: 255731874688,
            deliveryAddress: '123 , Madaraka',
            password: 'ohio',
            userType: 'Customer',
            activeAccount: false
        },
        4:{
            name:'Marcus Doe',
            email:'marcus@example.com',
            phone: 252731874677,
            deliveryAddress: '123 , Madaraka',
            password: 'Marcus',
            userType:'Admin',
            activeAccount: true
        },
        }

        return { users }
    },
    actions:{
         
    }


})
