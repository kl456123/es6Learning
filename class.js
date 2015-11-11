/*util method*/
class Util{
	static print(text=''){
		console.log(text);
	}
}
module.exports = Util;

class Point{
	constructor(x,y){
		this.x = x;
		this.y = y;
	}
	toString(){
		return '(' + this.x + ', ' + this.y + ')';
	}
}


/**/
var point1 = new Point(1,1);
var res = point1.toString();
console.log(res);

// __proto__ test
var point2 = new Point(2,2);
point1.__proto__.print = function(){
	console.log("oop");
}
point2.print();
point1.print();

// ES6的Class只是ES5的构造函数的一层包装

console.log(Point.name);

//  extend super class
class ColorPoint extends Point{
	constructor(x,y,color){
		super(x,y);
		this.color = color;
	}
	toString(){
		return this.color + ' ' + super.toString();
	}
}
// callback ColorPoint
var colorPoint = new ColorPoint(1,1,'black');
var res_colorPoint = colorPoint.toString();
console.log(res_colorPoint);

// setPrototypeOf() realize
function setPrototypeof(obj,proto){
	obj.__proto__ = proto;// constructor is a problem
	return obj;
}

// getter() and setter()
class  MyClass{
	constructor(){
		// .....
	}
	get prop(){
		console.log('getter');
	}
	set prop(value){
		console.log('setter :' + value);
	}

}
let myclass = new MyClass();
myclass.prop = 123;
myclass.prop;// it is a attr

// static method


class FOO {
	static classMethod(){
		Util.print('hello');
	}
}
FOO.classMethod();