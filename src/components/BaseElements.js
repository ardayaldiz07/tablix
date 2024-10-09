const TABLE = (options) => {
    const element = document.createElement('table');
    element.className = "tablix";
    return element;
};

const THEAD = (options) => {
    const element = document.createElement('thead');
    element.className = "tx-head";
    return element;
};

const TBODY = (options) => {
    const element = document.createElement('tbody');
    element.className = "tx-body";
    return element;
};

const TR = (options) => {
    const element = document.createElement('tr');
    element.className = 'tx-tr';
    return element;
}

const TH = (options) => {
    const element = document.createElement('th');
    element.className = 'tx-th';
    return element;
}

const TD = (options) => {
    const element = document.createElement('td');
    element.className = 'tx-td';
    return element;
}



export { TABLE, THEAD, TBODY, TR, TH, TD };