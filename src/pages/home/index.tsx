import React, { useEffect, useState } from 'react';
import { Container, Grid, CircularProgress } from '@mui/material';
import CardHome from '@components/CardHome';
import AccessibilityTypography from '@components/AccessibilityTypography';
import { GuideInterface, getGuides } from '@services/guides';

export interface HomeProps {}

export const Home: React.FC<HomeProps> = (): JSX.Element => {
  const [cards, setCards] = useState<GuideInterface[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  async function getGuidesService() {
    try {
      const { data } = await getGuides();
      setCards(data.data);
      setError(false);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getGuidesService();
  }, []);

  return (
    <>
      <Container>
        <Grid container justifyContent={'center'}>
          <Grid item md={12} py={'45px'} px={'20px'} justifyContent={'center'}>
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
          <Grid item md={12}>
            <Grid container justifyContent={'center'}>
              {loading ? (
                <CircularProgress color="secondary" />
              ) : error ? (
                <AccessibilityTypography variant="h1" className="error">
                  Desculpe, ocorreu um erro ao carregar a página!
                </AccessibilityTypography>
              ) : (
                cards.map((item, key) => (
                  <CardHome
                    guideId={item._id!}
                    title={item.title}
                    image={item.filePaths.filePath}
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
