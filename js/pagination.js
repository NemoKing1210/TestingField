class Pagination {

    static _DefaultEmptyText = '...';
    static _DefaultPrevText = 'Prev';
    static _DefaultNextText = 'Next';
    static _DefaultSearchText = "...";

    static _DefaultPaginationContainerClass = 'pagination';
    static _DefaultButtonClass = 'pagination__item';
    static _DefaultEmptyButtonClass = 'empty';
    static _DefaultActiveButtonClass = 'active';
    static _DefaultPrevButtonClass = 'prev';
    static _DefaultNextButtonClass = 'next';
    static _DefaultSearchButtonClass = 'search';
    static _DefaultOnlyNextPrevClass = 'pnmode';
    static _DefaultItemsButtonClass = 'items';

    static getNodeElementById(node) {
        return typeof node == 'string' ? document.querySelector(node) : node;
    }

    static getItemsList(array, pageSize) {
        const listPageObjects = new Array();

        let elemNum = 0,
            elemPage = 0;

        if (!Array.isArray(array)) array = Object.entries(array);
        array.forEach(function(value, key) {
            if (listPageObjects[elemPage] == undefined) listPageObjects[elemPage] = new Array();
            listPageObjects[elemPage][elemNum] = value;

            elemNum++;

            if (elemNum >= pageSize) {
                elemNum = 0;
                elemPage++;
            }
        });

        return listPageObjects;
    }

    static getButtonsList(options = false) {
        if (typeof options !== 'object' || options === false) return false;

        const originItemsList = options.itemsList ? options.itemsList : false;

        if (!originItemsList) return false;

        let leftArray = new Array();
        let rightArray = new Array();
        let bList = new Array();
        let curItem;

        if (options.defaultButtons) {
            for (let i = options.curPage - 1, it = 0; i >= 0 && it < options.maxButtons; i--, it++) {
                if (originItemsList[i]) {
                    if (it == options.maxButtons - 2 && i > 0) {
                        leftArray.unshift({
                            type: 'empty',
                            text: Pagination._DefaultEmptyText,
                            pageNumber: i,
                            itemList: false
                        });
                    } else if (it != options.maxButtons - 1 && i > 0) {
                        leftArray.unshift({
                            type: 'default',
                            pageNumber: i,
                            itemsList: originItemsList[i],
                        })
                    }
                }
            }

            if (options.curPage != 0) {
                leftArray.unshift({
                    type: 'default',
                    pageNumber: 0,
                    itemsList: originItemsList[0]
                })
            }

            for (let i = options.curPage + 1, it = 0; i < originItemsList.length && it < options.maxButtons; i++, it++) {
                if (originItemsList[i]) {
                    if (it == options.maxButtons - 2 && i < originItemsList.length - 1) {
                        rightArray.push({
                            type: 'empty',
                            text: Pagination._DefaultEmptyText,
                            pageNumber: false,
                            itemList: false
                        });
                    } else if (it != options.maxButtons - 1 && i < originItemsList.length - 1) {
                        rightArray.push({
                            type: 'default',
                            pageNumber: i,
                            itemsList: originItemsList[i]
                        })
                    }
                }
            }

            if (options.curPage != originItemsList.length - 1) {
                rightArray.push({
                    type: 'default',
                    pageNumber: originItemsList.length - 1,
                    itemsList: originItemsList[originItemsList.length - 1]
                })
            }

        }

        if (options.activeButton) {
            curItem = {
                type: 'default',
                pageNumber: options.curPage,
                itemsList: originItemsList[options.curPage],
                active: true
            }
        }

        if (options.activeButton == true && options.defaultButtons == true) bList = bList.concat(leftArray, curItem, rightArray);
        else if (options.activeButton == false && options.defaultButtons == true) bList = bList.concat(leftArray, rightArray);
        else if (options.activeButton == true && options.defaultButtons == false) bList = bList.concat(curItem);

        const resultButtonsList = {
            buttonsList: new Array(),
            options: {
                maxButtons: options.maxButtons,
                curPage: options.curPage,
                itemsList: options.itemsList,
                searchButton: options.searchButton,
                itemsNumber: options.itemsNumber,
                paginationContainer: options.paginationContainer,
                searchPagePosition: options.searchPagePosition,

                lastItemsList: null,
                prevContentFunction: options.prevContentFunction,
                contentFunction: options.contentFunction,

                defaultButtons: options.defaultButtons,
                activeButton: options.activeButton,

                nextButton: options.nextButton,
                prevButton: options.prevButton,
            }
        }

        if (options.prevButton === true || options.prevButton === null) {
            if ((options.curPage > 0 && originItemsList.length > 2) || options.prevButton) {
                const prevButton = {
                    get pageNumber() {
                        if (options.curPage - 1 >= 0) return options.curPage - 1;
                        else return options.curPage;
                    },
                    type: 'prev',
                    text: Pagination._DefaultPrevText,
                    itemsList: false
                }
                bList.unshift(prevButton);
            }
        }

        if (options.nextButton == true || options.nextButton == null) {
            if ((options.curPage < originItemsList.length - 1 && originItemsList.length > 2) || options.nextButton) {
                const nextButton = {
                    get pageNumber() {
                        if (options.curPage + 1 <= originItemsList.length - 1) {
                            return options.curPage + 1;
                        } else return options.curPage;
                    },
                    type: 'next',
                    text: Pagination._DefaultNextText,
                    itemsList: false
                }
                bList.push(nextButton);
            }
        }

        if (options.searchButton == true) {
            const searchButton = {
                type: 'search',
                text: Pagination._DefaultSearchText,
                itemList: false
            }
            if (typeof options.searchPagePosition === 'string' && options.searchPagePosition.toLowerCase() === 'left') {
                bList.unshift(searchButton);
            } else if (typeof options.searchPagePosition === 'string' && options.searchPagePosition.toLowerCase() === 'right') {
                bList.push(searchButton);
            } else {
                bList.unshift(searchButton);
            }
        }

        if (options.itemsNumber == true) {
            const itemsNumber = {
                type: 'items',
                get text() {
                    if (!options.itemsList[0] || !options.itemsList[options.curPage]) return '33333';
                    return options.itemsList[0].length + '/' + options.itemsList[options.curPage].length;
                },
                itemList: false
            }
            bList.push(itemsNumber);
        }

        resultButtonsList.buttonsList = bList;

        return resultButtonsList;
    }

    static init(options = false) {
        if (typeof options !== 'object' || options === false) return false;

        const originItemsList = options.itemsList ? options.itemsList : false;
        const maxButtons = options.maxButtons ? options.maxButtons : 5;
        const maxItems = options.maxItems ? options.maxItems : 10;

        const paginationContainer = options.paginationContainer ? Pagination.getNodeElementById(options.paginationContainer) : false;

        const prevContentFunction = typeof options.prevContentFunction == 'function' ? options.prevContentFunction : false;
        const contentFunction = typeof options.contentFunction == 'function' ? options.contentFunction : false;

        const searchButton = options.searchPage == true ? true : false;
        const itemsNumber = options.itemsNumber == true ? true : false;
        const searchPagePosition = options.searchPagePosition != undefined ? options.searchPagePosition : null;

        const defaultButtons = options.defaultButtons != undefined ? options.defaultButtons : true;
        const activeButton = options.activeButton != undefined ? options.activeButton : true;

        const nextButton = options.nextButton != undefined ? options.nextButton : null;
        const prevButton = options.prevButton != undefined ? options.prevButton : null;

        if (paginationContainer === false || originItemsList === false) return false;

        const iList = Pagination.getItemsList(originItemsList, maxItems);

        let curPage = options.curPage ? options.curPage : 0;

        if (typeof curPage === 'string' && curPage.toLowerCase() == 'last') curPage = iList.length - 1;
        if (typeof curPage === 'string' && curPage.toLowerCase() == 'first') curPage = 0;

        if (curPage > iList.length) curPage = iList.length - 1;
        if (curPage < 0) curPage = 0;

        const bList = Pagination.getButtonsList({
            itemsList: iList,
            curPage: curPage,
            maxButtons: maxButtons,

            searchButton: searchButton,
            searchPagePosition: searchPagePosition,

            itemsNumber: itemsNumber,
            nextButton: nextButton,
            prevButton: prevButton,

            paginationContainer: paginationContainer,

            defaultButtons: defaultButtons,
            activeButton: activeButton,

            lastItemsList: null,
            prevContentFunction: prevContentFunction,
            contentFunction: contentFunction,
        });

        if (bList) Pagination.createPageButtons(bList);

        return bList;
    }

    static createPageButtons(bList) {
        const options = bList.options;

        if (options.paginationContainer) options.paginationContainer.innerHTML = "";

        if (options.defaultButtons == false && options.activeButton == false) options.paginationContainer.classList.add(Pagination._DefaultOnlyNextPrevClass);

        if (!options.paginationContainer.classList.contains(Pagination._DefaultPaginationContainerClass)) {
            options.paginationContainer.classList.add(Pagination._DefaultPaginationContainerClass);
        }

        if (options.prevContentFunction) {
            options.prevContentFunction(options.lastItemsList);
        }

        if (options.contentFunction && options.itemsList[options.curPage]) {
            options.contentFunction(options.itemsList[options.curPage]);
        }

        if (bList.buttonsList.length <= 1) return false;
        bList.buttonsList.forEach(function(value, key) {
            if (value.type == "empty") {
                const emptyElement = document.createElement('div');
                emptyElement.classList.add('pagination__item');
                emptyElement.innerText = value.text;
                emptyElement.classList.add(Pagination._DefaultEmptyButtonClass);
                emptyElement.setAttribute('data-page', value.text);

                options.paginationContainer.append(emptyElement);
            } else if (value.type == "search") {
                const searchCont = document.createElement('div');
                searchCont.classList.add('pagination__item');
                searchCont.classList.add(Pagination._DefaultSearchButtonClass);

                const searchInput = document.createElement('input');
                searchInput.setAttribute('type', 'number');
                searchInput.setAttribute('placeholder', value.text);
                searchInput.setAttribute('value', options.curPage + 1);
                searchInput.setAttribute('min', 1);
                searchInput.setAttribute('max', options.itemsList.length);
                searchCont.append(searchInput);

                const searchButton = document.createElement('button');
                searchButton.innerHTML = '>';
                searchCont.append(searchButton);

                searchCont.setAttribute('data-page', value.text);
                options.paginationContainer.append(searchCont);

                searchInput.onkeypress = e => {
                    if (!e) e = window.event;
                    const keyCode = e.code || e.key;
                    if (keyCode == 'Enter') {
                        if (typeof parseInt(searchInput.value) === 'number') {
                            let num = parseInt(searchInput.value) - 1;

                            num = num < 0 ? 0 : num;
                            num = num >= options.itemsList.length ? options.itemsList.length - 1 : num;

                            if (num == options.curPage) return false;

                            options.curPage = num;
                            const bList = Pagination.getButtonsList(options);
                            Pagination.createPageButtons(bList);

                        }
                    }
                }

                searchButton.onclick = e => {
                    if (typeof parseInt(searchInput.value) === 'number') {
                        let num = parseInt(searchInput.value) - 1;

                        num = num < 0 ? 0 : num;
                        num = num >= options.itemsList.length ? options.itemsList.length - 1 : num;

                        if (num == options.curPage) return false;

                        options.curPage = num;
                        const bList = Pagination.getButtonsList(options);
                        Pagination.createPageButtons(bList);

                    }
                }

            } else {
                const pagElement = document.createElement('button');
                pagElement.classList.add('pagination__item');

                pagElement.innerText = value.type === 'default' ? value.pageNumber + 1 : value.text;
                pagElement.setAttribute('data-page', value.type == 'default' ? value.pageNumber : value.text);

                if (value.type == 'prev') pagElement.classList.add(Pagination._DefaultPrevButtonClass);
                if (value.type == 'next') pagElement.classList.add(Pagination._DefaultNextButtonClass);
                if (value.type == 'items') pagElement.classList.add(Pagination._DefaultItemsButtonClass);
                if (value.active) pagElement.classList.add(Pagination._DefaultActiveButtonClass)

                options.paginationContainer.append(pagElement);

                if (value.type != 'items') {
                    pagElement.addEventListener('click', () => {
                        options.curPage = value.pageNumber;
                        const bList = Pagination.getButtonsList(options);
                        Pagination.createPageButtons(bList);
                    })
                }
            }

        });

    }

}