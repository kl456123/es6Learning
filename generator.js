/*Generator function  practice*/
var Util = require('./class.js');

// test require()
Util.print("hello");
var printf = Util.print;

// extends Util.print()


/*  iterator  */
class iterator {
    constructor(value, bool) {
        this.value = value;
        this.done = bool;
    }
}

/*Generator*/
function* helloworldGenerator() {
    yield "hello";
    yield "world";
    return "ending";
}

// test
var hw = helloworldGenerator();
printf(hw.next());
printf(hw.next());
printf(hw.next());
printf(hw.next());



/* next() arguements*/
function* fn() {
        for (let i = 0; true; i++) {
            let result = yield i;
            if (result) {
                i = -1;
            }
        }
    }
    /*test next() */
var num = 0;

function* count() {
    while (true) {
        num++;
        yield num;

    }

}
let cot = count();
printf(cot.next());
printf(cot.next());
printf(cot.next());


// test fn()
let g = fn();
printf(g.next());
printf(g.next());
printf(g.next(true)); //inject function to adjust this function


// test for... of...
function* foo() {
    yield 1;
    yield 2;
    yield 3;
    yield 4;
    yield 5;
    return 6;
}
for (let v of foo()) {
    printf(v);
}

function* fibonacci() {
    let [prev, curr] = [0, 1]; //must know prev and curr value to find the next value;
    for (;;) {
        [prev, curr] = [curr, prev + curr];
        yield curr;
    }
}

for (let n of fibonacci()) {
    if (n > 1000) {
        break;
    }
    printf(n);
}


/*通过Generator函数为object加上遍历器接口*/
//first method
function* objectEntries(obj) {
    let propKeys = Reflect.ownKeys(obj);

    for (let propKey of propKeys) {
        yield [propKey, obj[propKey]];
    }
}
let jane = {
    first: 'Jane',
    last: 'Doe'
};
for (let [key, value] of objectEntries(jane)) {
    printf(`${key}:${value}`);
}
// another method 

function* objectEntrie() {
    let propKeys = Object.keys(this);

    for (let propKey of propKeys) {
        yield [propKey, this[propKey]];
    }
}
let jane1 = {
    first: 'Jane',
    last: 'Doe'
};
jane1[Symbol.iterator] = objectEntrie;

for (let [key, value] of jane1) {
    printf(`${key}: ${value}`);
}



/*  yield* is euqal to for... of */

// yield*
// function* concat(iter1, iter2){
// 	yield* iter1;
// 	yield* iter2;
// }
// for...of
function* concat(iter1, iter2) {
    for (let prop of iter1) {
        yield prop;
    }
    for (let prop of iter2) {
        yield prop;
    }
}

let iter1 = new iterator("one", false);
let iter2 = new iterator("two", true);
let gn = concat(jane1, jane1);
printf(gn.next());
printf(gn.next());
printf(gn.next());
printf(gn.next());
printf(gn.next());




/*throw error */
// catch in the function
g = function*() {
    while (true) {
        try {
            yield;
        } catch (e) {
            if (e !== 'a') {
                throw e;
            } //Once it happened it will break
            console.log('内部捕获', e);
        }
    }
};


// test
var i = g();
i.next();

try {
    i.throw('a');
    i.throw('b');
    i.throw('c');
} catch (e) {
    console.log('外部捕获', e);
}
// catch out of the function


// { value:3, done:false }

try {
    it.next();
    it.next(42);
} catch (err) {
    console.log(err);
}


//inner function
function* inner() {
        yield "hello";
    }
    // outer function
function* outer() {
    yield "open";
    yield * inner(); // yield* is getting  value,yield is getting Generator 
    yield "close";
}

let gen = outer();
printf(gen.next());
printf(gen.next());
printf(gen.next());

/*get all the numbers in the array*/
function* iterTree(tree) {
    if (Array.isArray(tree)) {
        for (let i = 0; i < tree.length; i++) {
            yield * iterTree(tree[i]);
        }
    } else {
        yield tree;
    }
}
const arr = ['a', ['b', 'c'],
    ['d', 'e']
];
g = iterTree(arr);
printf(g.next());
printf(g.next());
printf(g.next());
printf(g.next());
printf(g.next());

/*Finite State Machine*/

// easy way
var tricking = true;
var click = function() {
    if (tricking) {
        printf('Tick');
    } else {
        printf('Tock');
    }
    tricking = !tricking;
};
click();
click();
click();

// generator function method

//there is a question here!	
// var clock = function*(_) {
//   while (true) {
//     yield _;
//     console.log('Tick!');
//     yield _;
//     console.log('Tock!');
//   }
// };
// var gs = clock();
// gs.next();
// gs.next();
// gs.next();


/*Ajax generator function*/
// function request(url) {
//     makeAjaxCall(url, function(response) {
//         it.next(response);
//     });
// }
// function* main() {
//     var result = yield request("http://some.url");
//     var resp = JSON.parse(result);
//     console.log(resp.value);
// }



// var it = main();
// it.next();



/*promise*/
function timeout(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms, 'done');
  });
}

timeout(100).then((value) => {
  console.log(value);
});

// loadImageAsync

function loadImageAsync(url){
	return new Promise(function(resolve,reject){
		let image = new Image();
		image.onload = function(){
			resolve(image);
		};
		image.onerror = function(){
			reject(new Error('could not load image in'+ url));
		};
		image.url = url;
	});
}

loadImageAsync('http://www.hao123.com/');



//  Ajax Promise class

/**
 * @param  {[url]}
 * @return {[]}
 */
var getJSON = function(url) {
  var promise = new Promise(function(resolve, reject){
    var client = new XMLHttpRequest();
    client.open("GET", url);
    client.onreadystatechange = handler;
    client.responseType = "json";
    client.setRequestHeader("Accept", "application/json");
    client.send();

    function handler() {
      if ( this.readyState !== 4 ) {
        return;
      }
      if (this.status === 200) {
        resolve(this.response);
      } else {
        reject(new Error(this.statusText));
      }
    };
  });

  return promise;
};

getJSON("./package.json").then(function(json) {
  console.log('Contents: ' + json);
}, function(error) {
  console.error('出错了', error);
});

