let data = { price: 5, qty: 2 };
let target, total, salePrice;

class Dependency {
  constructor() {
    this.subscribers = [];
  }
  depend() {
    if (target && !this.subscribers.includes(target)) {
      this.subscribers.push(target);
    }
  }
  notify() {
    this.subscribers.forEach((sub) => sub());
  }
}

Object.keys(data).forEach((key) => {
  let internalValue = data[key];
  const dep = new Dependency();

  Object.defineProperty(data, key, {
    get() {
      dep.depend();
      return internalValue;
    },
    set(newVal) {
      internalValue = newVal;
      dep.notify();
    },
  });
});

const watcher = (myFunc) => {
  target = myFunc;
  target();
  target = null;
};

watcher(() => (total = data.price * data.qty));
watcher(() => (salePrice = data.price * 0.9));
