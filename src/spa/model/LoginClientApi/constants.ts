export const options = {
  projectKey: 'ecommerce-app-pet-project',
  scopes: [
    'manage_my_shopping_lists:ecommerce-app-pet-project view_published_products:ecommerce-app-pet-project manage_my_orders:ecommerce-app-pet-project create_anonymous_token:ecommerce-app-pet-project manage_my_profile:ecommerce-app-pet-project view_categories:ecommerce-app-pet-project manage_my_payments:ecommerce-app-pet-project manage_customers:ecommerce-app-pet-project manage_my_quote_requests:ecommerce-app-pet-project manage_my_quotes:ecommerce-app-pet-project view_project_settings:ecommerce-app-pet-project manage_my_business_units:ecommerce-app-pet-project',
  ],
  clientId: 'cgsy-3PSsDNG9EY9DseWh-Y4',
  clientSecret: 'm8b5g3qGio7yOzPR6MDdZPLXiDtokwBt',
  host: 'https://auth.europe-west1.gcp.commercetools.com',
  authMiddlewareOptions: {
    host: 'https://auth.europe-west1.gcp.commercetools.com',
    projectKey: 'ecommerce-app-pet-project',
    credentials: {
      clientId: 'cgsy-3PSsDNG9EY9DseWh-Y4',
      clientSecret: 'm8b5g3qGio7yOzPR6MDdZPLXiDtokwBt',
    },
    scopes: [
      'manage_my_shopping_lists:ecommerce-app-pet-project view_published_products:ecommerce-app-pet-project manage_my_orders:ecommerce-app-pet-project create_anonymous_token:ecommerce-app-pet-project manage_my_profile:ecommerce-app-pet-project view_categories:ecommerce-app-pet-project manage_my_payments:ecommerce-app-pet-project manage_customers:ecommerce-app-pet-project manage_my_quote_requests:ecommerce-app-pet-project manage_my_quotes:ecommerce-app-pet-project view_project_settings:ecommerce-app-pet-project manage_my_business_units:ecommerce-app-pet-project',
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
