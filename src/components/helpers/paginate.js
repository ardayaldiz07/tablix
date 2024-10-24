const paginate = (data, length, index) => {
    const totalItems = data.length;
    const totalPages = Math.ceil(totalItems / length);
    const currentPage = index < totalPages ? index : totalPages - 1;
    const start = currentPage * length;
    const end = start + length;
    const visibleData = data.slice(start, end);

    return {
        visibleData: visibleData,
        totalItems: totalItems,
        totalPages: totalPages,
        currentPage: currentPage,
        itemsPerPage: length
    };
}
export default paginate;