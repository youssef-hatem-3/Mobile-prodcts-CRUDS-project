var productNameInput = document.getElementById('productNameInput');
var productPriceInput = document.getElementById('productPriceInput');
var productCategoryInput = document.getElementById('productCategoryInput');
var productDescInput = document.getElementById('productDescInput');
var addBtn = document.getElementById("addBtn");
var updateBtn = document.getElementById("updateBtn");

var productsContainer 
///////////////////////////////////////Display when open/////////////////////////
if(localStorage.getItem('myProducts') != null)
{
    productsContainer = JSON.parse(localStorage.getItem('myProducts')); 
    displayProducts(productsContainer)
}
else
{
    productsContainer = [] ;
}
///////////////////////////////////////add///////////////////////////////////////
function addProduct() {
if (validationProducts() == true)
{
    var product = {
        name: productNameInput.value,
        price: productPriceInput.value,
        category: productCategoryInput.value,
        desc: productDescInput.value
    }
    productsContainer.push(product);//1000
    clearForm();
    localStorage.setItem('myProducts',JSON.stringify(productsContainer))
    displayProducts(productsContainer);
    
}
else
{
 window.alert('sorry the input doesnt match')
}
}
///////////////////////////////////////clear///////////////////////////////////////
function clearForm() {
    productNameInput.value = "";
    productPriceInput.value = "";
    productCategoryInput.value = "";
    productDescInput.value = "";

}
///////////////////////////////////////Display///////////////////////////////////////
function displayProducts(list) {
    var cartoona = ``;
    for (var i = 0; i < list.length; i++) {
        cartoona += ` <tr>
        <td>${i}</td>
        <td>${list[i].name}</td>
        <td>${list[i].price}</td>
        <td>${list[i].category}</td>
        <td>${list[i].desc}</td>
        <td><button onclick="updateButton(${i})" class="btn  btn-outline-warning"> update</button></td>
        <td><button onclick="deleteProducts(${i})" class="btn  btn-outline-danger"> delete</button></td>
    </tr>`;
    }
    document.getElementById('tableBody').innerHTML = cartoona;
}
///////////////////////////////////////Search///////////////////////////////////////
function searchProducts(searchTerm)
 {
    var searchResult = [];
    for(var i=0;i<productsContainer.length;i++)
    {
        if(productsContainer[i].name.toLowerCase().includes(searchTerm.toLowerCase()) == true )
        {
            searchResult.push(productsContainer[i]);
        }
    }
    displayProducts(searchResult)
} 
///////////////////////////////////////Delete///////////////////////////////////////
function deleteProducts (deletedIndex) 
{
    productsContainer.splice(deletedIndex,1)
    localStorage.setItem('myProducts',JSON.stringify(productsContainer));
    displayProducts(productsContainer);
}
///////////////////////////////////////Update///////////////////////////////////////
var sameIndex ;
function updateButton(updatedIndex)
{
    productNameInput.value = productsContainer[updatedIndex].name ;
    productDescInput.value = productsContainer[updatedIndex].desc ;
    productCategoryInput.value = productsContainer[updatedIndex].category ;
    productPriceInput.value = productsContainer[updatedIndex].price ;
    addBtn.classList.add("d-none");
    updateBtn.classList.remove("d-none")
    sameIndex = updatedIndex ; 
}
function updateProducts()
{
    productsContainer[sameIndex].name = productNameInput.value ;
    productsContainer[sameIndex].desc = productDescInput.value ;
    productsContainer[sameIndex].category = productCategoryInput.value ;
    productsContainer[sameIndex].price = productPriceInput.value ;
    addBtn.classList.remove("d-none");
    updateBtn.classList.add("d-none")
    localStorage.setItem('myProducts',JSON.stringify(productsContainer))
    displayProducts(productsContainer);
} 
//////////////////////////////////////Validation///////////////////////////////////
function validationProducts(){
var regex = /^[A-Z][a-z]{3,8}/ ;
if (regex.test(productNameInput.value) == true)
    {
        productNameInput.classList.replace('is-invalid','is-valid')
        return true  ;
    }
    else
    {
        productNameInput.classList.add('is-invalid')
        return false
    }
}