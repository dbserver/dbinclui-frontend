import React, { useContext, useEffect, useState } from 'react';
import { Box, Button, MobileStepper, Paper } from '@mui/material';
import SwipeableViews from 'react-swipeable-views';
import styles from './styles';
import './styles.css';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import AccessibilityTypography from '@components/AccessibilityTypography';
import { CustomTypography } from '@components/CustomTypography';
import AccessibilityContext from '@contexts/AccessibilityContext';

interface Content {
  title: string;
  shortDescription: string;
  filePaths: {
    filePath: string;
    publicId: string;
  }[];
}

interface ParsedContent {
  digitalContentIndex: number;
  filePath: string;
}

interface ImageCarrousselProps {
  contents: Content[];
  width?: string | number;
  height?: string | number;
}

export const ImageCarroussel: React.FC<ImageCarrousselProps> = ({
  contents,
  width,
  height,
}) => {
  const [arrayOfContents, setArrayOfContents] = useState<ParsedContent[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () =>
    setCurrentIndex((previousValue) => previousValue + 1);

  const handleBack = () =>
    setCurrentIndex((previousValue) => previousValue - 1);
  const context = useContext(AccessibilityContext);

  const constructArrayOfContents = (contents: Content[]) => {
    return contents.reduce<ParsedContent[]>(
      (arrayOfContents, content, index) => {
        // construct subarray containing all files from this digital content
        const parsedContents = content.filePaths.map((path) => ({
          digitalContentIndex: index,
          filePath: path.filePath,
        }));

        // and add the subarray to the final array
        return [...arrayOfContents, ...parsedContents];
      },
      [],
    );
  };

  useEffect(() => {
    setArrayOfContents(constructArrayOfContents(contents));
  }, [contents]);

  return (
    <Box
      width={width}
      sx={styles.carrousselBox}
      className={context.colorAccessibility ? 'accessColor' : 'defaultColor'}
    >
      <Paper
        component="header"
        square
        elevation={0}
        sx={styles.headerContainer}
      >
        <CustomTypography
          component="p"
          fontSize={22.4}
          fontWeight={700}
          marginBottom={2}
        >
          {contents[arrayOfContents[currentIndex]?.digitalContentIndex]?.title}
        </CustomTypography>

        <AccessibilityTypography sx={styles.description}>
          {
            contents[arrayOfContents[currentIndex]?.digitalContentIndex]
              ?.shortDescription
          }
        </AccessibilityTypography>
      </Paper>

      <SwipeableViews index={currentIndex} enableMouseEvents>
        {arrayOfContents.map((img, index) => {
          const fileExtension = img.filePath.split('.').pop();

          const mediaType = fileExtension?.match(/png|jpg|jpeg|gif/)
            ? 'img'
            : 'video';

          return Math.abs(currentIndex - index) <= 2 ? (
            <Box key={index} sx={styles.imageWrapper} height={height}>
              <Box
                component={mediaType}
                controls={mediaType === 'video'}
                sx={styles.image}
                src={img.filePath}
                alt={
                  contents[arrayOfContents[currentIndex]?.digitalContentIndex]
                    ?.shortDescription
                }
                aria-label={
                  contents[arrayOfContents[currentIndex]?.digitalContentIndex]
                    ?.shortDescription
                }
              />
            </Box>
          ) : (
            <div key={index}></div>
          );
        })}
      </SwipeableViews>

      <MobileStepper
        variant="text"
        sx={styles.stepper}
        steps={arrayOfContents.length}
        position="static"
        activeStep={currentIndex}
        nextButton={
          <Button
            size="small"
            onClick={handleNext}
            disabled={currentIndex === arrayOfContents.length - 1}
            sx={styles.nextButton}
          >
            Próximo
            <KeyboardArrowRight />
          </Button>
        }
        backButton={
          <Button
            size="small"
            onClick={handleBack}
            disabled={currentIndex === 0}
            sx={styles.nextButton}
          >
            <KeyboardArrowLeft />
            Anterior
          </Button>
        }
      />
    </Box>
  );
};

export default ImageCarroussel;
