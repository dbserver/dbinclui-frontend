import React, { KeyboardEvent, useEffect, useRef, useState } from 'react';
import { Container, Grid, CircularProgress } from '@mui/material';
import CardHome from '@components/CardHome';
import AccessibilityTypography from '@components/AccessibilityTypography';
import { GuideInterface, getGuides } from '@services/guides';
import { SearchBar } from '@components/SearchBar';
import { isMobile } from 'react-device-detect';
import NoGuidesWarning from '@components/NoGuidesWarning';

export interface HomeProps {}

function Mobile() {
  const [readMore, setReadMore] = useState(false);
  const extraContent = (
    <div>
      <Grid
        item
        md={12}
        py={'8px'}
        px={'20px'}
        justifyContent={'left'}
        className="extra-content"
      >
        <Grid maxWidth={'800px'} m="auto">
          <AccessibilityTypography tabIndex={0} textAlign={'left'}>
            O web app é destinado para todas as pessoas que desejam aprender
            LIBRAS e entender um pouco mais sobre Inclusão de PCD&apos;s na
            sociedade. O web app aproveita o Guia de Acessibilidade e a Apostila
            de Libras como fonte para informação de inclusão, assim como,
            utiliza a API VLIBRAS para as funcionalidades específicas.
          </AccessibilityTypography>
        </Grid>
      </Grid>
    </div>
  );

  const linkName = readMore ? 'Ver menos ' : 'Ver mais';

  return (
    <>
      {isMobile ? (
        <div className="Mobile">
          {readMore && extraContent}
          <a
            className="read-more-link"
            onClick={() => {
              setReadMore(!readMore);
            }}
          >
            <h4 style={{ textAlign: 'center' }}>{linkName}</h4>
          </a>
        </div>
      ) : (
        <Grid
          item
          md={12}
          py={'20px'}
          px={'20px'}
          justifyContent={'center'}
          className="extra-content"
        >
          <Grid maxWidth={'800px'} m="auto">
            <AccessibilityTypography tabIndex={0} textAlign={'left'}>
              O web app é destinado para todas as pessoas que desejam aprender
              LIBRAS e entender um pouco mais sobre Inclusão de PCD&apos;s na
              sociedade. O web app aproveita o Guia de Acessibilidade e a
              Apostila de Libras como fonte para informação de inclusão, assim
              como, utiliza a API VLIBRAS para as funcionalidades específicas.
            </AccessibilityTypography>
          </Grid>
        </Grid>
      )}
    </>
  );
}

export const Home: React.FC<HomeProps> = (): JSX.Element => {
  const [cards, setCards] = useState<GuideInterface[]>([]);
  const [filteredCards, setFilteredCards] = useState<GuideInterface[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const mobile = Mobile();
  const searchInputRef = useRef<HTMLInputElement>(null);

  async function getGuidesService() {
    try {
      const { data } = await getGuides();
      setCards(data.data);
      setFilteredCards(data.data);
      setError(false);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  function removeSpecialsCharacters(texto: string) {
    texto = texto.replace(/[àáâãå]/g, 'a');
    texto = texto.replace(/[èéê]/g, 'e');
    texto = texto.replace(/[ìí]/g, 'i');
    texto = texto.replace(/[óôõò]/g, 'o');
    texto = texto.replace(/[ùúû]/g, 'u');
    return texto;
  }

  const filterCards = () => {
    const queryValue = searchInputRef.current?.value || '';

    const currentFilteredCards: GuideInterface[] = cards.filter((card) => {
      const lowerQueryValue = queryValue.toLowerCase();

      return removeSpecialsCharacters(card.title.toLowerCase()).includes(
        removeSpecialsCharacters(lowerQueryValue),
      );
    });
    setFilteredCards(currentFilteredCards);
  };

  const handleEnterKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
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
          <SearchBar
            inputRef={searchInputRef}
            filterFunc={filterCards}
            handleEnterKey={handleEnterKey}
          />
          <Grid item md={12} py={'0px'} px={'14px'} justifyContent={'center'}>
            <Grid maxWidth={'800px'} m="auto">
              <AccessibilityTypography
                tabIndex={0}
                textAlign={'left'}
                justifyContent={'left'}
              >
                Bem-vindo ao DB INCLUI, o DB INCLUI é um web app que dissemina a
                cultura de inclusão dentro da DBserver, com foco na cultura
                surda.
              </AccessibilityTypography>
            </Grid>
          </Grid>
          <Grid item md={12}>
            <Grid container justifyContent={'center'}>
              {mobile}
              {loading ? (
                <CircularProgress color="secondary" />
              ) : error ? (
                <AccessibilityTypography variant="h1" className="error">
                  Desculpe, ocorreu um erro ao carregar a página!
                </AccessibilityTypography>
              ) : filteredCards.length > 0 ? (
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
              ) : (
                <NoGuidesWarning />
              )}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Home;
