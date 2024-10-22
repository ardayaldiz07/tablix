import { THEAD, TR, TH } from "./BaseElements.js";

export default class TableHeader {
    constructor(columns, options) {
        this.columns = columns;
        this.options = options;
    }

    render() {
        const thead = THEAD();
        const tr = TR();

        for (let i = 0, length = this.columns.length; i < length; i++) {
            const item = this.columns[i];
            const th = TH();
            th.innerHTML = item.text;

            // Eğer column 'sort: true' ise sıralama ikonunu ekleyip sıralama işlevi ekle
            if (item.sort) {
                // Sort Icon Ekleme
                const sortIcon = document.createElement('span');
                sortIcon.className = 'sort-icon';
                
                // Sıralama yönüne göre icon ayarlama
                if (this.options.sortedColumn === item.field) {
                    sortIcon.innerHTML = this.options.sortOrder === 'asc' ? '↑' : '↓';
                } else {
                    sortIcon.innerHTML = '↕';  // Varsayılan (sıralanmamış) icon
                }
                th.appendChild(sortIcon);

                // Tıklama olayı ile sıralama işlevi
                th.addEventListener('click', () => {
                    // Mevcut sütun zaten sıralıysa, sıralama yönünü tersine çevir
                    const sortOrder = this.options.sortedColumn === item.field && this.options.sortOrder === 'asc' ? 'desc' : 'asc';
                    if (this.options.onSort) {
                        this.options.onSort(item.field, sortOrder);  // Sıralama fonksiyonunu çağır
                    }
                });
            }

            tr.appendChild(th);
        }

        thead.appendChild(tr);
        return thead;
    }
}
