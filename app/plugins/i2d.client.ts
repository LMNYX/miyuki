import { defineNuxtPlugin } from '#app'
import * as i2d from 'i2djs';

export default defineNuxtPlugin(() => {
    return {
        provide: {
            i2d
        }
    }
})
