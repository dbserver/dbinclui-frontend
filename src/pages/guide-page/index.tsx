import React, { useEffect, useState } from 'react';
import CategorySection from './category-section';
import ImageCarroussel from '@components/ImageCarroussel';
import {
  GuideContent,
  getGuideWithCategoriesAndContent,
} from '@services/guides';
import { useLocation } from 'react-router-dom';
import { Box, Grid, Link } from '@mui/material';
import styles from './styles';
import AccessibilityTypography from '@components/AccessibilityTypography';
import CircularProgress from '@mui/material/CircularProgress';
import { CustomTypography } from '@components/CustomTypography';

export interface GuidePageProps {}

export const GuidePage: React.FC<GuidePageProps> = (): JSX.Element => {
  const location = useLocation();
  const id = (location.state as any).id;

  const [guide, setGuide] = useState<GuideContent>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getGuide() {
      try {
        setLoading(true);
        const response = await getGuideWithCategoriesAndContent(id);
        setGuide(response.data.data);
      } catch (error) {
        setGuide(undefined);
      } finally {
        setLoading(false);
      }
    }

    !guide && getGuide();
  }, [id, guide]);

  return loading ? (
    <Box sx={styles.errorMessage}>
      <CircularProgress color="secondary" />
    </Box>
  ) : !guide ? (
    <Box sx={styles.errorMessage}> Erro na busca do Guia! </Box>
  ) : (
    <Grid container component="main">
      {/* Indíce */}

      <AccessibilityTypography tabIndex={0} sx={styles.indexFirst}>
        Categorias:
      </AccessibilityTypography>

      <Grid item md={4}>
        <Box sx={styles.indexWrapper}>
          {guide?.categories.map((category, index) => {
            return (
              <Grid
                tabIndex={0}
                item
                sx={styles.buttonWrapper}
                key={category._id}
              >
                <Link
                  component="aside"
                  sx={styles.index}
                  onClick={() => {
                    const scrollTo = document.getElementById(`${category._id}`);
                    scrollTo?.scrollIntoView();
                  }}
                >
                  <AccessibilityTypography data-testid="IndexTitleTest">
                    {`•  ${category.title}`}
                  </AccessibilityTypography>
                </Link>
              </Grid>
            );
          })}
        </Box>
      </Grid>

      {/* Conteúdo */}
      <Grid tabIndex={0} item md={8} width={'100%'}>
        <Grid tabIndex={0} item md={8}>
          <Box component="header">
            <CustomTypography
              component="h1"
              fontSize={32}
              fontWeight={700}
              marginBottom={2}
            >
              {guide?.title}
            </CustomTypography>

            <AccessibilityTypography
              component="h2"
              sx={styles.guideContent}
              id={guide?._id}
            >
              {guide?.content}
            </AccessibilityTypography>

            {guide?.digitalContents && !!guide?.digitalContents.length && (
              <Box sx={styles.digitalContent}>
                <ImageCarroussel
                  contents={guide?.digitalContents}
                  height="20rem"
                  width="100%"
                />
              </Box>
            )}
          </Box>
        </Grid>

        {guide?.categories.map((category, index) => {
          return (
            <CategorySection
              category={category}
              key={category._id}
              index={`#${index}`}
            />
          );
        })}
      </Grid>
    </Grid>
  );
};

export default GuidePage;
