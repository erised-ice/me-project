import {Header} from "./Header/Header.tsx";
import type {ReactNode} from "react";

type LayoutProps = {
  children?: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Header />
      <main>
        {children}
      </main>
    {/*
    Здесь будет компонент Хедер с тегом header
    Далее тег main в котором будет children (Для них нужно будет прописать пропсы).
    Еще можно добавить контейнер, но у меня пока что нет стилей, поэтому видимо это я добавлю потом.
    */}
    </>
  )
}