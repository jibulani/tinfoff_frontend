/**
 * Created by Eugene on 05.03.2017.
 */
for (var i = 0; i < 10; i++) {
   setTimeout(func(i), 1000);
}
function func(i){ 
       console.log(i);
}