import { useState} from "react"
import Guitar from "./components/Guitar"
import Header from "./components/Header"
import {db} from './data/db'

function App() {

    const [data, setData] = useState(db)
    const [cart, setCart]= useState([])
     
    
    const Max_Items = 5

    function addToCart(item){
        const itemExist = cart.findIndex(guitar => guitar.id === item.id)
        if(itemExist >= 0) {//existe en el carrito
            const updateCart = [...cart]
            updateCart[itemExist].quantity++
            setCart(updateCart)
        }else{
            item.quantity = 1
            setCart([...cart, item])
        }
    }

    function removeFromCart(id){
        setCart(prevCart => prevCart.filter(guitar => guitar.id !== id))
    }

    function increaseQuantity (id){
        const updatedCart = cart.map(item => {
            if(item.id === id && item.quantity < Max_Items){
                return{
                    ...item,
                    quantity: item.quantity + 1
                }
            }
            return item
        })
        setCart(updatedCart)
    }
    
  return (
    <>
    <Header 
    cart= {cart}
    removeFromCart = {removeFromCart}
    increaseQuantity = {increaseQuantity}
    />
    <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
            {data.map((guitar)=>(
                 <Guitar 
                 key={guitar.id}
                 guitar={guitar}
                 setCart={setCart}
                 addToCart={addToCart}
                 />
            ))}
           
        </div>
    </main>
    <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
            <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
        </div>
    </footer>
    </>
  )
}

export default App
