import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '@pages/home';
import RegisterGuide from '@pages/register-guide';
import Error from '@pages/error/404';
import Layout from '@pages/layout';
import Admin from '@pages/admin';
import RegisterCategory from '@pages/register-category';
import RegisterDigitalContent from '@pages/register-digital-content';
import ListDigitalContent from '@pages/list-digital-content';
import GuideList from '@pages/guide-list';
import GuidePage from '@pages/guide-page';
import UpdateCategory from '@pages/update-category';
import UpdateGuide from '@pages/update-guide';
import About from '@pages/about';
import UpdateDigitalContent from '@pages/update-digital-content';
import CategoriesList from '@pages/categories-list';
import ViewDigitalContent from '@pages/view-digital-content';
import Translator from '@pages/translator';
import MyExpressions from '@pages/my-dictionary';
import { DictionaryDbinclui } from '@pages/dictionaryDbinclui';

export interface RoutersProps {}

export const Routers: React.FC<RoutersProps> = (): JSX.Element => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="sobre" element={<About />} />
            <Route path="tradutor-de-libras" element={<Translator />} />
            <Route path="meu-dicionario" element={<MyExpressions />} />
            <Route path="guia/:title" element={<GuidePage />} />
            <Route path="admin" element={<Admin />} />
            <Route path="admin/cadastrar-guia" element={<RegisterGuide />} />
            <Route path="admin/atualizar-guia/:id" element={<UpdateGuide />} />
            <Route path="admin/listar-guias" element={<GuideList />} />
            <Route path="dictionaryDbInclui" element={<DictionaryDbinclui />} />
            <Route
              path="admin/listar-categorias"
              element={<CategoriesList />}
            />
            <Route
              path="admin/cadastrar-categoria"
              element={<RegisterCategory />}
            />
            <Route
              path="admin/atualizar-categoria/:id"
              element={<UpdateCategory />}
            />
            <Route
              path="admin/cadastrar-conteudo-digital"
              element={<RegisterDigitalContent />}
            />
            <Route
              path="admin/listar-conteudo-digital"
              element={<ListDigitalContent />}
            />

            <Route
              path="admin/visualizar-conteudo-digital/:id"
              element={<ViewDigitalContent />}
            />
            <Route
              path="admin/atualizar-conteudo-digital/:id"
              element={<UpdateDigitalContent />}
            />

            <Route
              path="admin/excluir-conteudo-digital/:id"
              // element={<DeleteDigitalContent />}
            />
            <Route path="testeGuide" element={<GuidePage />} />
            <Route path="*" element={<Error />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Routers;
