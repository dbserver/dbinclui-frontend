import React, { useEffect, useRef, useState, KeyboardEvent } from 'react';
import { Container, Grid, CircularProgress } from '@mui/material';
import CardHome from '@components/CardHome';
import AccessibilityTypography from '@components/AccessibilityTypography';
import { GuideInterface, getGuides } from '@services/guides';
import { SearchBar } from '@components/SearchBar';


export interface HomeProps { }

export const Home: React.FC<HomeProps> = (): JSX.Element => {
  const [cards, setCards] = useState<GuideInterface[]>([]);
  const [filteredCards, setFilteredCards] = useState<GuideInterface[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const queryInputRef = useRef<HTMLInputElement>(null);

  async function getGuidesService() {
    try {
      const { data } = await getGuides();
      await setCards(data.data);
      setFilteredCards(data.data);
      setError(false);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  const filterCards = () => {
    let queryValue = queryInputRef.current?.value || '';

    const filterCards: GuideInterface[] = cards.filter((card) => {
      const lowerQueryValue = queryValue.toLocaleLowerCase();
      return card.title.toLocaleLowerCase().includes(lowerQueryValue);
    });

    setFilteredCards(filterCards);
  };

  const handleEnterKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      filterCards();
    }
  };

  useEffect(() => {
    getGuidesService();
  }, []);

  return (
    <>
      <Container>
        <Grid container justifyContent={'center'}>
          <SearchBar />

          <Grid item md={12} py={'20px'} px={'20px'} justifyContent={'center'}>
            <Grid maxWidth={'800px'} m="auto">
              <AccessibilityTypography tabIndex={0} textAlign={'left'}>
                Bem-vindo ao DB INCLUI, o DB INCLUI é um web app que dissemina a
                cultura de inclusão dentro da DBserver, com foco na cultura
                surda. O web app é destinado para todas as pessoas que desejam
                aprender LIBRAS e entender um pouco mais sobre Inclusão de
                PCD&apos;s na sociedade. O web app aproveita o Guia de
                Acessibilidade e a Apostila de Libras como fonte para informação
                de inclusão, assim como, utiliza a API VLIBRAS para as
                funcionalidades específicas.
              </AccessibilityTypography>
            </Grid>
          </Grid>
          <label>
            <input ref={queryInputRef} type="text" onKeyDown={handleEnterKey} />
            <button onClick={filterCards}>Pesquisar</button>
          </label>
          <Grid item md={12}>
            <Grid container justifyContent={'center'}>
              {loading ? (
                <CircularProgress color="secondary" />
              ) : error ? (
                <AccessibilityTypography variant="h1" className="error">
                  Desculpe, ocorreu um erro ao carregar a página!
                </AccessibilityTypography>
              ) : (
                filteredCards.map((item, key) => (
                  <CardHome
                    guideId={item._id!}
                    title={item.title}
                    image={item.filePaths?.filePath}
                    path={item.title.toLowerCase().replace(/[- ]+/g, '-')}
                    key={key}
                    tabIndex={key}
                  />
                ))
              )}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Home;
