import React from 'react';
import { CategoryContent } from '@services/categories';
import { Box, Grid } from '@mui/material';
import styles from './styles';
import ImageCarroussel from '@components/ImageCarroussel';
import AccessibilityTypography from '@components/AccessibilityTypography';
import { CustomTypography } from '@components/CustomTypography';

export interface CategorySectionProps {
  index: string;
  category: CategoryContent;
}

export const CategorySection: React.FC<CategorySectionProps> = ({
  index,
  category,
}): JSX.Element => {
  return (
    <>
      <Grid item md={8} width={'100%'}>
        <Box tabIndex={0} component="header">
          <CustomTypography
            component="h2"
            fontSize={25.6}
            fontWeight={700}
            marginBottom={2}
            id={`${category._id}`}
          >
            {category.title}
          </CustomTypography>
          <AccessibilityTypography component="h2" sx={styles.categoryContent}>
            {category.shortDescription}
          </AccessibilityTypography>

          {category.digitalContents && !!category.digitalContents.length && (
            <Box>
              <ImageCarroussel
                contents={category.digitalContents}
                height="20rem"
                width="100%"
              />
            </Box>
          )}
        </Box>
      </Grid>
    </>
  );
};

export default CategorySection;
