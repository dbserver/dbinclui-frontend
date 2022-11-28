import React from 'react';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import './styles.css';
import AccessibilityTypography from '@components/AccessibilityTypography';

let anoAtual = new Date().getFullYear();

export interface FooterProps {}

export const Footer: React.FC<FooterProps> = (): JSX.Element => {
  return (
    <>
      <footer className="footer">
        <a
          href="https://www.facebook.com/DBServerTI/"
          target={'_blank'}
          rel="noopener noreferrer"
        >
          <FacebookIcon color="secondary" style={{ fontSize: '32px' }} />
        </a>
        <a
          href="https://www.instagram.com/dbserver_ti/"
          target={'_blank'}
          rel="noopener noreferrer"
        >
          <InstagramIcon color="secondary" style={{ fontSize: '32px' }} />
        </a>
        <a
          href="https://twitter.com/dbserver_ti"
          target={'_blank'}
          rel="noopener noreferrer"
        >
          <TwitterIcon color="secondary" style={{ fontSize: '32px' }} />
        </a>
        <a
          href="https://br.linkedin.com/company/dbserver"
          target={'_blank'}
          rel="noopener noreferrer"
        >
          <LinkedInIcon color="secondary" style={{ fontSize: '32px' }} />
        </a>
        <AccessibilityTypography className="copyright" color="secondary">
          © {anoAtual} DBInclui - Todos os direitos reservados
        </AccessibilityTypography>
      </footer>
    </>
  );
};

export default Footer;
