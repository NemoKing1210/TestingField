class SearchPanel {

    static _DefaultShownClass = 'shown';

    static getNodeElementById(node) {
        return typeof node == 'string' ? document.querySelector(node) : node;
    }

    static checkElementDom(object) {
        return object instanceof Element ? true : false;
    }

    static searchParams(object, key) {
        let nP = null;

        object.forEach(function(arr, num) {
            for (let k in arr) {
                if (k == key && nP == null) nP = arr[k];
            }
        });

        return nP;
    }

    static init(options) {
        if (!options) return false;

        const input = SearchPanel.getNodeElementById(options.input) || false;
        const output = SearchPanel.getNodeElementById(options.output) || false;
        const clear = SearchPanel.getNodeElementById(options.clear) || false;

        const data = options.data || false;

        const shownClass = options.shownClass || SearchPanel._DefaultShownClass;

        if (!data || !input || !output) return false;

        if (clear) {
            clear.addEventListener('click', () => {
                input.value = "";
                output.classList.remove(shownClass);
                checkClearInput(input, clear)
            });
        }

        function checkClearInput(input, clear) {
            if (input.value != "") {
                clear.classList.add(shownClass);
            } else {
                clear.classList.remove(shownClass);
            }
        }

        function comparisonData(searchText, dataText) {
            const newDataText = dataText.toString().toLowerCase();

            if (newDataText.indexOf(searchText) >= 0) return true;
            return false;
        }

        function comparisonKeys(keysArray, key) {
            let result = false;

            keysArray.forEach(function(value, i) {
                if (i == key && !result) result = true;
            });

            return result;
        }

        function updateData(data, input) {
            const searchText = (input.value).toLowerCase();
            const outputList = {};

            data.forEach(function(opt, i) {
                const dataArray = opt.array || false;
                const keysArray = SearchPanel.searchParams([opt, data], 'keys') || false;

                if (!dataArray) return;

                const maxElements = SearchPanel.searchParams([opt, data], 'maxElements') || 5;
                const titleName = SearchPanel.searchParams([opt, data], 'title') || false;

                let mEi = 1;

                console.log(keysArray);

                outputList[i] = [{ title: titleName }];

                dataArray.forEach(function(value, key) {
                    if (SearchPanel.checkElementDom(value)) return;
                    if (mEi > maxElements) return;
                    if (!comparisonKeys(keysArray, key)) return;

                    mEi++;

                    if (typeof value == "object") {
                        for (const k in value) {
                            if (comparisonData(searchText, value[k])) {
                                outputList[i].push(value);
                            }
                        }

                    } else {
                        if (comparisonData(searchText, value)) {
                            outputList[i].push(value);
                        }
                    }
                })

                console.log(outputList);

            });



        }

        output.classList.remove('shown');
        checkClearInput(input, clear);

        input.addEventListener('input', () => {
            if (input.value == "") {
                output.classList.remove('shown');
                checkClearInput(input, clear);
                return false;
            }
            output.classList.add('shown');
            checkClearInput(input, clear);
            updateData(data, input);
        });


    }




}