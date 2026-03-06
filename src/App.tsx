import { Routes, Route } from 'react-router-dom';
import { MainPage } from './pages/MainPage.tsx';
import { RecipePage } from './pages/RecipePage.tsx';
import { RecipeBookPage } from './pages/RecipeBookPage.tsx';
import { ROUTE } from './shared/constants/routes.ts';

function App() {
  return (
    <Routes>
      <Route path={ROUTE.HOME} element={<MainPage />} />
      <Route path={ROUTE.RECIPES} element={<RecipeBookPage />} />
      <Route path={`${ROUTE.RECIPES}/:id`} element={<RecipePage />} />
    </Routes>
  );
}

export default App;
