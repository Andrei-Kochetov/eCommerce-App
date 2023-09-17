export const options = {
  projectKey: 'ecommerce-app2023',
  scopes: [
    'manage_my_payments:ecommerce-app2023 manage_my_quotes:ecommerce-app2023 view_published_products:ecommerce-app2023 manage_my_profile:ecommerce-app2023 view_categories:ecommerce-app2023 manage_my_quote_requests:ecommerce-app2023 manage_my_business_units:ecommerce-app2023 manage_my_shopping_lists:ecommerce-app2023 create_anonymous_token:ecommerce-app2023 view_project_settings:ecommerce-app2023 manage_my_orders:ecommerce-app2023',
  ],
  clientId: '5CtkecLYr54FhhzXfgya3yRC',
  clientSecret: 'Y0wVAYt9uSgpgJFn4_lP9r_mmFlYMlK0',
  host: 'https://auth.europe-west1.gcp.commercetools.com',
  authMiddlewareOptions: {
    host: 'https://auth.europe-west1.gcp.commercetools.com',
    projectKey: 'ecommerce-app2023',
    credentials: {
      clientId: '5CtkecLYr54FhhzXfgya3yRC',
      clientSecret: 'Y0wVAYt9uSgpgJFn4_lP9r_mmFlYMlK0',
    },
    scopes: [
      'manage_my_payments:ecommerce-app2023 manage_my_quotes:ecommerce-app2023 view_published_products:ecommerce-app2023 manage_my_profile:ecommerce-app2023 view_categories:ecommerce-app2023 manage_my_quote_requests:ecommerce-app2023 manage_my_business_units:ecommerce-app2023 manage_my_shopping_lists:ecommerce-app2023 create_anonymous_token:ecommerce-app2023 view_project_settings:ecommerce-app2023 manage_my_orders:ecommerce-app2023',
    ],
    fetch,
  },
  httpMiddlewareOptions: {
    host: 'https://api.europe-west1.gcp.commercetools.com',
    fetch,
  },
  existingTokenMiddlewareOptions: {
    force: true,
  },
};
