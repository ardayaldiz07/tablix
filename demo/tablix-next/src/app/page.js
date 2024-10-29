import Image from "next/image";
import styles from "./page.module.css";
import TablixWrapper from "@/components/Tablix";

export default function Home() {
  return (
    <TablixWrapper
        theme={'dark-theme'}
        data={{
          api: '/data.json',
        }}
    />
  );
}
