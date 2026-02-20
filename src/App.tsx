import { Routes, Route } from 'react-router-dom';
import {MainPage} from "./pages/MainPage.tsx";
import {RecipePage} from "./pages/RecipePage.tsx";
import {RecipeBookPage} from "./pages/RecipeBookPage.tsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/recipes" element={<RecipeBookPage />} />
      <Route path="/recipes/pancakes" element={<RecipePage />} />

      {/*
      Здесь будет роутер, который позволит переключаться между страницами.
      Какой красивый шрифт! Как будто реально на чертежной бумаге карандашом написано.
      */}
    </Routes>
  )
}

export default App
