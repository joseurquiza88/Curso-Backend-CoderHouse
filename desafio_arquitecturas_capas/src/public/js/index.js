// levantamos el socket desde el lado del cliente
const socket = io() 

socket.emit('message', "Este es el primer emit")

socket.on('render', (data) => {
    
})

//Seleccionamos datos
const form = document.getElementById("formProducts")
form.addEventListener("submit", (e) => {
    e.preventDefault()
    
    const productTitle = document.getElementById("productTitle");
    const productDescription = document.getElementById("productDescription")
    const productPrice = document.getElementById("productPrice")
    const productCode = document.getElementById("productCode")
    const productStock = document.getElementById("productStock")
    const productThumbnails = document.getElementById("productThumbnails")
    const productCategory = document.getElementById("productCategory")
    //Creamos el producto
    const product = {
        title: productTitle.value,
        description: productDescription.value,
        price: productPrice.value,
        codigo: productCode.value,
        stock: productStock.value,
        thumbnails: productThumbnails.value? productThumbnails.value : "Sin imagen",
        category: productCategory.value
    }

    socket.emit('addProduct', product)

    //Dejamos vacio los campos del formualrio
    productTitle.value = ""
    productDescription.value = ""
    productPrice.value= ""
    productCode.value= ""
    productStock.value = ""
    productThumbnails.value = ""

    //Esto nos sirve para cuando se actualiza la lista de produtos al refrescar
    location.reload()
})

const deleteButton = document.querySelectorAll(".deleteButton")
deleteButton.forEach(button => {
    button.addEventListener("click", () => {
        const id = parseInt(button.id)
        const productId = {
            id: id
        }
        //Enviamos el socket para recibirlo en el servidor
        socket.emit('delete-product', productId)

        location.reload()
    })
})