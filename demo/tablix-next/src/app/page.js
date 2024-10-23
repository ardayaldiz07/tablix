"use client";
import React, { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    // Kodun yalnızca tarayıcıda çalıştığını doğrulayın
    if (typeof window !== "undefined") {
      // tablix'i dinamik olarak import edin
      import("tablix/output/tablix.min.js").then((tablixModule) => {
        const Tablix = tablixModule.default || tablixModule;

        new Tablix("#table", {
          theme: 'dark-theme',
          api: '/data.json',
          apiBasePath: 'body.content.items',
          search: {
            enabled: true,
            default: "",
            fields: ['newsId', 'title', 'spot']
          },
          filter: {
            enabled: true,
            field: 'category.items',
            items: ['Gündem', 'Ekonomi', 'Dünya', 'İş-Yaşam', 'Yaşam']
          },
          columns: [
            { field: 'newsId', text: 'ID', sort: true },
            { field: 'title', text: 'Başlık', sort: true },
            { field: 'category.items', sort: false, text: 'Kategori', splitField: 'name', splitBy: '>' },
            { field: 'spot', text: 'Spot', sort: true }
          ],
          pagination: {
            enabled: true,
            buttons: [
              'start', 'prev', 'numbers', 'selectPage', 'next', 'end'
            ],
            length: [
              { text: '5', value: 5, selected: true },
              { text: '10', value: 10 },
              { text: '20', value: 20 },
              { text: '30', value: 30 },
              { text: '40', value: 40 },
              { text: '50', value: 50 }
            ]
          },
        });
      });
    }
  }, []);

  return <div id="table"></div>;
}
