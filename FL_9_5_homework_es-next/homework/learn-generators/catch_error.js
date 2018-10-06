function* upper(items) {
    for (let i = 0; i < items.length; i++) {
        try {
            yield items[i].toUpperCase();
        } catch (e) {
            yield null;
        }
    }
}

let bad_items = ['a', 'B', 1, 'c'];

for (let item of upper(bad_items)) {
    console.log(item);
}