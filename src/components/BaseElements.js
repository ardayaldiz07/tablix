const TABLE = () => {
    const element = document.createElement('table');
    element.className = "tx-table";
    return element;
};

const THEAD = () => {
    const element = document.createElement('thead');
    element.className = "tx-head";
    return element;
};

const TBODY = () => {
    const element = document.createElement('tbody');
    element.className = "tx-body";
    return element;
};

const TR = () => {
    const element = document.createElement('tr');
    element.className = 'tx-tr';
    return element;
}

const TH = () => {
    const element = document.createElement('th');
    element.className = 'tx-th';
    return element;
}

const TD = () => {
    const element = document.createElement('td');
    element.className = 'tx-td';
    return element;
}



export { TABLE, THEAD, TBODY, TR, TH, TD };