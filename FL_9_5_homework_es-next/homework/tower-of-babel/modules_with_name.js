 let arg1 = process.argv[2];
 let arg2 = process.argv[3];
 import {PI, sqrt, square} from './modules_with_name_math';

 console.log(PI);
 console.log(sqrt(Number(arg1)));
 console.log(square(Number(arg2)));