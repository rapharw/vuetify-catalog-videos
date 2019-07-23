let lodashArray = require('lodash/array');
let lodashFind = require('lodash');
const arrayTransform = {

    addElement(array, value) {
        if (array.indexOf(value) === -1) {
            array.push(value);
        } else
            throw new Error("Duplicated value")
    },

    removeElement(array, value) {
        let index = array.indexOf(value);
        if (index !== -1) {
            array.splice(index, 1);
        }
    },

    removeJson(array, obj) {
        lodashArray.remove(array, function (n) {
            return n === obj;
        });
    },

    findStringOnArrayJson(array, str) {
        return lodashFind.find(array, function (obj) {
            return obj.nomeTag.toLowerCase().includes(str.toLowerCase());
        })
    }
}

export default arrayTransform