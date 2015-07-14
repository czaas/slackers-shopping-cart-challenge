// object constructor
function Product(name, price, qty){
	this.name = name;
	this.price = price;
	this.quantity = qty;
}

// object constructor
function Cart(){
	this.items = [];

	this.showItems = function(){
		// setting reference variable so 'this' doesn't get confusing
		var arr = this.items, total;
		console.log('In your cart:')
		for(var i = 0; i < arr.length; i++){
			console.log('You have ' + arr[i].quantity + ' ' + arr[i].name);
		}
	};
}

Cart.prototype.addItem = function(item, qty){
	// quick check to see if items are still available
	if(item.quantity <= 0 || qty > item.quantity){
		console.log('You have maxed out the number of these items available.');
	} else {

		var list = this.items, temp;

		// if the amount of items wasn't added as a param, default is 1;
		qty = qty || 1;

		// loop through items to see if one exists
		for(var i = 0; i < list.length; i++){
			if(list[i].name === item.name){
				list[i].quantity += qty;
				item.quantity = item.quantity - qty;
				return this;
			}
		}

		// creating a temp obj so I can manipulate it without effecting the item.
		temp = {
			name: item.name,
			price: item.price,
			quantity: qty
		};

		// set the original items quatinity by subtracting the ammount added to cart
		item.quantity = item.quantity - qty;

		// adds new item to array
		this.items.push(temp);
		// returns 'this' allows chaining method
		return this;
	}
};

Cart.prototype.getPrice = function(){
	var shoppingList = this.items,
		totalPrice = 0;

	for(var i = 0; i < shoppingList.length; i++){
		totalPrice += shoppingList[i].quantity * shoppingList[i].price;
	}

	return totalPrice;
}

Cart.prototype.updateItems = function(){
	var shoppingList = this.items;


	shoppingList.forEach(function(item){

		var itemPrice = item.price * item.quantity,
			itemName = item.name,
			itemQuantity = item.quantity;

		var toAppend = '<div class="item" data-product="' + item.name + '"><p>' + itemName + '</p><p>$<span class="price">' + itemPrice + '</span></p><p>Amount you have: <span class="qty">' + itemQuantity + '</span></p><hr><button>Add</button><input class="input_addMore" value="1"></div>';

		$('#items').append(toAppend);
	});
};

var shoppingCart = new Cart();
var apple = new Product('Apple', 0.50, 5);
var bannana = new Product('Banana', 0.75, 10);


shoppingCart.addItem(apple, 4)
	.addItem(bannana, 3)
	.addItem(bannana, 2)
	.addItem(bannana, 2);

shoppingCart.showItems();
console.log(shoppingCart.getPrice());