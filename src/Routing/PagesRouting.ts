export class PagesRouting {
  public static Auth = {
    Login: '/auth/login',
    Register: '/auth/register',
    ForgotPassword: '/auth/forgot-password',
    ConfirmEmail: '/auth/confirm-email',
    ResetPassword: '/auth/pass-reset',
  };

  public static Dashboards = {
    Analytic: '/dashboards/analytic',
    Warehouse: '/dashboards/warehouse',
    Products: '/dashboards/products',
    Autodelivery: '/dashboards/autodelivery',
    OrderFeed: '/dashboards/orderfeed',
    Finances: '/dashboards/finances',
    Alerts: '/dashboards/alerts',
  };

  public static Settings = {
    Profile: '/settings/profile',
    Pricing: '/settings/pricing',
    Integration: '/settings/integration',
    Help: '/settings/help',
    Users: '/settings/users',
  };
}
