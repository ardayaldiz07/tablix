const paginate = (data, length, index) => {
    // console.log(data, length, index);
    
    const totalItems = data.length;
    const totalPages = Math.ceil(totalItems / length);


    const currentPage = index < totalPages ? index : totalPages - 1;


    const start = currentPage * length;
    const end = start + length;


    const visibleData = data.slice(start, end);

    return {
        visibleData: visibleData,    // Gösterilecek data
        totalItems: totalItems,      // Toplam item sayısı
        totalPages: totalPages,      // Toplam sayfa sayısı
        currentPage: currentPage,    // Şu anki sayfa
        itemsPerPage: length         // Sayfa başına gösterilecek item sayısı
    };
}
export default paginate;