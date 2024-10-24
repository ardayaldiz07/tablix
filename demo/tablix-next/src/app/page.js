"use client";
import TablixWrapper from "@/components/Tablix";
import React, { useEffect } from "react";

export default function Home() {
  useEffect(() => {

  }, []);

  return (
    <>
      <TablixWrapper
        theme={'dark-theme'}
        data={{
          api: '/data.json',
        }}
      />
    </>
  );
}
