function average(array)
{
    let sum = 0;
    let numElements = array.length;
    
    for (let i = 0; i < numElements; i++)
    {
        sum += array[i];
    }
    
    return Math.round(sum/numElements);
}

let arr1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let arr2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 100];

console.log(average(arr1));
console.log(average(arr2));