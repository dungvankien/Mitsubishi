class Car {
    constructor(picture, namecar, price) {
        this.picture = picture;
        this.nameCar = namecar;
        this.price = price;
    }
}
class Customer{
    constructor (fullName,mobiphone,model){
        this.fullName=fullName;
        this.mobiphone=mobiphone;
        this.model=model;
    }
}
var myCar = [];
let newCustomer=[];
var indexImg=0;
var indexCustomer=0;
const imgs=["picture/xpanderr-202222.png","picture/conten2.png","picture/conten3.png","picture/conten4.png","picture/conten5.png"];
const keyCar = "car";
let addImage = document.getElementById("image");
let addName = document.getElementById("nameCare");
let addPrice = document.getElementById("myprice");
let hidden = document.getElementById("myAdd");
init(keyCar,myCar);
myCar = getData(keyCar);
myBody(myCar);
setInterval(changeImage,2000);
// Lấy thông tin khác hàng
function submit(){
    const keyCustomer="customer";
        newCustomer[indexCustomer]=new Customer(
        document.getElementById("myName").value,
        document.getElementById("myMobiphone").value,
        document.getElementById("model").value);
        indexCustomer++;
        setData(keyCustomer,newCustomer);
        alert("Cảm ơn bạn đã quan tâm, Chúng tôi sẽ liên hệ bạn sớm nhất.");
        document.getElementById("myName").value=null,
        document.getElementById("myMobiphone").value=null,
        document.getElementById("model").value=null;
}
// đổi ảnh contenr
function changeImage(){
    document.getElementById("img").src=imgs[indexImg];
    indexImg++;
    if(indexImg==5){
        indexImg=0;
    }
}
function myUpdate() {
    let index = Number(document.getElementById("idexHidden").value);
    let newCar = new Car(addImage.value, addName.value, Number(addPrice.value));
    myCar[index] = newCar;
    setData(keyCar, myCar);
    myBody(myCar);
    addImage.value = null;
    addName.value = null;
    addPrice.value = null;
    hidden.style.display = "none";

}
function myEdit(index) {
    addProduct();
    addImage.value = myCar[index].picture;
    addName.value = myCar[index].nameCar;
    addPrice.value = myCar[index].price;
    document.getElementById("idexHidden").value = index;
}
function myCancel() {
    addImage.value = null;
    addName.value = null;
    addPrice.value = null;
    hidden.style.display = "none";
}
function myAdd() {
    if (addImage.value != 0 && addName.value != 0 && (Number(addPrice.value)) != 0) {
        let newCar = new Car(addImage.value, addName.value, Number(addPrice.value));
        myCar.unshift(newCar);
        setData(keyCar, myCar);
        myBody(myCar);
        addImage.value = null;
        addName.value = null;
        addPrice.value = null;
        hidden.style.display = "none";
    } else {
        alert("Vui lòng nhập đủ thông tin");
    }
}
function addProduct() {
    hidden.style.display = "inline-block"
}
function myDelete(index) {
    let result = confirm(`Do you want to remove ${myCar[index].nameCar} from the list?`);
    if (result) {
        myCar.splice(index, 1);
        setData(keyCar, myCar);
        getData(keyCar);
        myBody(myCar);
    }
}
function myBody(object) {
    let bodyCar = `<div>`;
    for (let i = 0; i < object.length; i++) {
        bodyCar += `<div class="carBody">`;
        bodyCar += `<img src="${object[i].picture}">`;
        bodyCar += `<a href=""><h3>${object[i].nameCar}</h3></a>`;
        bodyCar += `<p>
                    <span> Giá: ${object[i].price} đ  </span>
                    <span><button onclick="myEdit(${i})">Edit</button></span>
                    <span><button onclick="myDelete(${i})">Delete</button></span>
                    </p>`;
        bodyCar += "</div>";
    }
    bodyCar += `</div>`
    document.getElementById("modelCar").innerHTML = bodyCar;
}
function init(key,object) {
    if (getData(key) == null) {
        object = [
            new Car("picture/new xpander 2022.png", "NEW XPANDER 2022", 555000000),
            new Car("picture/NEW OUTLANDER 2022.png", "NEW OUTLANDER 2022", 825000000),
            new Car("picture/NEW TRITON ATHLETE 2022.png", "NEW TRITON ATHLETE 2022", 760000000),
            new Car("picture/NEW PAJERO SPORT 2021.png", "NEW PAJERO SPORT 2021", 1110000000)
        ]
        setData(key, object);
    }
    else {
        object = getData(key);
    }
}
function getData(key) {
    return JSON.parse(localStorage.getItem(key))
}
function setData(key, data) {
    localStorage.setItem(key, JSON.stringify(data))
}
