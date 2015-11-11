/*There are some requirements in coding JS*/


/*let const instead of var*/

// let
for(let i=0;i<10;i++){
	console.log('hello world\n');
}

// const
const [a,b,c]=[1,2,3];

/*string*/

const x = 'hello';
const y = `hello`;
const z = `hel${y}lo`;//alternative
console.log(z);

/*assignments*/
const obj = {};
obj.firstName = 'break';
obj.lastName = 'point';
function getFullName(obj){
	const {firstName ,lastName } = obj;
	console.log(`${firstName}`);// `` works 
}
// test
getFullName(obj);

/**
 * [It is a example]
 * @return {[left ,right]} [ this is a assignment]
 */
// function processInput(){
// 	return { left , right };
// }

// const {right , left} = processInput();


/* define a obj*/

const obj1 = {k1: v1,k2: v2};
const obj2 = {
	k1: v1,
	k2: v2,//there is a comma here!
}


/*default arguements */
function handleThings(opts = {}){
	// ...
}

