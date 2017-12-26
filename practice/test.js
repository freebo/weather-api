console.log('Starting');

setTimeout(() => {
    console.log('Inside callback');
}, 2000);

setTimeout(() => {
    console.log('2nd callback');
}, 0);

console.log('Ending');

