// Svg
import Logo from './svg/logo.svg';
import LogoSm from './svg/logo-sm.svg';
import Angle from './svg/angle.svg';
import Checkmark from './svg/checkmark.svg';
import ACategory from './svg/a-category.svg';
import BCategory from './svg/b-category.svg';
import CCategory from './svg/c-category.svg';
import Tooltip from './svg/tooltip.svg';
import TrendingUp from './svg/trending-up.svg';
import TrendingDown from './svg/trending-down.svg';

// Images
import ProductsLogo from './images/dashboards/products-logo.png';
import Product1 from './images/test/products/product-1.jpg';
import Product2 from './images/test/products/product-2.jpg';
import Product3 from './images/test/products/product-3.jpg';
import Product4 from './images/test/products/product-4.jpg';
import Analytic1 from './images/test/analytic/analytic-1.jpg';
import Analytic2 from './images/test/analytic/analytic-2.jpg';
import Analytic3 from './images/test/analytic/analytic-3.jpg';
import ApiKeyAccess from './images/settings/integration/api-key-access.png';
import ApiKeyConnection from './images/settings/integration/api-key-connection.png';
import ApiKeyGeneration from './images/settings/integration/api-key-generation.png';
import BodyImage from './images/modal/body-image.png';
import ProfileLogo from './images/settings/profile/profile-logo.png';
import NoData from './images/other/nodata.png';
import OrderFeedLogo from './images/dashboards/order-feed-logo.png';
import AuthorizationBackground from './images/authorization/authorization-background.jpg';
import AuthorizationLogo from './images/authorization/authorization-logo.png';
import FinancesLogo from './images/dashboards/finances-logo.png';

export const Svg = {
  Logo,
  LogoSm,
  Angle,
  Checkmark,
  ACategory,
  BCategory,
  CCategory,
  Tooltip,
  TrendingUp,
  TrendingDown,
};

export const Images = {
  Authorization: {
    AuthorizationBackground,
    AuthorizationLogo,
  },
  Test: {
    Products: {
      Product1,
      Product2,
      Product3,
      Product4,
    },
    Analytic: {
      Analytic1,
      Analytic2,
      Analytic3,
    },
  },
  Dashboards: {
    ProductsLogo,
    OrderFeedLogo,
    FinancesLogo,
  },
  Modal: {
    BodyImage,
  },
  Settings: {
    Integration: {
      ApiKeyAccess,
      ApiKeyConnection,
      ApiKeyGeneration,
    },
    Profile: {
      ProfileLogo,
    },
  },
  Other: {
    NoData,
  },
};
