import {getAllUsers, createUser, createProduct, getAllProducst, getProductById} from './database'
import { Category } from './types'


createUser("3", "Everton@gmail.com", "123456")
getAllUsers()
createProduct("3", "Monitor 14 Polegadas", 800, Category.ELECTRONICS)
getAllProducst()
getProductById("1")