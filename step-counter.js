const counter = (
    function counter() {
        let value = 0;
        return {
            getValue: function() {
                return value;
            },
            changeBy: function (k) {
                value += k;
            }
        }
    }
)();

function getFixedCounter(k) {
    let myCounter = counter;
    return {
        increment: () => {
            myCounter.changeBy(k);
        },
        decrement: () => {
            myCounter.changeBy(-k);
        },
        getValue: () => {
            return myCounter.getValue();
        }
    }
}

console.log(counter.getValue());
counter.changeBy(10);
counter.changeBy(20);
console.log(counter.getValue());
